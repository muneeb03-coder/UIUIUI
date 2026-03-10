
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { Language } from '../types';
import { Settings, User, Moon, Sun, Globe, ChevronDown, MessageSquare, Trophy, Star, FlaskConical, Trash2, Award } from 'lucide-react';

interface HeaderProps {
  onQuizClick?: () => void;
  onProblemClick?: () => void;
  onSolutionClick?: () => void;
  onHomeClick?: () => void;
}

const AchievementIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Trophy': return <Trophy className={className} />;
    case 'Star': return <Star className={className} />;
    case 'FlaskConical': return <FlaskConical className={className} />;
    case 'Trash2': return <Trash2 className={className} />;
    default: return <Award className={className} />;
  }
};

export const Header: React.FC<HeaderProps> = ({ onQuizClick, onProblemClick, onSolutionClick, onHomeClick }) => {
  const { language, setLanguage, t } = useLanguage();
  const { isDarkMode, toggleDarkMode, aiSpeakingStyle, setAiSpeakingStyle, user, updateUser } = useSettings();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user.name);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const navItems = [
    { name: t('nav_home'), href: '#home', active: true, onClick: onHomeClick },
    { name: t('nav_problem'), href: '#problem', active: true, onClick: onProblemClick },
    { name: t('nav_solution'), href: '#', active: true, onClick: onSolutionClick },
    { name: t('nav_quiz'), href: '#quiz', active: true, onClick: onQuizClick },
    { name: t('nav_ai'), href: '#ask-ai', active: true, onClick: onHomeClick },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-eco-green-800 dark:bg-stone-900 text-white shadow-xl transition-all duration-500 border-b border-eco-green-700 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-12 w-12 flex items-center justify-center overflow-hidden bg-white/10 rounded-xl p-1 group-hover:bg-white/20 transition-all">
                <img 
                    src="https://i.ibb.co/1J9m0p8f/logo-ecare.png" 
                    alt="E-care Logo" 
                    className="h-full w-auto object-contain transition-all group-hover:scale-110" 
                />
            </div>
            <span className="font-black text-2xl tracking-tighter flex items-center">
              E-<span className="text-yellow-400">care</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-black/10 dark:bg-white/5 rounded-full p-1 border border-white/5">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  onClick={(e) => {
                    if (!item.active) {
                      e.preventDefault();
                      return;
                    }
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                    item.active 
                      ? 'hover:bg-white/10 dark:hover:bg-white/10 text-white' 
                      : 'opacity-40 cursor-default'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 border-l border-white/10 ml-4 pl-4">
              {/* Language Switcher */}
              <div className="flex items-center gap-2 bg-black/20 dark:bg-white/5 rounded-full px-3 py-1.5 border border-white/10 hover:bg-black/30 transition-colors">
                <Globe className="h-3.5 w-3.5 text-eco-green-300" />
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-transparent text-white text-[10px] font-black uppercase tracking-widest focus:outline-none cursor-pointer appearance-none"
                >
                  <option value="id" className="bg-eco-green-900 dark:bg-stone-900">ID</option>
                  <option value="en" className="bg-eco-green-900 dark:bg-stone-900">EN</option>
                </select>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </div>

              {/* Settings Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-black/20 dark:bg-white/5 hover:bg-black/30 border border-white/10 transition-all relative group"
                >
                  <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
                </button>

                {isSettingsOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => {
                        setIsSettingsOpen(false);
                        setIsEditingProfile(false);
                      }}
                    ></div>
                    <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-stone-900 rounded-3xl shadow-2xl z-50 border border-gray-100 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in slide-in-from-top-2 duration-300">
                      <div className="p-6 border-b border-gray-100 dark:border-stone-800 bg-eco-green-50/50 dark:bg-stone-800/50">
                        <div className="flex flex-col items-center text-center gap-4">
                          <div className="relative group/avatar">
                            <div className="h-20 w-20 rounded-3xl bg-eco-green-600 flex items-center justify-center text-white shadow-xl overflow-hidden border-4 border-white dark:border-stone-900">
                              {user.avatar ? (
                                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                              ) : (
                                <User className="h-10 w-10" />
                              )}
                            </div>
                            {isEditingProfile && (
                              <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-3xl cursor-pointer opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                                <span className="text-[10px] font-black uppercase text-white">Ubah</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                              </label>
                            )}
                          </div>
                          
                          <div className="w-full">
                            {isEditingProfile ? (
                              <input 
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full px-3 py-2 text-center text-sm font-black bg-white dark:bg-stone-800 border-2 border-eco-green-500 rounded-xl focus:outline-none dark:text-white"
                                autoFocus
                              />
                            ) : (
                              <>
                                <p className="text-lg font-black text-gray-900 dark:text-white">{user.name}</p>
                                <p className="text-xs text-gray-400 font-bold">{user.email}</p>
                              </>
                            )}
                          </div>
                          
                          <button 
                            onClick={() => {
                              if (isEditingProfile) {
                                updateUser({ name: editName });
                                setIsEditingProfile(false);
                              } else {
                                setEditName(user.name);
                                setIsEditingProfile(true);
                              }
                            }}
                            className="text-[10px] font-black uppercase tracking-widest text-eco-green-600 dark:text-eco-green-400 hover:underline"
                          >
                            {isEditingProfile ? 'Simpan Profil' : 'Edit Profil'}
                          </button>
                        </div>

                        {/* Achievements Section */}
                        <div className="mt-6 px-6 pb-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Award className="h-4 w-4 text-yellow-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Achievements</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {user.achievements && user.achievements.length > 0 ? (
                              user.achievements.map((achievement) => (
                                <div 
                                  key={achievement.id}
                                  className="group/ach relative"
                                  title={`${achievement.name}: ${achievement.description}`}
                                >
                                  <div className="h-10 w-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 hover:bg-yellow-400 hover:text-white transition-all cursor-help">
                                    <AchievementIcon name={achievement.icon} className="h-5 w-5" />
                                  </div>
                                  
                                  {/* Tooltip */}
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-stone-900 text-white text-[10px] rounded-xl opacity-0 group-hover/ach:opacity-100 pointer-events-none transition-opacity z-[60] shadow-2xl border border-white/10">
                                    <p className="font-black uppercase text-yellow-400 mb-1">{achievement.name}</p>
                                    <p className="font-medium leading-relaxed opacity-80 mb-2">{achievement.description}</p>
                                    <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                                      <span className="opacity-50 italic">Dari: {achievement.source}</span>
                                      <span className="opacity-50">{new Date(achievement.unlockedAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-stone-900"></div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="w-full py-4 px-4 rounded-2xl bg-gray-50 dark:bg-stone-800/50 border border-dashed border-gray-200 dark:border-stone-700 text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Belum ada achievement</p>
                                <p className="text-[9px] text-gray-400 mt-1">Selesaikan kuis dengan sempurna!</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-6">
                        {/* Theme Toggle */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-gray-700 dark:text-stone-200">
                            <div className="p-2 bg-gray-100 dark:bg-stone-800 rounded-xl">
                              {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">Mode {isDarkMode ? 'Gelap' : 'Terang'}</span>
                          </div>
                          <button 
                            onClick={toggleDarkMode}
                            className={`w-12 h-6 rounded-full transition-all relative ${isDarkMode ? 'bg-eco-green-600' : 'bg-gray-200'}`}
                          >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all ${isDarkMode ? 'translate-x-7' : 'translate-x-1'}`}></div>
                          </button>
                        </div>

                        {/* AI Speaking Style */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-gray-700 dark:text-stone-200">
                            <div className="p-2 bg-gray-100 dark:bg-stone-800 rounded-xl">
                              <MessageSquare className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">Gaya Bicara AI</span>
                          </div>
                          <input 
                            type="text"
                            value={aiSpeakingStyle}
                            onChange={(e) => setAiSpeakingStyle(e.target.value)}
                            placeholder="Contoh: Gaul, Formal, Lucu..."
                            className="w-full px-4 py-3 text-xs font-bold border-2 border-gray-100 dark:border-stone-800 dark:bg-stone-800 dark:text-white rounded-2xl focus:border-eco-green-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-stone-950/50 border-t border-gray-100 dark:border-stone-800">
                        <button 
                          onClick={() => {
                            setIsSettingsOpen(false);
                            setIsEditingProfile(false);
                          }}
                          className="w-full py-3 text-xs font-black uppercase tracking-widest text-white bg-eco-green-600 hover:bg-eco-green-700 rounded-2xl shadow-lg transition-all active:scale-95"
                        >
                          Tutup
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

