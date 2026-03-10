import React, { useState, useEffect } from 'react';
import { Trophy, ArrowRight, RotateCcw, TreePine, Sparkles, CheckCircle2, XCircle, Star, Sprout, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';

type Difficulty = 'easy' | 'medium' | 'hard';

interface Question {
  q: string;
  o: string[];
  a: number;
}

const QUESTION_POOL: Record<string, Record<Difficulty, Question[]>> = {
  id: {
    easy: [
      { q: "Apa itu sampah organik?", o: ["Sampah yang tidak bisa membusuk", "Sampah yang bisa membusuk secara alami", "Sampah dari plastik", "Sampah elektronik"], a: 1 },
      { q: "Manakah yang termasuk sampah organik?", o: ["Botol plastik", "Kulit buah dan sisa sayur", "Kaleng minuman", "Kaca pecah"], a: 1 },
      { q: "Di mana sebaiknya kita membuang sisa makanan?", o: ["Di sungai", "Di tempat sampah organik/komposter", "Dibakar di halaman", "Dibuang sembarangan"], a: 1 },
      { q: "Sampah organik bisa diolah menjadi apa?", o: ["Plastik baru", "Kompos atau Pupuk Cair", "Bahan bakar nuklir", "Kaca"], a: 1 },
      { q: "Warna tempat sampah untuk organik biasanya adalah?", o: ["Merah", "Kuning", "Hijau", "Biru"], a: 2 }
    ],
    medium: [
      { q: "Apa gas berbahaya yang dihasilkan sampah organik jika menumpuk di TPA?", o: ["Oksigen", "Helium", "Gas Metana", "Nitrogen"], a: 2 },
      { q: "Berapa persentase sampah sisa makanan di Kota Bandung menurut data BPS?", o: ["Sekitar 10%", "Sekitar 25%", "Sekitar 44%", "Sekitar 80%"], a: 2 },
      { q: "Apa manfaat utama mengolah sampah organik di rumah?", o: ["Menambah koleksi sampah", "Mengurangi beban TPA dan gas rumah kaca", "Membuat rumah jadi kotor", "Tidak ada manfaatnya"], a: 1 },
      { q: "Apa metode pengolahan sampah organik menggunakan bantuan cacing?", o: ["Biopori", "Vermikompos", "Pirolisis", "Insinerasi"], a: 1 },
      { q: "Apa fungsi utama lubang biopori di halaman rumah?", o: ["Tempat pembuangan plastik", "Resapan air dan pengomposan alami", "Hiasan taman", "Tempat parkir"], a: 1 }
    ],
    hard: [
      { q: "Apa istilah untuk cairan beracun hasil dekomposisi sampah yang mencemari air tanah?", o: ["Air murni", "Lindi (Leachate)", "Air mineral", "Air embun"], a: 1 },
      { q: "Apa jenis mikroorganisme yang paling berperan dalam pengomposan aerobik?", o: ["Bakteri dan Jamur", "Virus", "Alga", "Protozoa"], a: 0 },
      { q: "Berapa perbandingan ideal Karbon dan Nitrogen (C/N Ratio) dalam pengomposan?", o: ["1:1", "100:1", "25-35:1", "10:1"], a: 2 },
      { q: "Apa yang dimaksud dengan pengomposan metode Takakura?", o: ["Pengomposan di lubang tanah", "Pengomposan menggunakan keranjang beraerasi", "Pengomposan skala industri", "Pengomposan tanpa udara"], a: 1 },
      { q: "Mengapa sisa daging dan minyak sebaiknya tidak dimasukkan ke komposter rumah tangga biasa?", o: ["Terlalu mahal", "Mengundang hama dan menimbulkan bau busuk", "Membuat kompos terlalu cepat matang", "Warna kompos jadi jelek"], a: 1 }
    ]
  },
  en: {
    easy: [
      { q: "What is organic waste?", o: ["Waste that cannot rot", "Waste that can decompose naturally", "Plastic waste", "Electronic waste"], a: 1 },
      { q: "Which of these is organic waste?", o: ["Plastic bottle", "Fruit peels and vegetable scraps", "Soda can", "Broken glass"], a: 1 },
      { q: "Where should we dispose of food waste?", o: ["In the river", "In organic bin/composter", "Burn it in the yard", "Throw it anywhere"], a: 1 },
      { q: "Organic waste can be processed into?", o: ["New plastic", "Compost or Liquid Fertilizer", "Nuclear fuel", "Glass"], a: 1 },
      { q: "What color is usually used for organic waste bins?", o: ["Red", "Yellow", "Green", "Blue"], a: 2 }
    ],
    medium: [
      { q: "What harmful gas is produced by organic waste in landfills?", o: ["Oxygen", "Helium", "Methane Gas", "Nitrogen"], a: 2 },
      { q: "What is the percentage of food waste in Bandung according to BPS data?", o: ["About 10%", "About 25%", "About 44%", "About 80%"], a: 2 },
      { q: "What is the main benefit of processing organic waste at home?", o: ["Increasing waste collection", "Reducing landfill load and greenhouse gases", "Making the house dirty", "No benefit"], a: 1 },
      { q: "What is the method of processing organic waste using worms?", o: ["Biopore", "Vermicompost", "Pyrolysis", "Incineration"], a: 1 },
      { q: "What is the main function of a biopore hole in the yard?", o: ["Plastic disposal", "Water absorption and natural composting", "Garden decoration", "Parking space"], a: 1 }
    ],
    hard: [
      { q: "What is the term for the toxic liquid from waste decomposition that pollutes groundwater?", o: ["Pure water", "Leachate", "Mineral water", "Dew water"], a: 1 },
      { q: "Which microorganisms play the most important role in aerobic composting?", o: ["Bacteria and Fungi", "Viruses", "Algae", "Protozoa"], a: 0 },
      { q: "What is the ideal Carbon to Nitrogen (C/N) ratio in composting?", o: ["1:1", "100:1", "25-35:1", "10:1"], a: 2 },
      { q: "What is the Takakura composting method?", o: ["Composting in a ground hole", "Composting using an aerated basket", "Industrial scale composting", "Anaerobic composting"], a: 1 },
      { q: "Why should meat and oil scraps be avoided in standard household composters?", o: ["Too expensive", "Attracts pests and causes foul odors", "Makes compost mature too fast", "Compost color becomes ugly"], a: 1 }
    ]
  }
};

const DigitalTree: React.FC<{ xp: number; level: number }> = ({ xp, level }) => {
  return (
    <div className="mt-12 flex flex-col items-center animate-fade-in">
      <div className="relative w-48 h-64 bg-eco-brown-100/50 dark:bg-stone-800/50 rounded-3xl border-2 border-dashed border-eco-green-200 dark:border-stone-700 flex flex-col items-center justify-end pb-8 overflow-hidden">
        {/* Ground */}
        <div className="absolute bottom-0 w-full h-8 bg-eco-brown-600 dark:bg-stone-700"></div>
        
        {/* Tree Visualization */}
        <div className="relative z-10 transition-all duration-1000 transform origin-bottom" style={{ scale: `${0.5 + (xp / 100) * 0.5}` }}>
          {xp < 25 ? (
            <div className="animate-bounce">
              <Sprout className="h-16 w-16 text-eco-green-600" />
            </div>
          ) : xp < 75 ? (
            <div className="flex flex-col items-center">
              <div className="w-2 h-16 bg-eco-brown-800 dark:bg-stone-600 rounded-full"></div>
              <div className="absolute -top-8 flex gap-1">
                <Leaf className="h-10 w-10 text-eco-green-600 rotate-[-15deg] fill-eco-green-100" />
                <Leaf className="h-10 w-10 text-eco-green-600 rotate-[15deg] fill-eco-green-100" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-4 h-24 bg-eco-brown-800 dark:bg-stone-600 rounded-full"></div>
              <div className="absolute -top-12 w-24 h-24 bg-eco-green-600 rounded-full shadow-lg flex items-center justify-center">
                <TreePine className="h-16 w-16 text-white opacity-20" />
              </div>
            </div>
          )}
        </div>

        {/* Level Badge */}
        <div className="absolute top-4 right-4 bg-eco-green-600 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-md">
          LVL {level}
        </div>

        {/* XP Progress Bar */}
        <div className="absolute bottom-10 w-32 h-2 bg-white/50 dark:bg-stone-900/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-eco-green-600 transition-all duration-1000" 
            style={{ width: `${xp}%` }}
          ></div>
        </div>
      </div>
      <p className="mt-4 text-sm font-bold text-eco-green-800 dark:text-eco-green-400 uppercase tracking-widest">
        Pohon Digital Kamu {xp === 0 ? '(Baru Ditanam)' : ''}
      </p>
    </div>
  );
};

export const QuizSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { treeXP, addTreeXP, treeLevel, totalTreesGrown, unlockAchievement } = useSettings();
  const [gameState, setGameState] = useState<'idle' | 'level_select' | 'playing' | 'result'>('idle');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<boolean | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);

  const prepareQuestions = (level: Difficulty) => {
    const pool = QUESTION_POOL[language === 'id' ? 'id' : 'en'][level];
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setSessionQuestions(shuffled.slice(0, 3));
  };

  const startQuiz = () => setGameState('level_select');

  const selectLevel = (level: Difficulty) => {
    setDifficulty(level);
    prepareQuestions(level);
    setGameState('playing');
    setCurrentQ(0);
    setScore(0);
    setShowFeedback(null);
    setSelectedOpt(null);
  };

  const handleAnswer = (idx: number) => {
    if (showFeedback !== null) return;
    
    setSelectedOpt(idx);
    const isCorrect = idx === sessionQuestions[currentQ].a;
    setShowFeedback(isCorrect);
    
    if (isCorrect) setScore(score + 10);

    setTimeout(() => {
      if (currentQ < sessionQuestions.length - 1) {
        setCurrentQ(currentQ + 1);
        setShowFeedback(null);
        setSelectedOpt(null);
      } else {
        // Quiz finished
        const finalScore = score + (idx === sessionQuestions[currentQ].a ? 10 : 0);
        const xpGained = finalScore >= 20 ? 25 : 10;
        addTreeXP(xpGained);
        setGameState('result');

        // Unlock achievement if perfect score
        if (finalScore === sessionQuestions.length * 10) {
          const achievementId = `quiz_${difficulty}_perfect`;
          const achievementName = difficulty === 'easy' ? 'Si Paling Paham' : difficulty === 'medium' ? 'Pakar Organik' : 'Suhu Sampah';
          const achievementDesc = `Menjawab semua pertanyaan kuis level ${difficulty === 'easy' ? 'Mudah' : difficulty === 'medium' ? 'Menengah' : 'Sulit'} dengan benar!`;
          
          unlockAchievement({
            id: achievementId,
            name: achievementName,
            description: achievementDesc,
            icon: 'Trophy',
            source: 'Kuis Pengetahuan'
          });
        }
      }
    }, 1500);
  };

  const getAchievement = () => {
    if (score < sessionQuestions.length * 10) return null;
    return t(`quiz_achievement_${difficulty}`);
  };

  return (
    <div id="quiz" className="py-24 bg-white dark:bg-stone-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CTA Above Quiz */}
        <div className="mb-12 text-center animate-bounce-subtle">
          <div className="inline-block bg-yellow-400 dark:bg-yellow-500 text-eco-green-900 font-black px-8 py-4 rounded-2xl shadow-xl border-4 border-white dark:border-stone-800 transform -rotate-2">
            <p className="text-xl md:text-2xl mb-2">"Masih segini benihnya? Ayo tanam lagi!"</p>
            <button 
              onClick={() => {
                document.getElementById('quiz-container')?.scrollIntoView({ behavior: 'smooth' });
                if (gameState === 'idle') startQuiz();
              }}
              className="bg-eco-green-800 text-white px-6 py-2 rounded-full text-sm hover:bg-eco-green-900 transition-colors shadow-md"
            >
              Kerjakan Kuis
            </button>
          </div>
        </div>

        <div id="quiz-container" className="bg-gradient-to-br from-eco-green-50 to-white dark:from-stone-800 dark:to-stone-900 rounded-3xl shadow-2xl p-8 md:p-12 border border-eco-green-100 dark:border-stone-700 relative overflow-hidden">
          
          {gameState === 'idle' && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-4 bg-eco-green-600 rounded-full text-white mb-8 shadow-lg">
                <Trophy className="h-10 w-10" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-eco-brown-900 dark:text-white mb-4">{t('quiz_header')}</h2>
              <p className="text-xl text-gray-600 dark:text-stone-400 mb-10 max-w-xl mx-auto leading-relaxed">{t('quiz_desc')}</p>
              <button 
                onClick={startQuiz}
                className="inline-flex items-center px-10 py-5 bg-eco-green-600 text-white rounded-full font-black text-xl hover:bg-eco-green-800 transition-all shadow-xl hover:scale-105"
              >
                {t('quiz_start')} <ArrowRight className="ml-3 h-6 w-6" />
              </button>
            </div>
          )}

          {gameState === 'level_select' && (
            <div className="text-center animate-fade-in">
              <h2 className="text-3xl font-black text-eco-brown-900 dark:text-white mb-8">Pilih Tingkat Kesulitan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(['easy', 'medium', 'hard'] as Difficulty[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => selectLevel(lvl)}
                    className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                      lvl === 'easy' ? 'border-green-200 bg-green-50 dark:bg-green-900/10 hover:border-green-500 text-green-700 dark:text-green-400' :
                      lvl === 'medium' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 hover:border-yellow-500 text-yellow-700 dark:text-yellow-400' :
                      'border-red-200 bg-red-50 dark:bg-red-900/10 hover:border-red-500 text-red-700 dark:text-red-400'
                    } font-black text-xl flex flex-col items-center gap-2`}
                  >
                    <Star className={`h-8 w-8 ${lvl === 'hard' ? 'fill-red-500' : lvl === 'medium' ? 'fill-yellow-500' : 'fill-green-500'}`} />
                    {t(`quiz_level_${lvl}`)}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setGameState('idle')}
                className="mt-8 text-gray-500 font-bold hover:text-gray-700"
              >
                Kembali
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col">
                  <span className="text-eco-green-600 font-black text-sm uppercase tracking-widest">
                    Level: {t(`quiz_level_${difficulty}`)}
                  </span>
                  <span className="text-gray-400 font-bold text-xs">Pertanyaan {currentQ + 1} / {sessionQuestions.length}</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-eco-green-600">{score}</span>
                  <span className="text-xs font-bold text-gray-400 block uppercase">Points</span>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-eco-brown-900 dark:text-white mb-10 leading-snug">
                {sessionQuestions[currentQ].q}
              </h3>

              <div className="grid gap-4">
                {sessionQuestions[currentQ].o.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={showFeedback !== null}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                      selectedOpt === i 
                        ? (showFeedback ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20')
                        : 'border-eco-green-100 dark:border-stone-700 hover:border-eco-green-600 dark:hover:border-eco-green-500 hover:bg-eco-green-50 dark:hover:bg-stone-800'
                    } text-lg font-bold ${selectedOpt === i ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-stone-300'}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt === i && (
                      showFeedback ? <CheckCircle2 className="h-6 w-6 text-green-600" /> : <XCircle className="h-6 w-6 text-red-600" />
                    )}
                  </button>
                ))}
              </div>

              {showFeedback !== null && (
                <div className={`mt-6 p-4 rounded-xl text-center font-black animate-bounce-subtle ${showFeedback ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {showFeedback ? t('quiz_feedback_correct') : t('quiz_feedback_wrong')}
                </div>
              )}
            </div>
          )}

          {gameState === 'result' && (
            <div className="text-center animate-fade-in">
              <div className="relative inline-block mb-10">
                <div className="w-40 h-40 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl">
                   {score === sessionQuestions.length * 10 ? (
                     <Trophy className="h-24 w-24 text-eco-green-900" />
                   ) : (
                     <Sparkles className="h-24 w-24 text-eco-green-900" />
                   )}
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg border border-gray-100 font-black text-eco-brown text-2xl">
                  {score}
                </div>
              </div>

              <h2 className="text-3xl font-black text-eco-brown-900 dark:text-white mb-2">
                {score === sessionQuestions.length * 10 ? 'Luar Biasa!' : 'Kerja Bagus!'}
              </h2>
              
              {getAchievement() && (
                <div className="bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-400 rounded-2xl p-4 mb-6 inline-block animate-pulse">
                  <p className="text-yellow-800 dark:text-yellow-400 font-black flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-500" />
                    Achievement Unlocked: {getAchievement()}
                  </p>
                </div>
              )}

              <p className="text-lg text-gray-600 dark:text-stone-400 mb-10">
                Kamu telah menyelesaikan level {t(`quiz_level_${difficulty}`)}.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setGameState('level_select')}
                  className="flex items-center justify-center px-8 py-4 bg-eco-green-600 text-white rounded-full font-bold hover:bg-eco-green-800 transition shadow-lg"
                >
                  <RotateCcw className="mr-2 h-5 w-5" /> Main Lagi
                </button>
                <button 
                  onClick={() => setGameState('idle')}
                  className="flex items-center justify-center px-8 py-4 bg-gray-200 dark:bg-stone-700 text-gray-700 dark:text-stone-200 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-stone-600 transition"
                >
                  Menu Utama
                </button>
              </div>
            </div>
          )}

          {/* Tree Visualization Below Quiz */}
          <DigitalTree xp={treeXP} level={treeLevel} />
          
          {totalTreesGrown > 0 && (
            <div className="mt-6 flex items-center justify-center gap-2 text-eco-green-600 font-black text-sm uppercase tracking-widest">
              <TreePine className="h-4 w-4" />
              Total Pohon Ditanam: {totalTreesGrown}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
