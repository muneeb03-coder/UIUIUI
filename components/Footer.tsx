import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const sources = [
    { name: "BPS Kota Bandung 2020", url: "https://bandungkota.bps.go.id/id/statistics-table/1/MTQ1NyMx/produksi-sampah-menurut-jenisnya-di-kota-bandung-2020.html" },
    { name: "Detik Jabar - Produksi Sampah Bandung", url: "https://www.detik.com/jabar/berita/d-6724978/produksi-sampah-di-bandung-meningkat-tiap-tahun" },
    { name: "Databoks Katadata - Jenis Sampah Dunia", url: "https://databoks.katadata.co.id/infografik/2023/06/14/inilah-jenis-sampah-paling-banyak-ditemukan-di-pesisir-pantai-dunia" }
  ];

  return (
    <footer className="bg-eco-brown-900 text-eco-brown-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
          <div>
            <p className="font-bold text-2xl mb-2 tracking-tight">E-<span className="text-yellow-400">care</span></p>
            <p className="text-sm text-eco-brown-200 mb-6">{t('footer_desc')}</p>
            <div className="flex items-center text-xs opacity-70">
                <span>{t('footer_made')}</span>
                <Heart className="h-3 w-3 mx-1 text-red-400 fill-current" />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-eco-brown-200 mb-4">Referensi Data</h4>
            <ul className="space-y-3">
              {sources.map((src, i) => (
                <li key={i}>
                  <a 
                    href={src.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-eco-brown-300 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {src.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-eco-brown-800 text-center">
            <p className="text-[10px] text-eco-brown-400 uppercase tracking-widest">&copy; {new Date().getFullYear()} E-care Platform. Let's make the earth greener together.</p>
        </div>
      </div>
    </footer>
  );
};