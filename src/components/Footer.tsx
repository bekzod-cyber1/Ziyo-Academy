import React from 'react';
import { AppTab } from './Header';

interface FooterProps {
  onSelectTab: (tab: AppTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="mt-20 border-t border-stone-200/80 bg-stone-100/60 py-12 text-stone-600 text-xs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="font-serif text-base font-bold text-stone-900">
              Ziyo Academy
            </div>
            <p className="leading-relaxed text-stone-500">
              Xorijiy tillarni B2 darajasigacha puxta o'rgatuvchi va zamonaviy
              dasturlash ko'nikmalarini shakllantiruvchi akademik ta'lim maskani.
            </p>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-2">
            <div className="font-serif font-semibold text-stone-900 text-xs uppercase tracking-wider">
              Chet Tillari (B2)
            </div>
            <ul className="space-y-1.5 text-stone-500">
              <li>
                <button
                  onClick={() => onSelectTab('courses')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Ingliz tili (A1 - B2)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('courses')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Rus tili (A1 - B2)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('courses')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Nemis tili & Ispan tili
                </button>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-2">
            <div className="font-serif font-semibold text-stone-900 text-xs uppercase tracking-wider">
              Dasturlash & Laboratoriya
            </div>
            <ul className="space-y-1.5 text-stone-500">
              <li>
                <button
                  onClick={() => onSelectTab('programming')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Python Dasturlash Asoslari
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('programming')}
                  className="hover:text-stone-900 transition-colors"
                >
                  JavaScript & Zamonaviy Web
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('playground')}
                  className="hover:text-stone-900 transition-colors"
                >
                  C++ & Algoritmlar Sandbox
                </button>
              </li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div className="space-y-2">
            <div className="font-serif font-semibold text-stone-900 text-xs uppercase tracking-wider">
              Metodika & O'yinlar
            </div>
            <ul className="space-y-1.5 text-stone-500">
              <li>
                <button
                  onClick={() => onSelectTab('games')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Lug'at Kartochkalari (Flashcards)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('games')}
                  className="hover:text-stone-900 transition-colors"
                >
                  So'z Juftligi & Audio Talaffuz
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('sentences')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Qisqa Gaplar Konstruktori
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('ai-tutor')}
                  className="hover:text-stone-900 transition-colors text-amber-800 font-semibold"
                >
                  Ziyo AI Murabbiy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('progress')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Shaxsiy Natijalar va CEFR
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500">
          <div>
            © {new Date().getFullYear()} Ziyo Academy. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>CEFR Standarti</span>
            <span aria-hidden="true">·</span>
            <span>Web Speech Talaffuz</span>
            <span aria-hidden="true">·</span>
            <span>Klassik & Shaffof Dizayn</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
