import React, { useState } from 'react';
import { CONVERSATIONAL_CONNECTORS } from '../data/conversationalData';
import {
  Volume2,
  Sparkles,
  BookOpen,
  MessageCircle,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';
import { playPronunciation } from '../utils/speech';

interface ConversationalMasteryProps {
  onAwardXp: (xp: number) => void;
}

export const ConversationalMastery: React.FC<ConversationalMasteryProps> = ({
  onAwardXp,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [practicedIds, setPracticedIds] = useState<string[]>([]);

  const handleSpeak = (text: string, langCode: string, id: string) => {
    playPronunciation(text, langCode, 0.9);
    if (!practicedIds.includes(id)) {
      setPracticedIds((prev) => [...prev, id]);
      onAwardXp(15);
    }
  };

  const filteredCategories = CONVERSATIONAL_CONNECTORS.filter((c) => {
    if (activeCategory === 'all') return true;
    return c.category === activeCategory;
  });

  return (
    <div className="py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/70 pb-5">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold">
            C1 & Mustaqil So'zlashuv Grammatikasi
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">
            Faqat Mustaqil Gaplashish Uchun Muhim Qoidalar va Iboralar
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            To'xtalmasdan, pauzasiz va tabiiy suhbatlashish uchun zarur bo'lgan
            bog'lovchilar, kirish so'zlari hamda diplomatik ritorika vositalari.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 rounded-lg text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeCategory === 'all'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setActiveCategory('fikr_bildirish')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeCategory === 'fikr_bildirish'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Fikr bildirish
          </button>
          <button
            onClick={() => setActiveCategory('muhokama')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeCategory === 'muhokama'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Muhokama & Bahs
          </button>
          <button
            onClick={() => setActiveCategory('kundalik_ibora')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeCategory === 'kundalik_ibora'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Jonli Pauzalar
          </button>
        </div>
      </div>

      {/* Key Conversational Principles (Classic Academic Advice) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-stone-300/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-800 font-bold">
            <Lightbulb className="w-4 h-4" />
            <span>1. Tarjima qilmasdan fikrlash</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Gap tuzayotganda so'zma-so'z o'zbekchadan tarjima qilmang. Tayyor
            ibora bloklari (*chunks*) bilan yaxlit gapiring.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-stone-300/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-800 font-bold">
            <MessageCircle className="w-4 h-4" />
            <span>2. Tabiiy to'ldiruvchilar (Fillers)</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Suhbatda pauza paydo bo'lganda 'эээ...' demasdan, 'Well, you know...',
            'Дело в том, что...', 'Şöyle ki...' iboralari bilan vaqt yuting.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-stone-300/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-800 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>3. Nozik muloyimlik (Softening)</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            C1 darajasida to'g'ridan-to'g'ri 'You are wrong' deyilmaydi; 'I see what
            you mean, however...' diplomatiyasi ishlatiladi.
          </p>
        </div>
      </div>

      {/* Connectors & Spoken Grammar Blocks */}
      <div className="space-y-6">
        {filteredCategories.map((group) => (
          <div
            key={group.id}
            className="glass-panel p-6 sm:p-7 rounded-2xl border border-stone-300/80 space-y-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-stone-900 text-lg">
                {group.titleUzbek}
              </h3>
              <span className="text-xs font-mono text-stone-400">
                {group.patterns.length} ta namuna
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.patterns.map((p, pIdx) => {
                const itemId = `${group.id}-${pIdx}`;
                const isDone = practicedIds.includes(itemId);

                return (
                  <div
                    key={pIdx}
                    className="p-5 rounded-xl bg-white border border-stone-200 flex flex-col justify-between space-y-3 hover:border-amber-400 transition-colors"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm font-semibold text-stone-900 leading-snug">
                          "{p.target}"
                        </div>
                        <button
                          onClick={() => handleSpeak(p.target, p.langCode, itemId)}
                          className={`p-2 rounded-lg border transition-colors shrink-0 ${
                            isDone
                              ? 'bg-amber-100 text-amber-950 border-amber-300'
                              : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
                          }`}
                          title="Talaffuzni tinglash"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-amber-900 font-medium">
                        {p.uzbek}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-sans">
                      <span>{p.context}</span>
                      {isDone && (
                        <span className="flex items-center gap-1 text-emerald-700 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mashq qilindi
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
