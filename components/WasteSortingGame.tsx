
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, AlertCircle, CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

type GameLevel = 'easy' | 'medium' | 'hard';

interface WasteItem {
  id: number;
  name: string;
  type: 'organic' | 'non-organic' | 'b3';
  image: string;
  explanation: string;
}

const WASTE_POOL: WasteItem[] = [
  // Organic
  { id: 1, name: 'Tulang Ayam', type: 'organic', image: 'https://images.unsplash.com/photo-1585325701166-381ca9117f41?auto=format&fit=crop&w=400&q=80', explanation: 'Tulang ayam adalah sisa makanan yang bisa membusuk secara alami.' },
  { id: 2, name: 'Kulit Jeruk', type: 'organic', image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=400&q=80', explanation: 'Kulit buah termasuk sampah organik yang sangat bagus untuk kompos.' },
  { id: 3, name: 'Sisa Nasi', type: 'organic', image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=400&q=80', explanation: 'Sisa makanan seperti nasi adalah bahan organik yang mudah terurai.' },
  { id: 4, name: 'Daun Kering', type: 'organic', image: 'https://images.unsplash.com/photo-1508500351770-9c21d7915044?auto=format&fit=crop&w=400&q=80', explanation: 'Daun kering adalah sampah organik cokelat yang kaya akan karbon.' },
  { id: 5, name: 'Kulit Pisang', type: 'organic', image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=80', explanation: 'Kulit pisang mengandung banyak nutrisi untuk tanaman jika dikomposkan.' },
  { id: 6, name: 'Sisa Sayur', type: 'organic', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80', explanation: 'Sisa sayuran mentah adalah bahan organik hijau yang kaya nitrogen.' },
  { id: 7, name: 'Ampas Kopi', type: 'organic', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=400&q=80', explanation: 'Ampas kopi bisa langsung ditaburkan ke tanah sebagai pupuk organik.' },
  
  // Non-Organic
  { id: 8, name: 'Botol Plastik', type: 'non-organic', image: 'https://images.unsplash.com/photo-1523293913410-44a2b3d38f1f?auto=format&fit=crop&w=400&q=80', explanation: 'Botol plastik butuh ratusan tahun untuk terurai, harus didaur ulang.' },
  { id: 9, name: 'Kaleng Soda', type: 'non-organic', image: 'https://images.unsplash.com/photo-1527960471264-93ad993981fe?auto=format&fit=crop&w=400&q=80', explanation: 'Kaleng logam termasuk sampah anorganik yang bisa didaur ulang selamanya.' },
  { id: 10, name: 'Kertas Koran', type: 'non-organic', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80', explanation: 'Meskipun dari kayu, kertas olahan seringkali mengandung tinta dan bahan kimia.' },
  { id: 11, name: 'Styrofoam', type: 'non-organic', image: 'https://images.unsplash.com/photo-1605600611284-19561ad7ddf0?auto=format&fit=crop&w=400&q=80', explanation: 'Styrofoam sangat sulit didaur ulang dan berbahaya bagi lingkungan.' },
  { id: 12, name: 'Plastik Kresek', type: 'non-organic', image: 'https://images.unsplash.com/photo-1597348344664-31c11b3cc9a0?auto=format&fit=crop&w=400&q=80', explanation: 'Kantong plastik adalah polutan utama di laut dan tanah.' },
  { id: 13, name: 'Kaca Pecah', type: 'non-organic', image: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&w=400&q=80', explanation: 'Kaca tidak bisa membusuk dan harus dipisahkan demi keamanan.' },
  
  // B3 (Hazardous)
  { id: 14, name: 'Baterai Bekas', type: 'b3', image: 'https://images.unsplash.com/photo-1619641782822-751f8523ad74?auto=format&fit=crop&w=400&q=80', explanation: 'Baterai mengandung logam berat beracun yang bisa mencemari air tanah.' },
  { id: 15, name: 'Lampu TL', type: 'b3', image: 'https://images.unsplash.com/photo-1624968843142-039185461141?auto=format&fit=crop&w=400&q=80', explanation: 'Lampu TL mengandung uap raksa yang sangat berbahaya jika pecah.' },
  { id: 16, name: 'Botol Obat Nyamuk', type: 'b3', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80', explanation: 'Wadah pestisida atau bahan kimia rumah tangga adalah limbah B3.' },
  { id: 17, name: 'Masker Medis', type: 'b3', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', explanation: 'Limbah medis bisa membawa penyakit dan harus dikelola secara khusus.' },
  { id: 18, name: 'Aki Bekas', type: 'b3', image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=400&q=80', explanation: 'Aki mengandung asam kuat dan timbal yang sangat merusak lingkungan.' },
];

export const WasteSortingGame: React.FC = () => {
  const { unlockAchievement } = useSettings();
  const [level, setLevel] = useState<GameLevel | null>(null);
  const [items, setItems] = useState<WasteItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'won'>('idle');
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong'; message: string } | null>(null);
  const [dragDirection, setDragDirection] = useState<'left' | 'center' | 'right' | null>(null);

  useEffect(() => {
    if (gameState === 'won' && mistakes === 0 && level) {
      const achievementId = `waste_sorting_${level}_perfect`;
      const achievementName = level === 'easy' ? 'Pilah Pemula' : level === 'medium' ? 'Pilah Pro' : 'Pilah Legend';
      const achievementDesc = `Menyelesaikan level ${level === 'easy' ? 'Mudah' : level === 'medium' ? 'Menengah' : 'Sulit'} tanpa satu pun kesalahan!`;
      
      unlockAchievement({
        id: achievementId,
        name: achievementName,
        description: achievementDesc,
        icon: 'Trash2',
        source: 'Pilah Sampahmu!'
      });
    }
  }, [gameState, mistakes, level, unlockAchievement]);

  const startGame = (selectedLevel: GameLevel) => {
    setLevel(selectedLevel);
    let itemCount = 15;
    if (selectedLevel === 'easy') itemCount = 5;
    if (selectedLevel === 'medium') itemCount = 10;

    const shuffled = [...WASTE_POOL].sort(() => Math.random() - 0.5);
    
    // Filter items based on level if needed (e.g., easy has no B3)
    let filtered = shuffled;
    if (selectedLevel === 'easy') {
      filtered = shuffled.filter(item => item.type !== 'b3');
    }

    setItems(filtered.slice(0, itemCount));
    setCurrentIndex(0);
    setMistakes(0);
    setScore(0);
    setGameState('playing');
    setFeedback(null);
    setDragDirection(null);
  };

  const handleSort = (type: 'organic' | 'non-organic' | 'b3') => {
    if (gameState !== 'playing' || feedback) return;

    const currentItem = items[currentIndex];
    if (currentItem.type === type) {
      setScore(score + 1);
      setFeedback({ type: 'correct', message: 'Benar! 🥳' });
    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setFeedback({ type: 'wrong', message: `Salah! ${currentItem.explanation}` });
      if (newMistakes >= 3) {
        setTimeout(() => setGameState('gameover'), 1000);
        return;
      }
    }

    setTimeout(() => {
      setFeedback(null);
      setDragDirection(null);
      if (currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setGameState('won');
      }
    }, 1000);
  };

  if (gameState === 'idle') {
    return (
      <div className="text-center p-12 bg-white dark:bg-stone-900 rounded-[50px] shadow-2xl border border-gray-100 dark:border-stone-800 max-w-2xl mx-auto animate-fade-in">
        <h2 className="text-4xl font-black text-eco-brown-900 dark:text-white mb-8 uppercase tracking-tight">Pilih Level Game</h2>
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
                  {lvl === 'easy' ? '5 Sampah • 2 Kategori' : lvl === 'medium' ? '10 Sampah • 3 Kategori' : '15 Sampah • 3 Kategori'}
                </span>
              </div>
              <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === 'gameover') {
    return (
      <div className="text-center p-12 bg-red-50 dark:bg-red-900/10 rounded-[40px] border-4 border-red-200 dark:border-red-900/30 animate-fade-in max-w-2xl mx-auto shadow-2xl">
        <XCircle className="h-24 w-24 text-red-600 mx-auto mb-6" />
        <h2 className="text-4xl font-black text-red-900 dark:text-red-400 mb-4 uppercase tracking-tight">Game Over!</h2>
        <p className="text-xl text-gray-600 dark:text-stone-400 mb-10">Kamu melakukan 3 kesalahan. Jangan menyerah, ayo coba lagi!</p>
        <button 
          onClick={() => setGameState('idle')} 
          className="px-10 py-4 bg-red-600 text-white rounded-full font-black text-xl flex items-center gap-3 mx-auto hover:bg-red-700 transition-all shadow-xl active:scale-95"
        >
          <RotateCcw className="h-6 w-6" /> Coba Lagi
        </button>
      </div>
    );
  }

  if (gameState === 'won') {
    return (
      <div className="text-center p-12 bg-green-50 dark:bg-green-900/10 rounded-[40px] border-4 border-green-200 dark:border-green-900/30 animate-fade-in max-w-2xl mx-auto shadow-2xl">
        <CheckCircle2 className="h-24 w-24 text-green-600 mx-auto mb-6" />
        <h2 className="text-4xl font-black text-green-900 dark:text-green-400 mb-4 uppercase tracking-tight">Luar Biasa!</h2>
        <p className="text-xl text-gray-600 dark:text-stone-400 mb-10">Kamu berhasil memilah semua sampah dengan benar di level {level}. Kamu adalah pahlawan lingkungan!</p>
        <button 
          onClick={() => setGameState('idle')} 
          className="px-10 py-4 bg-green-600 text-white rounded-full font-black text-xl flex items-center gap-3 mx-auto hover:bg-green-700 transition-all shadow-xl active:scale-95"
        >
          <RotateCcw className="h-6 w-6" /> Main Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-stone-900 rounded-[50px] shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-stone-800 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 left-0 w-1/3 h-full bg-eco-green-500/5 transition-opacity duration-500 ${dragDirection === 'left' ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-0 left-1/3 w-1/3 h-full bg-gray-500/5 transition-opacity duration-500 ${dragDirection === 'center' ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-0 right-0 w-1/3 h-full bg-red-500/5 transition-opacity duration-500 ${dragDirection === 'right' ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>

      {/* Game Stats */}
      <div className="flex justify-between items-center mb-12 relative z-10">
        <div className="flex flex-col">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Skor Kamu</span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-eco-green-600">{score}</span>
            <span className="text-lg font-bold text-gray-300">/ {items.length}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-eco-green-600 mb-1">Level</span>
          <span className="text-xl font-black uppercase text-eco-brown-900 dark:text-white">{level}</span>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Nyawa (Salah)</span>
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i} 
                animate={{ 
                  scale: i < mistakes ? [1, 1.5, 1] : 1,
                  rotate: i < mistakes ? [0, 10, -10, 0] : 0
                }}
                className={`h-5 w-5 rounded-full shadow-inner ${i < mistakes ? 'bg-red-500' : 'bg-gray-200 dark:bg-stone-700'}`}
              ></motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="relative h-96 flex items-center justify-center mb-16">
        <AnimatePresence mode="wait">
          {items[currentIndex] && (
            <motion.div
              key={items[currentIndex].id}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.7}
              onDrag={(e, info) => {
                if (info.offset.x < -100) setDragDirection('left');
                else if (info.offset.x > 100) setDragDirection('right');
                else if (Math.abs(info.offset.y) > 50 && level !== 'easy') setDragDirection('center');
                else setDragDirection(null);
              }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -150) handleSort('organic');
                else if (info.offset.x > 150) handleSort('non-organic');
                else if (info.offset.y > 100 && level !== 'easy') handleSort('b3');
                else setDragDirection(null);
              }}
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ 
                scale: 0.5, 
                opacity: 0, 
                x: feedback?.type === 'correct' ? (items[currentIndex].type === 'organic' ? -400 : items[currentIndex].type === 'non-organic' ? 400 : 0) : 0,
                y: feedback?.type === 'correct' && items[currentIndex].type === 'b3' ? 400 : feedback?.type === 'wrong' ? 200 : -200,
                rotate: feedback?.type === 'correct' ? (items[currentIndex].type === 'organic' ? -45 : 45) : 0
              }}
              whileDrag={{ scale: 1.1, rotate: 5, cursor: 'grabbing' }}
              className="flex flex-col items-center gap-6 cursor-grab z-10 bg-white dark:bg-stone-800 p-4 rounded-[40px] shadow-2xl border border-gray-100 dark:border-stone-700 touch-none w-64"
            >
              <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-inner">
                <img 
                  src={items[currentIndex].image} 
                  alt={items[currentIndex].name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight text-center">{items[currentIndex].name}</h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback Overlay */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1.2, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`absolute inset-0 flex items-center justify-center z-30 pointer-events-none`}
            >
              <div className={`px-10 py-5 rounded-3xl font-black text-xl shadow-2xl flex flex-col items-center gap-4 max-w-md text-center ${feedback.type === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                <div className="flex items-center gap-4 text-3xl">
                  {feedback.type === 'correct' ? <CheckCircle2 className="h-10 w-10" /> : <XCircle className="h-10 w-10" />}
                  {feedback.type === 'correct' ? 'Benar! 🥳' : 'Salah! 😅'}
                </div>
                {feedback.type === 'wrong' && (
                  <p className="text-sm font-bold leading-relaxed opacity-90">{feedback.message.replace('Salah! ', '')}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Control Bins */}
      <div className={`grid ${level === 'easy' ? 'grid-cols-2 max-w-2xl mx-auto' : 'grid-cols-3'} gap-6 relative z-10`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSort('organic')}
          className={`group relative h-40 border-4 rounded-[32px] flex flex-col items-center justify-center gap-2 transition-all shadow-xl overflow-hidden ${dragDirection === 'left' ? 'bg-eco-green-200 border-eco-green-500' : 'bg-eco-green-50 dark:bg-eco-green-900/10 border-eco-green-200 dark:border-eco-green-800'}`}
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-eco-green-500"></div>
          <Trash2 className={`h-12 w-12 transition-transform ${dragDirection === 'left' ? 'scale-125 text-eco-green-700' : 'text-eco-green-600 group-hover:scale-110'}`} />
          <span className="font-black text-eco-green-800 dark:text-eco-green-400 uppercase tracking-widest text-sm">Organik</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSort('non-organic')}
          className={`group relative h-40 border-4 rounded-[32px] flex flex-col items-center justify-center gap-2 transition-all shadow-xl overflow-hidden ${dragDirection === 'right' ? 'bg-gray-200 border-gray-500' : 'bg-gray-50 dark:bg-stone-800/50 border-gray-200 dark:border-stone-700'}`}
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gray-500"></div>
          <Trash2 className={`h-12 w-12 transition-transform ${dragDirection === 'right' ? 'scale-125 text-gray-800' : 'text-gray-600 group-hover:scale-110'}`} />
          <span className="font-black text-gray-800 dark:text-stone-300 uppercase tracking-widest text-sm">Non-Organik</span>
        </motion.button>

        {level !== 'easy' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSort('b3')}
            className={`group relative h-40 border-4 rounded-[32px] flex flex-col items-center justify-center gap-2 transition-all shadow-xl overflow-hidden ${dragDirection === 'center' ? 'bg-red-200 border-red-500' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'}`}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
            <AlertCircle className={`h-12 w-12 transition-transform ${dragDirection === 'center' ? 'scale-125 text-red-700' : 'text-red-600 group-hover:scale-110'}`} />
            <span className="font-black text-red-800 dark:text-red-400 uppercase tracking-widest text-sm">B3 (Bahaya)</span>
          </motion.button>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-12 flex items-center gap-3 text-gray-400 text-sm font-bold justify-center uppercase tracking-widest bg-gray-50 dark:bg-stone-800/50 py-4 rounded-2xl">
        <AlertCircle className="h-5 w-5 text-eco-green-500" />
        <span>
          {level === 'easy' ? 'Geser ke Kiri (Organik) atau Kanan (Non-Organik)' : 'Geser Kiri (Org), Kanan (Non), atau Bawah (B3)'}
        </span>
      </div>
    </div>
  );
};
