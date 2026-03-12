
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { Message, Language, Attachment } from "../types";

// Initialize Gemini lazily to prevent crashes if API key is missing
let aiInstance: GoogleGenAI | null = null;

const getAiInstance = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please check your environment variables.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

const SYSTEM_INSTRUCTION = `
Anda adalah asisten virtual profesional untuk platform "E-care" yang ahli dalam pengelolaan sampah organik.

Tugas Utama Anda:
1. EDUKASI SAMPAH ORGANIK: Memberikan informasi mendalam tentang jenis-jenis sampah organik, cara pemilahan, dan dampaknya terhadap lingkungan.
2. PENGELOLAAN & PENGOLAHAN: Memberikan panduan praktis tentang pengomposan, biopori, budidaya maggot BSF, dan berbagai metode pengolahan sampah organik lainnya secara kreatif dan efektif.
3. ANALISIS MULTIMODAL: Jika pengguna mengirimkan foto sampah, identifikasi apakah itu organik atau bukan, dan berikan saran pengolahannya. Jika pengguna mengirimkan audio, dengarkan dan jawab pertanyaannya.

ATURAN FORMAT JAWABAN (SANGAT PENTING):
1. JANGAN PERNAH MENGGUNAKAN FORMAT MARKDOWN (seperti **, #, -, *, dll).
2. Gunakan format teks biasa yang mudah dibaca dengan pemisahan baris yang jelas.
3. Seimbangkan antara poin-poin ringkas dan penjelasan lengkap.
4. Gunakan penomoran manual (1., 2., dst) atau simbol teks biasa (seperti > atau +) jika diperlukan untuk daftar.
5. Pastikan jawaban terstruktur dengan baik: Pendahuluan singkat, Poin-poin utama dengan penjelasan, dan Penutup/Saran tambahan.

Panduan Gaya Komunikasi:
1. FORMAL & INFORMATIF: Gunakan bahasa yang sopan, baku, namun mudah dipahami.
2. TOPIK TERBATAS: Anda HANYA boleh menjawab pertanyaan seputar sampah organik dan pengelolaannya. 

Jika pengguna bertanya di luar topik sampah organik (misal: sampah plastik, logam, politik, atau topik umum lainnya), arahkan kembali dengan sopan: "Mohon maaf, saya difokuskan untuk membantu informasi mengenai pengelolaan sampah organik."
`;

export const sendMessageToGemini = async (
  history: Message[], 
  userMessage: string, 
  language: Language,
  aiSpeakingStyle: string = "Profesional dan ramah",
  attachments?: Attachment[]
): Promise<string> => {
  try {
    const model = "gemini-3-flash-preview"; 
    
    let langInstruction = "";
    if (language === 'id') langInstruction = `Jawablah dalam Bahasa Indonesia. Gunakan gaya bicara: ${aiSpeakingStyle}.`;
    if (language === 'en') langInstruction = `Please answer in English. Use speaking style: ${aiSpeakingStyle}.`;

    // Optimize history: Limit to last 6 messages and strip attachments from history to reduce payload size
    const optimizedHistory = history.slice(-6);
    const contents: any[] = [];

    optimizedHistory.forEach(msg => {
      // In history, we only send text to keep payload small and fast
      // Attachments in history are usually not needed for context unless specifically referenced
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    });

    // Add current message parts
    const currentParts: any[] = [{ text: `System: ${langInstruction}\n\nUser: ${userMessage}` }];
    
    // Only include attachments for the current message
    if (attachments && attachments.length > 0) {
      attachments.forEach(att => {
        currentParts.push({
          inlineData: {
            mimeType: att.mimeType,
            data: att.data
          }
        });
      });
    }

    // Ensure the last message is from the user
    contents.push({
      role: 'user',
      parts: currentParts
    });

    const ai = getAiInstance();
    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } // Minimize latency
      }
    });

    if (response.text) {
        return response.text;
    }
    
    if (language === 'en') return "I apologize, I am unable to process that request at the moment.";
    return "Mohon maaf, saya sedang kesulitan memproses informasi saat ini.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    if (language === 'en') return "Sorry, connection error. Please try again later.";
    return "Maaf, terjadi kesalahan koneksi. Silakan coba lagi nanti.";
  }
};
