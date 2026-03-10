
import React, { createContext, useState, useContext } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const translations = {
  id: {
    nav_home: "Beranda",
    nav_problem: "Masalah",
    nav_solution: "Solusi",
    nav_quiz: "Uji Pemahaman",
    nav_ai: "Tanya AI",
    hero_title_1: "44,5% Sampah di Kota Bandung",
    hero_title_2: "Merupakan Sampah Makanan",
    hero_desc: "Sebagai Warga yang Peduli, Kita Bisa Ubah Sampah itu Menjadi Berkah!",
    hero_sub_desc: "Website ini menyajikan cara lengkap mengelola Sampah Organik",
    hero_cta: "Pelajari Lebih Lanjut",
    
    // Bandung Waste Section
    bandung_waste_badge: "Kondisi Bandung",
    bandung_waste_title: "Bandung Darurat Sampah!",
    bandung_waste_desc: "Produksi sampah di Kota Bandung terus meningkat setiap tahunnya, mencapai lebih dari 1.500 ton per hari. Ironisnya, hampir separuhnya adalah sampah organik yang berakhir menumpuk di TPA dan menghasilkan gas metana berbahaya.",
    bandung_stat_1_val: "1.500+ Ton",
    bandung_stat_1_label: "Sampah/Hari",
    bandung_stat_2_val: "44,5%",
    bandung_stat_2_label: "Sisa Makanan",
    bandung_waste_cta: "Ayo, jadilah bagian dari solusi hari ini!",

    // Calculator Section
    calc_title: "Kalkulator Takaran Pintar",
    calc_desc: "Masukkan salah satu angka, kami akan hitung sisanya secara otomatis berdasarkan rumus 3:1:10.",
    calc_label_organic: "Bahan Organik (gram)",
    calc_label_sugar: "Gula (gram)",
    calc_label_water: "Air (mililiter)",
    calc_placeholder: "Masukkan angka...",

    // Detailed Info
    details_tools_title: "Persiapan: Alat & Bahan",
    details_tools_sub1: "Peralatan",
    details_tools_list1: "Wadah plastik bermulut lebar (tutup rapat), timbangan digital, pisau/talenan, spidol & label.",
    details_tools_sub2: "Kriteria Bahan",
    details_tools_waste: "Sampah: Segar, tidak busuk, tidak berulat, dan tidak berminyak.",
    details_tools_sugar: "Gula: Gula merah, molase, atau gula aren asli (bukan gula putih).",
    details_tools_water: "Air: Air keran jernih (endapkan 24 jam) atau air sumur.",
    
    details_history_title: "Sejarah & Penemu",
    details_history_text: "Eco-enzyme dikembangkan oleh Dr. Rosukon Poompanvong, pendiri Asosiasi Pertanian Organik Thailand. Beliau meneliti selama 30 tahun agar setiap orang dapat mengolah sampah organik sendiri demi membantu bumi tanpa biaya mahal.",
    details_founder_quote: "\"Jika setiap rumah tangga membuat sampah enzim, kita dapat menghentikan pemanasan global.\"",
    details_founder_name: "Dr. Rosukon Poompanvong",
    details_founder_title: "Founder of Eco-Enzyme",

    // Reminder
    reminder_title: "Ingat Tugas Besok!",
    reminder_desc: "Keren! Kamu baru saja mencatat progres. Besok jangan lupa buka tutup wadah (burping) atau aduk sedikit ya agar gasnya keluar.",
    reminder_btn: "Siap, Saya Mengerti!",

    // Quiz
    quiz_header: "Uji Pemahaman Sampah Organik",
    quiz_desc: "Pilih tingkat kesulitan dan uji pengetahuanmu tentang sampah organik!",
    quiz_level_easy: "Mudah",
    quiz_level_medium: "Menengah",
    quiz_level_hard: "Sulit",
    quiz_feedback_correct: "Hebat! Jawabanmu benar.",
    quiz_feedback_wrong: "Ups! Kurang tepat.",
    quiz_achievement_easy: "Eco-Beginner: Kamu tahu dasar-dasarnya!",
    quiz_achievement_medium: "Eco-Warrior: Kamu paham dampak lingkungannya!",
    quiz_achievement_hard: "Eco-Master: Kamu adalah ahli sampah organik!",
    quiz_score_label: "Nilai Kamu:",
    quiz_start: "Mulai Kuis Sekarang",
    quiz_next: "Pertanyaan Selanjutnya",
    quiz_finish: " Lihat Hasil & Hadiah",
    quiz_score: "Skor Kamu:",
    quiz_reward_title: "Selamat, Eco-Hero!",
    quiz_reward_desc: "Kamu mendapatkan Benih Pohon Digital. Teruslah menjaga bumi!",
    quiz_try_again: "Coba Lagi",
    
    // Intro & Others
    intro_badge: "Apa itu E-care?",
    intro_main_title: "Mengubah Sampah Dapur Menjadi Berkah",
    intro_summary: "E-care hadir untuk membantu Anda mengelola sisa sayuran dan buah-buahan yang biasanya dibuang begitu saja menjadi sesuatu yang bermanfaat bagi lingkungan.",
    intro_why_title: "Kenapa ini penting?",
    intro_why_desc: "Sekitar 60% sampah di TPA adalah sampah organik yang memicu gas metana penyebab pemanasan global. Dengan pengelolaan yang tepat, Anda membantu mengurangi beban bumi.",
    intro_footer_text: "Pelajari cara mengelolanya di bawah ini",
    
    ai_header: "Asisten Cerdas E-care",
    ai_desc: "Tanyakan apa saja seputar pengelolaan sampah organik, kami siap membantu.",
    ai_placeholder: "Ketik pertanyaan Anda di sini...",
    ai_loading: "Sedang berpikir...",
    footer_desc: "Menjaga bumi, satu langkah kecil.",
    footer_made: "Dibuat dengan hati untuk lingkungan.",
    ai_welcome: "Halo! Saya asisten E-care. Ada yang bisa saya bantu mengenai pengelolaan sampah organik?",
    
    join_title: "Mari Selamatkan Bumi Bersama",
    join_desc: "Bergabunglah dengan gerakan hijau ini. Mulai kelola sampah organik Anda hari ini dan jadilah bagian dari solusi untuk bumi yang lebih bersih.",
    join_btn: "Mulai Sekarang",
  },
  en: {
    nav_home: "Home",
    nav_problem: "Problem",
    nav_solution: "Solution",
    nav_quiz: "Quiz",
    nav_ai: "Ask AI",
    hero_title_1: "44.5% of Waste in Bandung",
    hero_title_2: "is Actually Food Waste",
    hero_desc: "As Concerned Citizens, We Can Turn That Waste Into Something Useful",
    hero_sub_desc: "This website provides a complete guide to managing Organic Waste",
    hero_cta: "Learn More",

    // Bandung Waste Section
    bandung_waste_badge: "Bandung's Condition",
    bandung_waste_title: "Bandung Waste Emergency!",
    bandung_waste_desc: "Waste production in Bandung continues to rise every year, reaching over 1,500 tons per day. Ironically, nearly half of it is food waste that ends up in landfills, producing harmful methane gas.",
    bandung_stat_1_val: "1,500+ Tons",
    bandung_stat_1_label: "Waste/Day",
    bandung_stat_2_val: "44.5%",
    bandung_stat_2_label: "Food Waste",
    bandung_waste_cta: "Come on, be part of the solution today!",

    // Calculator Section
    calc_title: "Smart Ratio Calculator",
    calc_desc: "Enter any value, and we'll calculate the rest automatically based on the 3:1:10 formula.",
    calc_label_organic: "Organic Matter (grams)",
    calc_label_sugar: "Sugar (grams)",
    calc_label_water: "Water (milliliters)",
    calc_placeholder: "Enter value...",

    details_tools_title: "Preparation: Tools & Materials",
    details_tools_sub1: "Equipment",
    details_tools_list1: "Wide-mouthed plastic container (airtight), digital scale, knife/board, marker & labels.",
    details_tools_sub2: "Material Criteria",
    details_tools_waste: "Waste: Fresh, not rotten, no worms, and non-greasy.",
    details_tools_sugar: "Sugar: Brown sugar, molasses, or pure palm sugar (no white sugar).",
    details_tools_water: "Water: Clear tap water (settle for 24h) or well water.",
    
    details_history_title: "History & Founder",
    details_history_text: "Eco-enzyme was developed by Dr. Rosukon Poompanvong, founder of the Organic Agriculture Association of Thailand. She dedicated 30 years of research to ensure everyone can process organic waste and help heal the Earth without high costs.",
    details_founder_quote: "\"If every household makes garbage enzyme, we can stop global warming.\"",
    details_founder_name: "Dr. Rosukon Poompanvong",
    details_founder_title: "Founder of Eco-Enzyme",

    // Reminder
    reminder_title: "Tomorrow's Task!",
    reminder_desc: "Awesome! You just logged a progress. Don't forget to open the lid (burping) or stir it a bit tomorrow to release gas.",
    reminder_btn: "Got it!",

    // Quiz
    quiz_header: "Organic Waste Quiz",
    quiz_desc: "Choose a difficulty level and test your knowledge about organic waste!",
    quiz_level_easy: "Easy",
    quiz_level_medium: "Medium",
    quiz_level_hard: "Hard",
    quiz_feedback_correct: "Great! Your answer is correct.",
    quiz_feedback_wrong: "Oops! Not quite right.",
    quiz_achievement_easy: "Eco-Beginner: You know the basics!",
    quiz_achievement_medium: "Eco-Warrior: You understand the environmental impact!",
    quiz_achievement_hard: "Eco-Master: You are an organic waste expert!",
    quiz_score_label: "Your Score:",
    quiz_start: "Start Quiz Now",
    quiz_next: "Next Question",
    quiz_finish: "See Results & Reward",
    quiz_score: "Your Score:",
    quiz_reward_title: "Congrats, Eco-Hero!",
    quiz_reward_desc: "You earned a Digital Seed. Keep protecting the earth!",
    quiz_try_again: "Try Again",

    intro_badge: "What is E-care?",
    intro_main_title: "Turning Kitchen Waste Into a Blessing",
    intro_summary: "E-care is here to help you manage vegetable and fruit scraps that are usually thrown away into something beneficial for the environment.",
    intro_why_title: "Why does it matter?",
    intro_why_desc: "About 60% of landfill waste is organic, which triggers methane gas causing global warming. With proper management, you help reduce the burden on the earth.",
    intro_footer_text: "Learn how to manage it below",

    intro_title: "Why Eco-Enzyme Matters?",
    intro_item_1_title: "Waste Management",
    intro_item_1_desc: "Reducing the organic waste pile in landfills which is a source of harmful methane gas.",
    intro_item_2_title: "Multi-purpose Liquid",
    intro_item_2_desc: "Fermentation results in a natural cleaning liquid without synthetic chemicals.",
    intro_item_3_title: "Restore the Earth",
    intro_item_3_desc: "Helping neutralize pollutants in water and air for a healthier ecosystem.",
    ratio_badge: "Ratio Guide",
    ratio_title: "Standard Ratio: 3 : 1 : 10",
    ratio_desc: "Use this ratio for optimal fermentation success.",
    ratio_sugar: "Part Sugar",
    ratio_sugar_desc: "Brown sugar, molasses, or palm sugar (avoid white sugar).",
    ratio_organic: "Part Organic Matter",
    ratio_organic_desc: "Fruit peels (citrus, pineapple, papaya) or raw vegetable scraps.",
    ratio_water: "Part Water",
    ratio_water_desc: "Clean water, settled rainwater, or well water.",
    steps_header: "Creation Steps",
    steps_subheader: "Follow these simple steps for the best results.",
    step_1_title: "Prepare Container",
    step_1_desc: "Use a wide-mouthed plastic container. Avoid glass or metal due to gas pressure risks.",
    step_2_title: "Mix Ingredients",
    step_2_desc: "Dissolve sugar in water (1:10), then add the organic matter (3 parts).",
    step_3_title: "Fermentation Process",
    step_3_desc: "Seal the container tightly. Store in a cool, well-ventilated place away from sunlight.",
    step_4_title: "Harvest",
    step_4_desc: "After 90 days, filter the liquid. The residue can be used as organic fertilizer.",
    ai_header: "E-care Smart Assistant",
    ai_desc: "Ask anything about organic waste management, we are here to help.",
    ai_placeholder: "Type your question here...",
    ai_loading: "Thinking...",
    footer_desc: "Protecting the earth, one small step at a time.",
    footer_made: "Made with love for the environment.",
    ai_welcome: "Hello! I am the E-care assistant. How can I help you with organic waste management today?",
    
    join_title: "Let's Save the Earth Together",
    join_desc: "Join this green movement. Start managing your organic waste today and be part of the solution for a cleaner earth.",
    join_btn: "Start Now",
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'id',
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
