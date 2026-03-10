import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Lightbulb, Leaf, Droplets, Trash2, Home, Clock, Smile, Frown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Question {
  id: number;
  text: string;
  icon: React.ReactNode;
  options: {
    text: string;
    value: string;
  }[];
}

interface Solution {
  id: string;
  title: string;
  description: string;
  steps: string[];
  tools: string[];
  benefits: string[];
  icon: React.ReactNode;
  color: string;
  image: string;
  difficulty: number; // 1: Simple, 5: Hard
  difficultyLabel: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Berapa banyak waktu luang yang Anda miliki setiap hari untuk mengurus sampah?",
    icon: <Clock className="w-6 h-6 text-blue-500" />,
    options: [
      { text: "Sangat sedikit (kurang dari 10 menit)", value: "little" },
      { text: "Cukup banyak (bisa lebih dari 15 menit)", value: "much" }
    ]
  },
  {
    id: 2,
    text: "Apakah Anda memiliki area terbuka atau halaman di rumah?",
    icon: <Home className="w-6 h-6 text-green-500" />,
    options: [
      { text: "Tidak ada (Apartemen/Kos/Rumah tanpa halaman)", value: "no_space" },
      { text: "Ada (Halaman kecil atau taman belakang)", value: "space" }
    ]
  },
  {
    id: 3,
    text: "Bagaimana perasaan Anda terhadap aroma tanah atau kemungkinan adanya serangga kecil?",
    icon: <Smile className="w-6 h-6 text-yellow-500" />,
    options: [
      { text: "Sangat tidak suka/Geli", value: "dislike" },
      { text: "Tidak masalah, selama bermanfaat", value: "like" }
    ]
  },
  {
    id: 4,
    text: "Apa hasil akhir yang paling Anda harapkan dari pengolahan sampah ini?",
    icon: <Lightbulb className="w-6 h-6 text-purple-500" />,
    options: [
      { text: "Praktis & yang penting sampah hilang", value: "practical" },
      { text: "Pupuk cair atau padat untuk tanaman", value: "fertilizer" }
    ]
  }
];

