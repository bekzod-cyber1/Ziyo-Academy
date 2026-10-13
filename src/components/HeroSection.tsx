import React from 'react';
import { ArrowRight, BookOpen, Code2, Volume2, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onStartCourse: (courseId: string) => void;
  onExploreGames: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartCourse,
  onExploreGames,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Academic Editorial Intro */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-stone-500 uppercase tracking-widest">
              <span>Akademik Ta'lim Tizimi</span>
              <span aria-hidden="true">·</span>
              <span>B2 Xalqaro Standart</span>
              <span aria-hidden="true">·</span>
              <span>Zamonaviy Kod Muhandisligi</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 leading-[1.18] tracking-tight">
              Xorijiy tillarni B2 darajasigacha va dasturlashni chuqur o'rganing
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans max-w-2xl">
              Ingliz, Rus, Nemis va Ispan tillari bo'yicha bosqichma-bosqich
              akademik darsliklar, jonli audio talaffuzlar hamda Python, JavaScript
              va C++ bo'yicha interaktiv amaliy dasturlash muhiti.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onStartCourse('english-b2')}
                className="px-5 py-2.5 bg-stone-900 text-stone-50 hover:bg-stone-800 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Ingliz tili (A1 - B2)</span>
                <ArrowRight className="w-4 h-4 text-stone-300" />
              </button>

              <button
                onClick={() => onStartCourse('programming-dev')}
                className="px-5 py-2.5 bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Code2 className="w-4 h-4 text-amber-700" />
                <span>Dasturlash kursi</span>
              </button>

              <button
                onClick={onExploreGames}
                className="px-4 py-2.5 text-stone-700 hover:text-stone-900 text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Talaffuzli Lug'at O'yinlari</span>
              </button>
            </div>

            {/* Quiet Academic Proof Indicators */}
            <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center gap-6 text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>CEFR Yevropa standartiga mos B2 dasturi</span>
              </div>
              <span aria-hidden="true" className="text-stone-300 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>Interaktiv grammatika va real muloqot</span>
              </div>
            </div>
          </div>

          {/* Right Column: High Fidelity Architectural Image with Transparent Glass Overlay */}
          <div className="lg:col-span-5 relative flex items-stretch">
            <div className="w-full relative rounded-2xl overflow-hidden border border-stone-300/80 shadow-md group min-h-[320px]">
              <img
                src="/src/assets/images/hero_academy_library_1791868778587.jpg"
                alt="Ziyo Academy scholarly study room with manuscripts and modern coding workspace"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="text-xs uppercase tracking-wider text-amber-200/90 font-mono">
                  Ziyo Kutubxonasi & Laboratoriyasi
                </div>
                <div className="text-base font-serif font-medium mt-1">
                  Har kuni 20 daqiqa: so'zlar, audio mashqlar va real kod
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Full-Width KPI & Feature Strip (Classic Clean Editorial Math) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-stone-200/70">
          <div className="glass-panel p-4 rounded-xl">
            <div className="text-2xl font-serif font-semibold text-stone-900 tabular-nums">4+ Til</div>
            <div className="text-xs text-stone-600 mt-1">Ingliz, Rus, Nemis, Ispan</div>
          </div>
          <div className="glass-panel p-4 rounded-xl">
            <div className="text-2xl font-serif font-semibold text-stone-900 tabular-nums">B2 Daraja</div>
            <div className="text-xs text-stone-600 mt-1">A1 dan B2 gacha to'liq yo'l xaritasi</div>
          </div>
          <div className="glass-panel p-4 rounded-xl">
            <div className="text-2xl font-serif font-semibold text-stone-900 tabular-nums">3 Dasturlash Tili</div>
            <div className="text-xs text-stone-600 mt-1">Python, JavaScript & C++ Algoritmlar</div>
          </div>
          <div className="glass-panel p-4 rounded-xl">
            <div className="text-2xl font-serif font-semibold text-stone-900 tabular-nums">100% Interaktiv</div>
            <div className="text-xs text-stone-600 mt-1">Jonli talaffuz va kod simulyatori</div>
          </div>
        </div>
      </div>
    </section>
  );
};
