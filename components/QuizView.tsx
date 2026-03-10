
import React from 'react';
import { ArrowLeft, Trophy, Gamepad2, FlaskConical } from 'lucide-react';
import { QuizSection } from './QuizSection';
import { WasteSortingGame } from './WasteSortingGame';
import { OrganicAlchemist } from './OrganicAlchemist';
import { useLanguage } from '../contexts/LanguageContext';

interface QuizViewProps {
  onBack: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onBack }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-eco-brown-100 dark:bg-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-24">
        {/* Sorting Game Section */}
        <section className="animate-fade-in">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-full text-sm font-black uppercase tracking-widest mb-4">
              <Gamepad2 className="h-4 w-4" />
              <span>Mini Game</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">Pilah Sampahmu!</h2>
            <p className="text-lg text-gray-600 dark:text-stone-400 max-w-2xl mx-auto">
              Uji ketangkasanmu dalam memilah sampah. Jangan sampai salah lebih dari 3 kali ya!
            </p>
          </div>
          
          <WasteSortingGame />
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-stone-800 to-transparent"></div>

        {/* Quiz Section */}
        <section className="animate-fade-in delay-200">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">Kuis Pengetahuan</h2>
            <p className="text-lg text-gray-600 dark:text-stone-400 max-w-2xl mx-auto">
              Seberapa jauh kamu mengenal sampah organik? Jawab kuis ini untuk menumbuhkan pohon digitalmu!
            </p>
          </div>
          <QuizSection />
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-stone-800 to-transparent"></div>

        {/* Organic Alchemist Section */}
        <section className="animate-fade-in delay-400">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full text-sm font-black uppercase tracking-widest mb-4">
              <FlaskConical className="h-4 w-4" />
              <span>Eksperimen Alkimia</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">Organic Alchemist</h2>
            <p className="text-lg text-gray-600 dark:text-stone-400 max-w-2xl mx-auto">
              Gabungkan bahan-bahan organik untuk menciptakan hasil yang bermanfaat. Hati-hati jangan sampai menciptakan gas berbahaya!
            </p>
          </div>
          <OrganicAlchemist />
        </section>
      </div>
    </div>
  );
};