const allSolutions: Solution[] = [
  {
    id: "eco_enzyme",
    title: "Eco-Enzyme (Cairan Ajaib)",
    description: "Eco-Enzyme ini beneran 'magic liquid' buat bumi kita. Selain ngurangin sampah dapur, cairan ini punya sejuta manfaat buat kebersihan rumah tangga secara alami. Cocok banget buat kamu yang pengen hidup lebih eco-friendly tanpa ribet.",
    steps: [
      "Siapkan wadah plastik kedap udara (jangan pakai kaca ya, karena gas fermentasi bisa bikin pecah).",
      "Campurkan air, gula merah/molase, dan kulit buah/sayur dengan rasio 10:1:3.",
      "Simpan selama 3 bulan di tempat yang teduh dan tidak terkena sinar matahari langsung.",
      "Pada minggu pertama, buka tutup wadah sesekali untuk membuang gas yang menumpuk.",
      "Setelah 3 bulan, saring cairannya. Ampasnya bisa jadi pupuk, cairannya jadi pembersih serbaguna!"
    ],
    tools: ["Wadah plastik kedap udara", "Timbangan digital", "Pisau & Talenan", "Botol spray (untuk pemakaian)"],
    benefits: ["Pembersih lantai & piring alami", "Pupuk cair organik", "Penjernih air selokan", "Mengurangi gas metana di TPA"],
    icon: <Droplets className="w-8 h-8" />,
    color: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1605600611284-195205ef91b6?auto=format&fit=crop&q=80&w=800",
    difficulty: 1,
    difficultyLabel: "Sangat Mudah"
  },
  {
    id: "kompos_tumpuk",
    title: "Kompos Tumpuk Terbuka",
    description: "Cara paling klasik dan alami. Cocok banget buat kamu yang punya kebun luas dan pengen cara yang paling hemat biaya. Tinggal tumpuk, biarkan alam yang bekerja mengurai semuanya.",
    steps: [
      "Pilih sudut halaman yang teduh dan tidak tergenang air saat hujan.",
      "Tumpuk sampah organik hijau (sisa dapur) dan cokelat (daun kering) secara berselang-seling.",
      "Siram sedikit air agar tumpukan tetap lembap (seperti spons basah).",
      "Aduk tumpukan seminggu sekali menggunakan garpu tanah agar udara masuk.",
      "Dalam 2-3 bulan, tumpukan akan berubah jadi tanah hitam yang sangat subur."
    ],
    tools: ["Garpu tanah/Sekop", "Terpal (untuk menutup)", "Gembor air", "Area tanah terbuka"],
    benefits: ["Nol biaya (gratis!)", "Kapasitas sampah sangat besar", "Proses paling alami", "Memperbaiki kualitas tanah kebun"],
    icon: <Leaf className="w-8 h-8" />,
    color: "bg-stone-600",
    image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=800",
    difficulty: 2,
    difficultyLabel: "Mudah"
  },
  {
    id: "takakura",
    title: "Metode Keranjang Takakura",
    description: "Buat kamu yang tinggal di apartemen atau rumah minimalis, Takakura adalah penyelamat. Gak bau, gak makan tempat, dan prosesnya cepet banget. Komposnya bisa langsung dipake buat tanaman hias di teras.",
    steps: [
      "Siapkan keranjang plastik berlubang dan lapisi bagian dalamnya dengan kardus bekas.",
      "Masukkan bantalan sekam di dasar keranjang sebagai filter udara.",
      "Masukkan sampah organik yang sudah dicacah kecil-kecil agar mikroba lebih mudah mengurai.",
      "Aduk tumpukan sampah setiap hari agar sirkulasi oksigen terjaga (proses aerobik).",
      "Tutup bagian atas dengan kain hitam atau bantalan sekam lagi untuk menjaga kelembapan."
    ],
    tools: ["Keranjang plastik berlubang", "Kardus bekas", "Bantalan sekam", "Pengaduk/Sekop kecil"],
    benefits: ["Bisa dilakukan di dalam ruangan", "Tidak menimbulkan bau busuk", "Menghasilkan kompos dalam 2-3 minggu", "Hemat lahan"],
    icon: <Trash2 className="w-8 h-8" />,
    color: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
    difficulty: 3,
    difficultyLabel: "Menengah"
  },
  {
    id: "ember_tumpuk",
    title: "Kompos Ember Tumpuk",
    description: "Metode ini efisien banget karena kamu dapet dua hasil sekaligus: pupuk cair (lindi) yang kaya nutrisi dan kompos padat yang subur. Cocok buat yang pengen serius berkebun organik di rumah.",
    steps: [
      "Siapkan dua ember bekas cat yang ukurannya sama.",
      "Lubangi dasar ember atas (kecil-kecil) dan pasang keran di bagian bawah ember bawah.",
      "Tumpuk embernya, lalu masukkan sampah organik ke ember bagian atas.",
      "Tambahkan sedikit bioaktivator (seperti EM4) untuk mempercepat proses fermentasi.",
      "Pupuk cair bisa dipanen lewat keran, kompos padatnya tinggal nunggu matang sempurna."
    ],
    tools: ["Dua ember bekas", "Keran air kecil", "Bor/Solder", "Bioaktivator (EM4)"],
    benefits: ["Dapat pupuk cair & padat sekaligus", "Proses penguraian lebih cepat", "Wadah tertutup & rapi", "Nutrisi tanaman sangat tinggi"],
    icon: <Droplets className="w-8 h-8" />,
    color: "bg-teal-500",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    difficulty: 4,
    difficultyLabel: "Cukup Sulit"
  },
  {
    id: "biopori",
    title: "Lubang Resapan Biopori",
    description: "Ini solusi paling 'set and forget' buat yang punya halaman. Selain jadi pabrik kompos alami, Biopori ngebantu tanah kamu buat nyerep air hujan lebih cepet, jadi gak gampang banjir deh.",
    steps: [
      "Gunakan bor tanah untuk membuat lubang vertikal sedalam 80-100 cm.",
      "Masukkan pipa PVC yang sudah dilubangi pinggirnya (pipa biopori) ke dalam lubang.",
      "Isi lubang dengan sampah organik secara bertahap sampai penuh.",
      "Tutup lubang dengan tutup pipa yang berlubang agar aman diinjak.",
      "Sampah akan menyusut sendiri. Kamu bisa panen komposnya setiap 3-6 bulan sekali."
    ],
    tools: ["Bor tanah manual", "Pipa PVC berlubang", "Tutup pipa biopori", "Linggis (jika tanah keras)"],
    benefits: ["Mencegah banjir & genangan", "Menyuburkan tanah secara alami", "Meningkatkan cadangan air tanah", "Sangat praktis & awet"],
    icon: <Leaf className="w-8 h-8" />,
    color: "bg-green-600",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800",
    difficulty: 5,
    difficultyLabel: "Sulit"
  }
];

