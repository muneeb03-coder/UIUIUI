import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BarChart3, ArrowRight } from 'lucide-react';

interface HeroProps {
  onLearnMore?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLearnMore }) => {
  const { t } = useLanguage();

  return (
    <div id="home" className="bg-eco-brown-100 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="text-left animate-fade-in">
            <h1 className="text-4xl tracking-tight font-extrabold text-eco-green-900 sm:text-5xl md:text-6xl leading-tight">
              <span className="block mb-2">{t('hero_title_1')}</span>
              <span className="block text-eco-green-600 drop-shadow-sm">{t('hero_title_2')}</span>
            </h1>
            
            <div className="w-20 h-2 bg-yellow-400 my-8 rounded-full shadow-sm"></div>
            
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 mb-10 transform hover:scale-[1.02] transition-transform duration-500">
              <p className="text-2xl text-eco-green-900 md:text-3xl font-black leading-relaxed">
                {t('hero_desc')}
              </p>
            </div>

            <p className="text-xl text-gray-500 md:text-2xl font-medium mb-12 italic">
              {t('hero_sub_desc')}
            </p>

            <div className="flex justify-start">
              <button 
                onClick={onLearnMore}
                className="inline-flex items-center justify-center px-12 py-6 border border-transparent text-xl font-black rounded-full text-white bg-eco-green-600 hover:bg-eco-green-800 md:text-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-eco-green-600/40 group animate-fade-in-up"
              >
                {t('hero_cta')} 
                <ArrowRight className="ml-3 h-8 w-8 group-hover:translate-x-3 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative hidden lg:flex flex-col items-center justify-center">
            <div className="w-full max-w-lg aspect-square bg-white rounded-[60px] shadow-2xl p-16 border border-gray-100 flex flex-col items-center justify-center text-center group">
              <div className="mb-10 p-6 bg-eco-green-100 rounded-full group-hover:scale-110 transition-transform duration-700">
                <BarChart3 className="h-24 w-24 text-eco-green-600" />
              </div>
              <h3 className="text-3xl font-black text-eco-green-900 mb-4">Produksi Sampah Bandung</h3>
              <div className="text-5xl font-black text-red-600 mb-6 animate-pulse">1.735 M³/Hari</div>
              <p className="text-xl text-gray-500 font-medium mb-10 leading-relaxed">
                Data terbaru menunjukkan lonjakan produksi sampah yang mengkhawatirkan di Kota Bandung.
              </p>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-eco-green-500 animate-pulse"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
