
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AIChat } from './components/AIChat';
import { BandungWaste } from './components/BandungWaste';
import { Footer } from './components/Footer';
import { QuizSection } from './components/QuizSection';
import { QuizView } from './components/QuizView';
import { SolutionView } from './components/SolutionView';
import { LanguageProvider } from './contexts/LanguageContext';
import { SettingsProvider } from './contexts/SettingsContext';

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'problem' | 'quiz' | 'solution' | 'ai'>('dashboard');

  return (
    <SettingsProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col font-sans relative transition-colors duration-300 dark:bg-stone-900 dark:text-stone-100">
          <Header 
            onQuizClick={() => setView('quiz')} 
            onProblemClick={() => setView('problem')}
            onSolutionClick={() => setView('solution')}
            onHomeClick={() => setView('dashboard')}
            onAIClick={() => setView('ai')}
          />
          <main className="flex-grow">
            {view === 'quiz' ? (
              <QuizView onBack={() => setView('dashboard')} />
            ) : view === 'problem' ? (
              <BandungWaste onBack={() => setView('dashboard')} />
            ) : view === 'solution' ? (
              <SolutionView onBack={() => setView('dashboard')} />
            ) : view === 'ai' ? (
              <div className="pt-10">
                <AIChat />
                <div className="flex justify-center pb-20">
                  <button 
                    onClick={() => setView('dashboard')}
                    className="px-8 py-3 bg-eco-green-800 text-white font-black rounded-full shadow-xl hover:bg-eco-green-900 transition-all"
                  >
                    Kembali ke Beranda
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Hero onLearnMore={() => setView('problem')} />
                <AIChat />
                <QuizSection />
              </>
            )}
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </SettingsProvider>
  );
};

export default App;
