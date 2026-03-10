
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
  const [view, setView] = useState<'dashboard' | 'problem' | 'quiz' | 'solution'>('dashboard');

  return (
    <SettingsProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col font-sans relative transition-colors duration-300 dark:bg-stone-900 dark:text-stone-100">
          <Header 
            onQuizClick={() => setView('quiz')} 
            onProblemClick={() => setView('problem')}
            onSolutionClick={() => setView('solution')}
            onHomeClick={() => setView('dashboard')}
          />
          <main className="flex-grow">
            {view === 'quiz' ? (
              <QuizView onBack={() => setView('dashboard')} />
            ) : view === 'problem' ? (
              <BandungWaste onBack={() => setView('dashboard')} />
            ) : view === 'solution' ? (
              <SolutionView onBack={() => setView('dashboard')} />
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
