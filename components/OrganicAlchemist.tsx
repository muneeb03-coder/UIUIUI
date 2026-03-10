import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlaskConical, Plus, ArrowRight, AlertTriangle, Sparkles, Trash2, Droplets, Wind, RefreshCcw, Star } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

type GameLevel = 'easy' | 'medium' | 'hard';

interface Recipe {
  id: string;
  items: string[];
  options: string[];
  correctAnswer: string;
  explanation: string;
  success: boolean;
  resultIcon: React.ReactNode;
}

const RECIPE_POOL: Recipe[] = [
  // Easy (2 items)
  {
    id: "e1",
    items: ["Sisa Batagor", "Sisa Sayur Kangkung"],
    options: ["Pupuk Cair", "Gas Metana", "Oksigen", "Tanah Liat"],
    correctAnswer: "Gas Metana",
    explanation: "Jika sampah makanan ditumpuk tanpa udara (anaerob), ia akan menghasilkan gas metana yang berbahaya bagi atmosfer Bandung!",
    success: false,
    resultIcon: <Wind className="w-12 h-12 text-red-500" />
  },
  {
    id: "e2",
    items: ["Sisa Nasi Kuning", "Daun Kering"],
    options: ["Plastik", "Kompos Matang", "Batu Bata", "Kaca"],
    correctAnswer: "Kompos Matang",
    explanation: "Campuran Karbon (daun kering) dan Nitrogen (sisa makanan) adalah resep sempurna untuk membuat kompos berkualitas tinggi!",
    success: true,
    resultIcon: <Sparkles className="w-12 h-12 text-yellow-500" />
  },
  {
    id: "e3",
    items: ["Kulit Jeruk", "Gula Merah + Air"],
    options: ["Eco-Enzyme", "Racun Tikus", "Air Selokan", "Minyak Goreng"],
    correctAnswer: "Eco-Enzyme",
    explanation: "Fermentasi kulit buah dengan gula dan air selama 3 bulan akan menghasilkan cairan pembersih alami serbaguna!",
    success: true,
    resultIcon: <Droplets className="w-12 h-12 text-blue-500" />
  },
  {
    id: "e4",
    items: ["Sisa Tulang Ayam", "Botol Plastik"],
    options: ["Kompos", "Pencemaran Lingkungan", "Pupuk Cair", "Mainan Anak"],
    correctAnswer: "Pencemaran Lingkungan",
    explanation: "Mencampur sampah organik dengan anorganik (plastik) akan menghambat proses penguraian alami!",
    success: false,
    resultIcon: <Trash2 className="w-12 h-12 text-gray-500" />
  },
  {
    id: "e5",
    items: ["Ampas Kopi", "Cangkang Telur"],
    options: ["Pupuk Kalsium", "Bensin", "Kertas", "Besi"],
    correctAnswer: "Pupuk Kalsium",
    explanation: "Cangkang telur kaya kalsium dan ampas kopi kaya nitrogen, kombinasi hebat untuk nutrisi tanaman!",
    success: true,
    resultIcon: <Sparkles className="w-12 h-12 text-green-500" />
  },
  {
    id: "e6",
    items: ["Sisa Potongan Rambut", "Tanah"],
    options: ["Kompos Lambat", "Emas", "Plastik", "Minyak"],
    correctAnswer: "Kompos Lambat",
    explanation: "Rambut adalah bahan organik yang kaya nitrogen, tapi butuh waktu lama untuk terurai di tanah.",
    success: true,
    resultIcon: <RefreshCcw className="w-12 h-12 text-stone-500" />
  },

  // Medium (3 items)
  {
    id: "m1",
    items: ["Sisa Sayuran", "Kardus Bekas", "Air Cucian Beras"],
    options: ["Kompos Cepat", "Ledakan Gas", "Racun Tanaman", "Batu"],
    correctAnswer: "Kompos Cepat",
    explanation: "Air cucian beras mengandung nutrisi mikroba, mempercepat kardus dan sayuran jadi kompos!",
    success: true,
    resultIcon: <Sparkles className="w-12 h-12 text-emerald-500" />
  },
  {
    id: "m2",
    items: ["Kulit Pisang", "Kulit Nanas", "Molase (Tetes Tebu)"],
    options: ["Eco-Enzyme Super", "Minuman Segar", "Cairan Asam", "Minyak Bumi"],
    correctAnswer: "Eco-Enzyme Super",
    explanation: "Kombinasi berbagai kulit buah dengan molase menghasilkan enzim yang sangat kaya manfaat.",
    success: true,
    resultIcon: <Droplets className="w-12 h-12 text-teal-500" />
  },
  {
    id: "m3",
    items: ["Sisa Daging", "Sisa Ikan", "Plastik Wrap"],
    options: ["Bau Busuk & Belatung", "Pupuk Wangi", "Tanah Subur", "Pakan Burung"],
    correctAnswer: "Bau Busuk & Belatung",
    explanation: "Sisa protein hewani dalam wadah plastik tertutup akan membusuk dengan bau menyengat dan mengundang lalat.",
    success: false,
    resultIcon: <AlertTriangle className="w-12 h-12 text-orange-500" />
  },
  {
    id: "m4",
    items: ["Serbuk Gergaji", "Kotoran Ternak", "Kapur Pertanian"],
    options: ["Kompos Stabil", "Pasir Pantai", "Semen", "Logam"],
    correctAnswer: "Kompos Stabil",
    explanation: "Kapur membantu menetralkan pH saat kotoran ternak dan serbuk gergaji berproses jadi kompos.",
    success: true,
    resultIcon: <Sparkles className="w-12 h-12 text-amber-700" />
  },
  {
    id: "m5",
    items: ["Sisa Buah", "Sayur Layu", "EM4 (Bioaktivator)"],
    options: ["Bokashi", "Yogurt", "Alkohol", "Cuka"],
    correctAnswer: "Bokashi",
    explanation: "Penggunaan bioaktivator EM4 pada sisa organik menghasilkan pupuk fermentasi yang disebut Bokashi.",
    success: true,
    resultIcon: <RefreshCcw className="w-12 h-12 text-lime-600" />
  },

  // Hard (4 items)
  {
    id: "h1",
    items: ["Sisa Makanan", "Rumput Liar", "Sekam Padi", "Kotoran Ayam"],
    options: ["Pupuk Organik Lengkap", "Sampah Menumpuk", "Kebakaran", "Hujan Asam"],
    correctAnswer: "Pupuk Organik Lengkap",
    explanation: "Kombinasi lengkap unsur hijau, cokelat, dan aktivator alami menghasilkan pupuk dengan nutrisi seimbang.",
    success: true,
    resultIcon: <Sparkles className="w-12 h-12 text-green-700" />
  },
  {
    id: "h2",
    items: ["Minyak Jelantah", "Sisa Sayur", "Kertas Bekas", "Baterai"],
    options: ["Limbah Berbahaya", "Bahan Bakar", "Pupuk Cair", "Sabun"],
    correctAnswer: "Limbah Berbahaya",
    explanation: "Mencampur minyak jelantah dan baterai (B3) ke sampah organik akan meracuni seluruh ekosistem tanah!",
    success: false,
    resultIcon: <AlertTriangle className="w-12 h-12 text-red-700" />
  },
  {
    id: "h3",
    items: ["Limbah Tahu", "Jerami", "Dedak Padi", "Probiotik"],
    options: ["Pakan Ternak/Maggot", "Limbah Sungai", "Batu Kali", "Kain"],
    correctAnswer: "Pakan Ternak/Maggot",
    explanation: "Limbah tahu dan dedak adalah media tumbuh yang sangat baik untuk budidaya Maggot BSF.",
    success: true,
    resultIcon: <RefreshCcw className="w-12 h-12 text-yellow-700" />
  },
  {
    id: "h4",
    items: ["Daun Bambu", "Tanah Hutan", "Gula Pasir", "Air Kelapa"],
    options: ["Mikroorganisme Lokal", "Minuman Manis", "Air Keruh", "Pupuk Kimia"],
    correctAnswer: "Mikroorganisme Lokal",
    explanation: "Ini adalah resep membuat MOL (Mikroorganisme Lokal) untuk mempercepat pengomposan secara mandiri.",
    success: true,
    resultIcon: <Droplets className="w-12 h-12 text-indigo-500" />
  },
  {
    id: "h5",
    items: ["Sisa Roti", "Susu Basi", "Buah Busuk", "Ragi"],
    options: ["Pupuk Cair Fermentasi", "Roti Baru", "Keju", "Racun Tikus"],
    correctAnswer: "Pupuk Cair Fermentasi",
    explanation: "Bahan-bahan ini kaya akan karbohidrat dan gula, sangat baik untuk difermentasi jadi pupuk cair.",
    success: true,
    resultIcon: <Droplets className="w-12 h-12 text-purple-500" />
  }
];

