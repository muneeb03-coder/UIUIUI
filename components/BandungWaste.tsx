
import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, ArrowLeft, Bus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BandungWasteProps {
  onBack: () => void;
}

export const BandungWaste: React.FC<BandungWasteProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [busCount, setBusCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBusCount(prev => (prev < 20 ? prev + 1 : prev));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { year: '2020', tons: '1,200', height: '45%', color: 'bg-red-300' },
    { year: '2021', tons: '1,350', height: '60%', color: 'bg-red-400' },
    { year: '2022', tons: '1,500', height: '80%', color: 'bg-red-500' },
    { year: '2023+', tons: '1,594', height: '100%', color: 'bg-red-700' },
  ];

  const wasteData = [
    { label: 'Sisa Makanan', value: 44.52, color: 'bg-orange-500' },
    { label: 'Plastik', value: 16.70, color: 'bg-blue-400' },
    { label: 'Kertas', value: 13.12, color: 'bg-yellow-400' },
    { label: 'Lain-lain', value: 25.66, color: 'bg-gray-300' },
  ];

  return (
    <div className="min-h-screen bg-eco-brown-100 dark:bg-stone-950 flex flex-col animate-fade-in">
      <div className="flex-grow flex flex-col items-center py-10 px-4 gap-12">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-eco-green-900 dark:text-white mb-4">
              Permasalahan Sampah Bandung
            </h1>
            <p className="text-xl text-gray-600 dark:text-stone-400 max-w-3xl mx-auto">
              Berikut adalah data dan fakta mengenai krisis sampah yang sedang dihadapi oleh Kota Bandung saat ini.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Permasalahan 1: Bandung Darurat Sampah */}
            <div className="bg-white dark:bg-stone-900 rounded-[40px] shadow-2xl overflow-hidden border border-red-100 dark:border-stone-800 flex flex-col min-h-[600px]">
              <div className="p-8 md:p-12 flex flex-col justify-center h-full">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-sm font-bold mb-6 w-fit">
                  <AlertTriangle className="h-4 w-4 animate-pulse" />
                  <span>DARURAT SAMPAH BANDUNG: 1.735 M³/HARI</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                  {t('bandung_waste_title')}
                </h2>
                
                <p className="text-lg text-gray-600 dark:text-stone-400 mb-8 leading-relaxed">
                  Bandung memproduksi sekitar <span className="text-red-600 font-black">1.735 meter kubik</span> sampah setiap harinya. Jika tidak dikelola, tumpukan ini akan menenggelamkan kota kita dalam waktu singkat.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-3xl border-b-8 border-red-500 text-center transition-transform hover:scale-105 shadow-lg relative overflow-hidden group">
                    <TrendingUp className="h-8 w-8 text-red-600 mx-auto mb-3" />
                    <div className="text-2xl font-black text-red-900 dark:text-red-400">{t('bandung_stat_1_val')}</div>
                    <div className="text-xs font-bold text-red-700 dark:text-red-500 uppercase tracking-widest">{t('bandung_stat_1_label')}</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-3xl border-b-8 border-orange-500 text-center transition-transform hover:scale-105 shadow-lg relative overflow-hidden group">
                    <div className="h-8 w-8 text-orange-600 mx-auto mb-3 text-2xl">🍎</div>
                    <div className="text-2xl font-black text-orange-900 dark:text-orange-400">{t('bandung_stat_2_val')}</div>
                    <div className="text-xs font-bold text-orange-700 dark:text-orange-500 uppercase tracking-widest">{t('bandung_stat_2_label')}</div>
                  </div>
                </div>

                <div className="p-6 bg-red-600 text-white rounded-2xl border-l-8 border-red-900 inline-block animate-pulse shadow-xl">
                  <p className="font-black text-lg">
                    ⚠️ SETIAP DETIK SAMPAH TERUS BERTAMBAH!
                  </p>
                </div>
              </div>
            </div>

            {/* Permasalahan 2: Produksi Sampah Bandung (Chart) */}
            <div className="bg-white dark:bg-stone-900 rounded-[40px] shadow-2xl p-8 md:p-10 border border-gray-100 dark:border-stone-800 relative group/chart">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600 animate-pulse" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-black text-xl text-gray-800 dark:text-white tracking-tight leading-none">Produksi Sampah Bandung</h3>
                    <span className="text-red-600 font-black text-lg">1.735 M³/Hari</span>
                  </div>
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Data BPS Bandung</div>
              </div>

              <div className="flex items-end justify-between gap-4 h-64 px-2">
                {wasteData.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex-1 flex flex-col items-center gap-4 group cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="relative w-full flex flex-col items-center">
                      <div className={`absolute -top-12 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-black shadow-xl transition-all duration-300 z-30 ${hoveredIndex === idx ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}>
                        {item.value}%
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                      </div>
                      <div 
                        className={`w-full ${item.color} rounded-t-2xl transition-all duration-1000 ease-out shadow-lg group-hover:brightness-110 group-hover:-translate-y-2 relative overflow-hidden`}
                        style={{ height: `${item.value * 3}px`, minHeight: '20px' }} 
                      >
                        {item.label === 'Sisa Makanan' && (
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        )}
                      </div>
                    </div>
                    <span className={`text-[10px] font-black text-center uppercase tracking-tight transition-colors duration-300 ${hoveredIndex === idx ? 'text-eco-green-600' : 'text-gray-400'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-gray-100 dark:border-stone-800">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex-1 text-center sm:text-left">
                        <p className="text-lg text-gray-800 dark:text-stone-200 font-black italic mb-2 leading-relaxed">
                          "Jumlah sampah sisa makanan setara dengan 20 bus ditumpuk!"
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">
                          Sumber: BPS Kota Bandung, 2020
                        </p>
                    </div>

                    <div className="relative w-32 h-48 flex flex-col-reverse items-center justify-start pb-4">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div 
                                key={i}
                                className={`absolute transition-all duration-700 ease-out`}
                                style={{ 
                                    bottom: `${i * 8}px`, 
                                    opacity: i < busCount ? 1 : 0, 
                                    transform: i < busCount ? 'translateY(0)' : 'translateY(-40px)',
                                    zIndex: 20 - i
                                }}
                            >
                                <Bus className={`h-10 w-10 text-orange-500 fill-orange-100 stroke-[2.5] ${i === 19 ? 'animate-bounce' : ''}`} />
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* Laju Pertumbuhan Section */}
          <div className="mt-12 bg-black rounded-[40px] p-10 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-red-600 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-600 rounded-full blur-[120px] animate-pulse delay-700"></div>
             </div>
             
             <div className="relative z-10 w-full">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <div className="text-xs font-black uppercase tracking-[0.3em] text-red-500 mb-2 animate-pulse">KRISIS MENINGKAT</div>
                        <div className="text-3xl font-bold text-white">Laju Pertumbuhan Sampah</div>
                    </div>
                    <AlertTriangle className="text-red-500 h-8 w-8 animate-bounce" />
                </div>
                
                <div className="h-80 w-full flex items-end justify-between gap-4 px-2 border-b border-white/10 pb-2">
                    {stats.map((stat, idx) => (
                        <div 
                            key={idx} 
                            className="flex-1 flex flex-col items-center gap-4 group cursor-pointer"
                            onMouseEnter={() => setHoveredBar(idx)}
                            onMouseLeave={() => setHoveredBar(null)}
                        >
                            <div className="relative w-full flex flex-col items-center">
                                <div className={`absolute -top-14 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-black shadow-2xl transition-all duration-300 z-30 ${hoveredBar === idx ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'}`}>
                                    {stat.tons} Ton/Hari
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-red-600"></div>
                                </div>
                                <div 
                                    className={`w-full ${stat.color} rounded-t-2xl transition-all duration-700 shadow-[0_0_20px_rgba(239,68,68,0.3)] group-hover:brightness-125 group-hover:shadow-red-500/60 group-hover:-translate-y-2 border-x border-t border-white/20`}
                                    style={{ height: stat.height, minHeight: '30px' }}
                                >
                                    <div className="w-full h-full bg-gradient-to-t from-black/40 to-transparent"></div>
                                </div>
                            </div>
                            <span className={`text-xs font-black tracking-widest transition-colors duration-300 ${hoveredBar === idx ? 'text-red-500' : 'text-gray-400'}`}>
                                {stat.year}
                            </span>
                        </div>
                    ))}
                </div>
                
                <div className="mt-10 pt-6 flex justify-between items-center">
                    <span className="text-[10px] text-red-500 font-black uppercase tracking-[0.2em] animate-pulse">Bahaya: Kapasitas TPA Hampir Penuh</span>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-600 animate-ping"></div>
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
