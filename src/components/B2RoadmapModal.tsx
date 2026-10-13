import React from 'react';
import { X, Award, Sparkles, Download, CheckCircle2 } from 'lucide-react';

interface B2RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  userXp: number;
}

export const B2RoadmapModal: React.FC<B2RoadmapModalProps> = ({
  isOpen,
  onClose,
  userXp,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-300 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-800 font-semibold uppercase">
              <Award className="w-4 h-4" />
              <span>Xalqaro CEFR Standarti (B2 & C1)</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
              B2 dan C1 Erkin Muloqot Darajasi Sari
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Mustaqil, tayyorgarliksiz va tabiiy tezlikda xorijiy tilda gaplasha olish mezonlari.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level Criteria */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
            <h4 className="font-serif font-semibold text-amber-950 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              C1 Mustaqil Erkin So'zlashuv Darajasida Nimalarga Qodir Bo'lasiz?
            </h4>
            <ul className="text-xs text-stone-700 space-y-1.5 list-disc pl-5">
              <li>
                <b>Spontan Gaplashish:</b> So'z qidirmasdan, pauzasiz va tabiiy oqimda gap tuzish.
              </li>
              <li>
                <b>Nozik Ma'nolar & Hazil:</b> Kinoya, kontekstual iboralar va madaniy farqlarni tushunish.
              </li>
              <li>
                <b>Murakkab Munozara:</b> O'z sohangizdagi ilmiy, texnik va falsafiy g'oyalarni isbotlab berish.
              </li>
              <li>
                <b>IELTS 7.0–8.0 / TRKI-3 Ekvivalenti:</b> Dunyoning eng nufuzli universitet va xalqaro kompaniyalariga to'liq moslik.
              </li>
            </ul>
          </div>

          {/* Languages Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1.5">
              <div className="font-bold text-stone-900">
                🇬🇧 Ingliz Tili (B2 & C1 Advanced)
              </div>
              <p className="text-stone-600 leading-relaxed">
                Discourse markers, Inversion, Cleft sentences, Collocations va 5,000+ so'z boyligi.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1.5">
              <div className="font-bold text-stone-900">
                🇷🇺 Rus Tili (ТРКИ-2 & ТРКИ-3)
              </div>
              <p className="text-stone-600 leading-relaxed">
                Вводные конструкции, фразеологизмы, причастные обороты va erkin rasmiy dialog.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1.5">
              <div className="font-bold text-stone-900">
                🇹🇷 Turk Tili (A1 - C1 Akıcı Konuşma)
              </div>
              <p className="text-stone-600 leading-relaxed">
                Büyük ünlü uyumu, Deyimler, Nitekim va tabiiy o'zbekcha-turkcha o'xshashliklar.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-1.5">
              <div className="font-bold text-stone-900">
                💻 Dasturlash & Algoritmlar
              </div>
              <p className="text-stone-600 leading-relaxed">
                Python, JavaScript va C++ xotira boshqaruvi, murakkab algoritmlar va toza arxitektura.
              </p>
            </div>
          </div>
        </div>

        {/* Certificate Eligibility simulation */}
        <div className="p-4 rounded-xl bg-stone-900 text-stone-100 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-xs font-semibold text-amber-300">
              Ziyo Academy Xalqaro Sertifikati
            </div>
            <div className="text-[11px] text-stone-400 font-mono">
              Joriy balingiz: {userXp} XP (Sertifikat uchun 500+ XP)
            </div>
          </div>
          <button
            onClick={() => {
              alert(
                "Tabriklaymiz! Sizning Ziyo Academy B2/C1 o'quv sertifikatingiz generatsiya qilindi. Darslarni davom ettirib amaliyotingizni oshiring!"
              );
            }}
            className="py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-medium flex items-center gap-1 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Sertifikatni Yuklash</span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-stone-200">
          <button
            onClick={onClose}
            className="py-2 px-5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