export const OrganicAlchemist: React.FC = () => {
  const { unlockAchievement } = useSettings();
  const [level, setLevel] = useState<GameLevel | null>(null);
  const [sessionRecipes, setSessionRecipes] = useState<Recipe[]>([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'intro' | 'level_select' | 'playing' | 'result'>('intro');

  useEffect(() => {
    if (gameState === 'result' && score === sessionRecipes.length && level) {
      unlockAchievement({
        id: `organic_alchemist_${level}_perfect`,
        name: level === 'easy' ? 'Alchemist Pemula' : level === 'medium' ? 'Alchemist Pro' : 'Master Alchemist Bandung',
        description: `Menyelesaikan level ${level === 'easy' ? 'Mudah' : level === 'medium' ? 'Menengah' : 'Sulit'} tanpa satu pun kesalahan!`,
        icon: 'FlaskConical',
        source: 'Organic Alchemist'
      });
    }
  }, [gameState, score, level, sessionRecipes.length, unlockAchievement]);

  const startGame = (selectedLevel: GameLevel) => {
    setLevel(selectedLevel);
    let count = 5;
    if (selectedLevel === 'medium') count = 10;
    if (selectedLevel === 'hard') count = 15;

    // Shuffle and pick recipes
    const shuffled = [...RECIPE_POOL].sort(() => Math.random() - 0.5);
    setSessionRecipes(shuffled.slice(0, count));
    
    setCurrentLevel(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setGameState('playing');
  };

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    const correct = option === sessionRecipes[currentLevel].correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  const nextLevel = () => {
    if (currentLevel < sessionRecipes.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      setGameState('result');
    }
  };

  const resetGame = () => {
    setGameState('level_select');
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-[40px] shadow-2xl border border-gray-100 dark:border-stone-800 overflow-hidden min-h-[600px] flex flex-col">
      <div className="bg-eco-green-800 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FlaskConical className="text-yellow-400 h-8 w-8" />
          <h3 className="text-xl font-black text-white uppercase tracking-tighter">Organic Alchemist</h3>
        </div>
        {gameState === 'playing' && (
          <div className="bg-white/10 px-4 py-1 rounded-full text-xs font-black text-white uppercase tracking-widest">
            Level {currentLevel + 1} / {sessionRecipes.length}
          </div>
        )}
      </div>

      <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {gameState === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-2xl"
            >
              <div className="w-24 h-24 bg-eco-green-100 dark:bg-eco-green-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl rotate-3">
                <FlaskConical className="h-12 w-12 text-eco-green-600" />
              </div>
              <h4 className="text-3xl font-black text-eco-brown-900 dark:text-white mb-6">Halo, Alchemist Bandung!</h4>
              <p className="text-lg text-gray-600 dark:text-stone-400 font-bold mb-8 leading-relaxed">
                Tugas kamu adalah menggabungkan bahan-bahan sampah agar tidak mencemari trotoar jalanan. Tebak hasil gabungan dari bahan-bahan organik yang ada!
              </p>
              <button 
                onClick={() => setGameState('level_select')}
                className="px-12 py-5 bg-eco-green-600 text-white text-xl font-black rounded-full hover:bg-eco-green-700 transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
              >
                Mulai Eksperimen
              </button>
            </motion.div>
          )}

          {gameState === 'level_select' && (
            <motion.div 
              key="level_select"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center w-full max-w-2xl"
            >
              <h4 className="text-3xl font-black text-eco-brown-900 dark:text-white mb-8 uppercase tracking-tight">Pilih Tingkat Keahlian</h4>
              <div className="grid grid-cols-1 gap-4">
                {(['easy', 'medium', 'hard'] as GameLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => startGame(lvl)}
                    className={`p-6 rounded-3xl border-4 transition-all transform hover:scale-105 font-black text-2xl flex items-center justify-between group ${
                      lvl === 'easy' ? 'border-green-200 bg-green-50 text-green-700 hover:border-green-500' :
                      lvl === 'medium' ? 'border-yellow-200 bg-yellow-50 text-yellow-700 hover:border-yellow-500' :
                      'border-red-200 bg-red-50 text-red-700 hover:border-red-500'
                    }`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="uppercase">{lvl === 'easy' ? 'Mudah' : lvl === 'medium' ? 'Menengah' : 'Sulit'}</span>
                      <span className="text-sm font-bold opacity-60">
                        {lvl === 'easy' ? '5 Eksperimen • 2 Bahan' : lvl === 'medium' ? '10 Eksperimen • 3 Bahan' : '15 Eksperimen • 4 Bahan'}
                      </span>
                    </div>
                    <Star className={`h-8 w-8 ${lvl === 'hard' ? 'fill-red-500' : lvl === 'medium' ? 'fill-yellow-500' : 'fill-green-500'}`} />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {gameState === 'playing' && sessionRecipes[currentLevel] && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="w-full max-w-4xl"
            >
              <div className="flex flex-col items-center justify-center gap-8 mb-12">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {sessionRecipes[currentLevel].items.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <div className="w-32 h-32 bg-gray-50 dark:bg-stone-800 rounded-[24px] border-4 border-dashed border-gray-200 dark:border-stone-700 flex flex-col items-center justify-center p-3 text-center shadow-inner">
                        <span className="text-[10px] font-black text-gray-400 uppercase mb-1">Bahan {idx + 1}</span>
                        <p className="text-xs font-black text-eco-brown-900 dark:text-white leading-tight">{item}</p>
                      </div>
                      {idx < sessionRecipes[currentLevel].items.length - 1 && (
                        <div className="bg-eco-green-100 dark:bg-eco-green-900/30 p-2 rounded-full">
                          <Plus className="h-5 w-5 text-eco-green-600" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                  
                  <div className="mx-2">
                    <ArrowRight className="h-8 w-8 text-gray-300" />
                  </div>

                  <div className="w-48 h-48 bg-white dark:bg-stone-900 rounded-[40px] border-4 border-eco-green-500 flex flex-col items-center justify-center p-6 text-center shadow-2xl relative overflow-hidden group">
                    {isAnswered ? (
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        className="flex flex-col items-center"
                      >
                        {sessionRecipes[currentLevel].resultIcon}
                        <p className={`mt-3 text-sm font-black uppercase tracking-widest ${isCorrect ? 'text-eco-green-600' : 'text-red-500'}`}>
                          {selectedOption}
                        </p>
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center opacity-30">
                        <FlaskConical className="h-16 w-16 text-gray-400 animate-pulse" />
                        <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Hasil Reaksi?</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-eco-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {sessionRecipes[currentLevel].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered}
                    className={`p-6 text-left rounded-2xl border-2 transition-all font-black text-lg shadow-sm hover:shadow-md active:scale-[0.98] flex items-center justify-between ${
                      isAnswered 
                        ? option === sessionRecipes[currentLevel].correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                          : option === selectedOption
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                            : 'border-gray-100 dark:border-stone-800 text-gray-300 dark:text-stone-700'
                        : 'border-gray-100 dark:border-stone-800 bg-gray-50 dark:bg-stone-800/50 hover:border-eco-green-500 hover:bg-white dark:hover:bg-stone-800 text-gray-700 dark:text-stone-200'
                    }`}
                  >
                    <span>{option}</span>
                    {isAnswered && option === sessionRecipes[currentLevel].correctAnswer && <Sparkles className="h-5 w-5" />}
                  </button>
                ))}
              </div>

              {isAnswered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-3xl mb-8 ${isCorrect ? 'bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30' : 'bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30'}`}
                >
                  <div className="flex gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                      {isCorrect ? <Sparkles className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                    </div>
                    <div>
                      <h5 className={`font-black uppercase text-xs tracking-widest mb-1 ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                        {isCorrect ? 'Eksperimen Berhasil!' : 'Eksperimen Gagal!'}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-stone-400 font-medium leading-relaxed">
                        {sessionRecipes[currentLevel].explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {isAnswered && (
                <button 
                  onClick={nextLevel}
                  className="w-full py-5 bg-eco-green-600 text-white text-xl font-black rounded-full hover:bg-eco-green-700 transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  {currentLevel < sessionRecipes.length - 1 ? 'Eksperimen Berikutnya' : 'Lihat Hasil Akhir'}
                  <ArrowRight className="h-6 w-6" />
                </button>
              )}
            </motion.div>
          )}

          {gameState === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-md"
            >
              <div className="w-32 h-32 bg-yellow-400 rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-6">
                <FlaskConical className="h-16 w-16 text-eco-green-900" />
              </div>
              <h4 className="text-4xl font-black text-eco-brown-900 dark:text-white mb-2">Master Alchemist!</h4>
              <p className="text-xl text-gray-500 dark:text-stone-400 font-bold mb-10">
                Kamu berhasil menyelesaikan {score} dari {sessionRecipes.length} eksperimen dengan benar di level {level}.
              </p>
              
              <div className="bg-gray-50 dark:bg-stone-800 p-8 rounded-[40px] border border-gray-100 dark:border-stone-700 mb-10">
                <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Skor Alchemist</p>
                <p className="text-6xl font-black text-eco-green-600">{Math.round((score / sessionRecipes.length) * 100)}%</p>
              </div>

              <button 
                onClick={resetGame}
                className="w-full py-5 bg-eco-green-600 text-white text-xl font-black rounded-full hover:bg-eco-green-700 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                <RefreshCcw className="h-6 w-6" /> Main Lagi
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
