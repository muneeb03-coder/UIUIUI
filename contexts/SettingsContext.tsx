
import React, { createContext, useState, useContext, useEffect } from 'react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  source: string;
}

interface User {
  name: string;
  email: string;
  avatar?: string;
  achievements?: Achievement[];
}

interface SettingsContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  aiSpeakingStyle: string;
  setAiSpeakingStyle: (style: string) => void;
  user: User;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  unlockAchievement: (achievement: Omit<Achievement, 'unlockedAt'>) => void;
  treeXP: number;
  addTreeXP: (amount: number) => void;
  treeLevel: number;
  totalTreesGrown: number;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  const [aiSpeakingStyle, setAiSpeakingStyle] = useState(() => {
    return localStorage.getItem('aiSpeakingStyle') || 'Profesional dan ramah';
  });
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : { name: 'Eco Hero', email: 'hero@ecare.com', achievements: [] };
  });

  const [treeXP, setTreeXP] = useState(() => Number(localStorage.getItem('treeXP')) || 0);
  const [treeLevel, setTreeLevel] = useState(() => Number(localStorage.getItem('treeLevel')) || 1);
  const [totalTreesGrown, setTotalTreesGrown] = useState(() => Number(localStorage.getItem('totalTreesGrown')) || 0);

  useEffect(() => {
    localStorage.setItem('darkMode', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('aiSpeakingStyle', aiSpeakingStyle);
  }, [aiSpeakingStyle]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('treeXP', String(treeXP));
    localStorage.setItem('treeLevel', String(treeLevel));
    localStorage.setItem('totalTreesGrown', String(totalTreesGrown));
  }, [treeXP, treeLevel, totalTreesGrown]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const unlockAchievement = (achievement: Omit<Achievement, 'unlockedAt'>) => {
    setUser(prev => {
      const achievements = prev.achievements || [];
      if (achievements.find(a => a.id === achievement.id)) return prev;
      
      const newAchievement: Achievement = {
        ...achievement,
        unlockedAt: new Date().toISOString()
      };
      
      return {
        ...prev,
        achievements: [...achievements, newAchievement]
      };
    });
  };

  const addTreeXP = (amount: number) => {
    setTreeXP(prev => {
      const nextXP = prev + amount;
      const maxXP = 100; // Each tree needs 100 XP to grow
      if (nextXP >= maxXP) {
        setTotalTreesGrown(t => t + 1);
        setTreeLevel(l => l + 1);
        return 0; // Reset XP for next tree
      }
      return nextXP;
    });
  };

  return (
    <SettingsContext.Provider value={{ 
      isDarkMode, 
      toggleDarkMode, 
      aiSpeakingStyle, 
      setAiSpeakingStyle,
      user,
      setUser,
      updateUser,
      unlockAchievement,
      treeXP,
      addTreeXP,
      treeLevel,
      totalTreesGrown
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
