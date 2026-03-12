import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Paperclip, Image as ImageIcon, Mic, Square, X, FileText, AlertTriangle } from 'lucide-react';
import { sendMessageToGemini, isGeminiConfigured } from '../services/gemini';
import { Message, Attachment } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';

export const AIChat: React.FC = () => {
  const { language, t } = useLanguage();
  const { aiSpeakingStyle } = useSettings();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isConfigured, setIsConfigured] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMessages([{ role: 'model', text: t('ai_welcome') }]);
    setIsConfigured(isGeminiConfigured());
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        const type: 'image' | 'file' | 'audio' = file.type.startsWith('image/') ? 'image' : file.type.startsWith('audio/') ? 'audio' : 'file';
        
        setAttachments(prev => [...prev, {
          mimeType: file.type,
          data: base64,
          name: file.name,
          type
        }]);
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          setAttachments(prev => [...prev, {
            mimeType: 'audio/webm',
            data: base64,
            name: `Voice Recording ${new Date().toLocaleTimeString()}`,
            type: 'audio'
          }]);
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access denied or not supported.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && attachments.length === 0) || isLoading) return;

    const userMsg = input.trim() || (attachments.length > 0 ? "Sent attachments" : "");
    const currentAttachments = [...attachments];
    
    setInput('');
    setAttachments([]);
    
    const newUserMsg: Message = { role: 'user', text: userMsg, attachments: currentAttachments };
    const newMessages: Message[] = [...messages, newUserMsg];
    setMessages(newMessages);
    setIsLoading(true);

    const responseText = await sendMessageToGemini(messages, userMsg, language, aiSpeakingStyle, currentAttachments);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div id="ask-ai" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="inline-flex items-center justify-center p-2 bg-eco-green-100 rounded-md shadow-sm mb-4">
             <Sparkles className="h-6 w-6 text-eco-green-600 mr-2" />
             <span className="font-bold text-eco-green-800">Powered by Gemini AI</span>
          </span>
          <h2 className="text-3xl font-extrabold text-eco-brown-900">{t('ai_header')}</h2>
          <p className="mt-2 text-gray-500">{t('ai_desc')}</p>
        </div>

        <div className="bg-eco-brown-100 rounded-xl shadow-xl overflow-hidden border border-eco-brown-200 flex flex-col h-[600px]">
          {!isConfigured && (
            <div className="bg-amber-50 border-b border-amber-200 p-4 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                {language === 'id' 
                  ? "API Key belum terdeteksi. Chatbot tidak akan berfungsi sampai Anda menambahkan GEMINI_API_KEY di pengaturan environment."
                  : "API Key not detected. Chatbot will not work until you add GEMINI_API_KEY to your environment settings."}
              </p>
            </div>
          )}
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-eco-brown-800' : 'bg-eco-green-600'}`}>
                    {msg.role === 'user' ? <User className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-white" />}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className={`px-4 py-2 rounded-lg text-sm shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-eco-brown-800 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                    }`}>
                      {msg.text.split('\n').map((line, i) => (
                          <p key={i} className="mb-1">{line}</p>
                      ))}
                    </div>
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className={`flex flex-wrap gap-2 mt-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.attachments.map((att, i) => (
                          <div key={i} className="max-w-[200px] rounded-lg overflow-hidden border border-gray-200 bg-white p-1 shadow-sm">
                            {att.type === 'image' ? (
                              <img src={`data:${att.mimeType};base64,${att.data}`} alt="attachment" className="w-full h-auto max-h-32 object-cover rounded" />
                            ) : att.type === 'audio' ? (
                              <audio controls src={`data:${att.mimeType};base64,${att.data}`} className="w-full h-10" />
                            ) : (
                              <div className="flex items-center gap-2 p-2 text-xs text-gray-600">
                                <FileText className="h-4 w-4" />
                                <span className="truncate">{att.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="flex items-start gap-2 max-w-[80%]">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-eco-green-600 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="px-4 py-2 bg-white rounded-lg rounded-tl-none border border-gray-200">
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Attachment Preview */}
          {attachments.length > 0 && (
            <div className="px-4 py-2 bg-white border-t border-gray-100 flex flex-wrap gap-2">
              {attachments.map((att, i) => (
                <div key={i} className="relative group">
                  <div className="w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden">
                    {att.type === 'image' ? (
                      <img src={`data:${att.mimeType};base64,${att.data}`} className="w-full h-full object-cover" />
                    ) : att.type === 'audio' ? (
                      <Mic className="h-6 w-6 text-eco-green-600" />
                    ) : (
                      <FileText className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <button 
                    onClick={() => removeAttachment(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form onSubmit={handleSend} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-500 hover:text-eco-green-600 hover:bg-eco-green-50 rounded-full transition-colors"
                  title="Attach file"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.accept = "image/*";
                      fileInputRef.current.click();
                    }
                  }}
                  className="p-2 text-gray-500 hover:text-eco-green-600 hover:bg-eco-green-50 rounded-full transition-colors"
                  title="Attach image"
                >
                  <ImageIcon className="h-5 w-5" />
                </button>
                
                {isRecording ? (
                  <div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full border border-red-200 animate-pulse">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs font-bold text-red-600">{formatTime(recordingTime)}</span>
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="p-1 text-red-600 hover:bg-red-100 rounded-full"
                    >
                      <Square className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Record voice"
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                )}

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('ai_placeholder')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-eco-green-600 focus:border-transparent text-gray-900 placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={isLoading || (!input.trim() && attachments.length === 0)}
                  className="inline-flex items-center justify-center px-4 py-2 bg-eco-green-600 text-white rounded-full hover:bg-eco-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                multiple 
                accept="image/*,audio/*,.pdf,.doc,.docx,.txt"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