interface SolutionViewProps {
  onBack: () => void;
}

export const SolutionView: React.FC<SolutionViewProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getRecommendedSolution = () => {
    const hasSpace = answers[1] === 'space';
    const likesFertilizer = answers[3] === 'fertilizer';
    const hasTime = answers[0] === 'much';

    let mainKey: string;
    if (!hasSpace) {
      mainKey = hasTime ? 'takakura' : 'eco_enzyme';
    } else {
      mainKey = likesFertilizer ? 'biopori' : 'kompos_tumpuk';
    }

    return allSolutions.find(s => s.id === mainKey) || allSolutions[0];
  };

  const recommended = showResult ? getRecommendedSolution() : null;
  const sortedSolutions = [...allSolutions].sort((a, b) => a.difficulty - b.difficulty);

  return (
    <div className="min-h-screen bg-eco-brown-100 dark:bg-stone-950 flex flex-col pt-10">
      <div className="flex-grow flex flex-col items-center p-4">
        <div className="max-w-5xl w-full">
          {!showResult ? (
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-stone-900 rounded-[40px] shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-stone-800 mb-16"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-eco-green-100 dark:bg-eco-green-900/30 rounded-2xl">
                  {questions[currentStep].icon}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black text-eco-green-600 uppercase tracking-widest mb-1">
                    Pertanyaan {currentStep + 1} dari {questions.length}
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-eco-green-500 transition-all duration-500" 
                      style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-10 leading-tight">
                {questions[currentStep].text}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.value)}
                    className="p-6 text-left bg-gray-50 dark:bg-stone-800/50 hover:bg-eco-green-50 dark:hover:bg-eco-green-900/20 border-2 border-transparent hover:border-eco-green-500 rounded-3xl transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-800 dark:text-stone-200 group-hover:text-eco-green-700 dark:group-hover:text-eco-green-400">
                        {option.text}
                      </span>
                      <div className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-stone-600 group-hover:border-eco-green-500 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-eco-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-16 pb-20"
            >
              <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-black text-eco-green-900 dark:text-white mb-4">
                  Rekomendasi Untukmu
                </h2>
                <p className="text-xl text-gray-600 dark:text-stone-400 max-w-2xl mx-auto">
                  Berdasarkan jawabanmu, kami merekomendasikan <span className="text-eco-green-600 font-black">{recommended?.title}</span>. Cek detailnya di bawah atau lihat opsi lainnya!
                </p>
              </div>

              {/* Recommended Solution Detail */}
              {recommended && (
                <div className="bg-white dark:bg-stone-900 rounded-[50px] shadow-2xl overflow-hidden border-4 border-eco-green-500">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <img 
                        src={recommended.image} 
                        alt={recommended.title} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-6 left-6">
                        <div className="bg-eco-green-500 text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-2xl">
                          Pilihan Terbaik
                        </div>
                      </div>
                    </div>
                    <div className="p-8 md:p-12">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-4 ${recommended.color} text-white rounded-2xl shadow-lg`}>
                          {recommended.icon}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                          {recommended.title}
                        </h3>
                      </div>
                      
                      <p className="text-lg text-gray-600 dark:text-stone-300 mb-10 leading-relaxed italic">
                        "{recommended.description}"
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="flex items-center gap-2 font-black text-eco-green-700 dark:text-eco-green-400 uppercase tracking-widest text-xs">
                            <CheckCircle2 className="w-4 h-4" /> Alat & Bahan
                          </h4>
                          <ul className="space-y-2">
                            {recommended.tools.map((tool, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-stone-400 font-bold">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> {tool}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h4 className="flex items-center gap-2 font-black text-eco-green-700 dark:text-eco-green-400 uppercase tracking-widest text-xs">
                            <Lightbulb className="w-4 h-4" /> Manfaat
                          </h4>
                          <ul className="space-y-2">
                            {recommended.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-stone-400 font-bold">
                                <div className="w-1.5 h-1.5 rounded-full bg-eco-green-300"></div> {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-12 space-y-6">
                        <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] text-sm border-b pb-2">Cara Membuat:</h4>
                        <div className="space-y-4">
                          {recommended.steps.map((step, idx) => (
                            <div key={idx} className="flex gap-4 items-start group">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-eco-green-100 dark:bg-eco-green-900/30 flex items-center justify-center text-eco-green-700 dark:text-eco-green-400 font-black text-sm group-hover:scale-110 transition-transform">
                                {idx + 1}
                              </div>
                              <p className="text-gray-700 dark:text-stone-300 font-medium leading-relaxed">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* All Solutions Section - Always Visible or shown after quiz */}
          <div className="space-y-12 mt-12">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200 dark:bg-stone-800"></div>
              <h3 className="text-2xl font-black text-gray-400 uppercase tracking-[0.3em]">Seluruh Solusi (Simpel ke Sulit)</h3>
              <div className="h-px flex-1 bg-gray-200 dark:bg-stone-800"></div>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {sortedSolutions.map((sol, idx) => (
                <div key={sol.id} className={`bg-white dark:bg-stone-900 rounded-[40px] shadow-xl overflow-hidden border ${recommended?.id === sol.id ? 'border-eco-green-500 ring-4 ring-eco-green-500/20' : 'border-gray-100 dark:border-stone-800'} flex flex-col md:flex-row group`}>
                  <div className="md:w-1/3 relative overflow-hidden">
                    <img 
                      src={sol.image} 
                      alt={sol.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className={`absolute inset-0 ${sol.color} opacity-20`}></div>
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Tingkat: {sol.difficultyLabel}
                    </div>
                  </div>
                  <div className="p-8 md:p-10 flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 ${sol.color} text-white rounded-2xl`}>
                        {sol.icon}
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                        {sol.title}
                      </h3>
                      {recommended?.id === sol.id && (
                        <span className="ml-auto bg-eco-green-100 text-eco-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Cocok Untukmu</span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-stone-400 font-medium mb-8 leading-relaxed">
                      {sol.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-3">
                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Alat & Bahan</h5>
                        <div className="flex flex-wrap gap-2">
                          {sol.tools.map((t, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-stone-800 rounded-full text-[10px] font-bold text-gray-600 dark:text-stone-400">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Manfaat Utama</h5>
                        <div className="flex flex-wrap gap-2">
                          {sol.benefits.map((b, i) => (
                            <span key={i} className="px-3 py-1 bg-eco-green-50 dark:bg-eco-green-900/20 rounded-full text-[10px] font-bold text-eco-green-700 dark:text-eco-green-400">
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Langkah Singkat:</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                        {sol.steps.slice(0, 4).map((step, i) => (
                          <div key={i} className="flex gap-2 items-start">
                            <div className="w-4 h-4 rounded-full bg-eco-green-100 dark:bg-eco-green-900/30 flex items-center justify-center text-[8px] font-black text-eco-green-700 dark:text-eco-green-400 mt-1">
                              {i + 1}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-stone-400 font-medium leading-tight">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 pt-20 pb-20">
            <div className="p-6 bg-yellow-50 dark:bg-yellow-900/10 rounded-3xl border-2 border-dashed border-yellow-400 text-center max-w-xl">
              <p className="text-yellow-800 dark:text-yellow-400 font-bold italic">
                "Ingat ya, kunci sukses mengelola sampah organik itu konsistensi. Mulai dari yang paling simpel dulu, lama-lama pasti terbiasa kok!"
              </p>
            </div>
            <button 
              onClick={onBack}
              className="px-12 py-5 bg-eco-green-800 text-white font-black rounded-full shadow-2xl hover:bg-eco-green-900 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <Home className="w-5 h-5" /> Selesai & Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
