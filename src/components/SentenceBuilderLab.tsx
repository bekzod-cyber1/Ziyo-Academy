import React, { useState } from 'react';
import { SPOKEN_SENTENCE_TEMPLATES } from '../data/conversationalData';
import { SpokenSentenceTemplate } from '../types';
import {
  Volume2,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  Flame,
  ArrowRight,
  MessageSquareQuote,
} from 'lucide-react';
import { playPronunciation } from '../utils/speech';

interface SentenceBuilderLabProps {
  onAwardXp: (xp: number) => void;
}

export const SentenceBuilderLab: React.FC<SentenceBuilderLabProps> = ({
  onAwardXp,
}) => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);
  const activeTemplate: SpokenSentenceTemplate =
    SPOKEN_SENTENCE_TEMPLATES[selectedTemplateIndex] ||
    SPOKEN_SENTENCE_TEMPLATES[0];

  const [selectedMiddleIdx, setSelectedMiddleIdx] = useState<number>(0);
  const [selectedSuffixIdx, setSelectedSuffixIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.9);

  // Custom user sentence builder
  const [customInput, setCustomInput] = useState<string>('');
  const [customLanguage, setCustomLanguage] = useState<string>('en-US');

  const currentMiddle =
    activeTemplate.middles[selectedMiddleIdx] || activeTemplate.middles[0];
  const currentSuffix =
    activeTemplate.suffixes[selectedSuffixIdx] || activeTemplate.suffixes[0];

  const fullTargetSentence = `${activeTemplate.prefix.target} ${currentMiddle.target} ${currentSuffix.target}`;
  const fullUzbekSentence = `${activeTemplate.prefix.uzbek} ${currentMiddle.uzbek} ${currentSuffix.uzbek}`;

  const handleSpeak = (text: string, langCode: string) => {
    playPronunciation(text, langCode, speechRate);
    onAwardXp(10);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullTargetSentence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-6 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200/70 pb-5">
        <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
          Jonli Muloqot Amaliyoti
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">
          Qisqa Gaplar Tuzish Laboratoriyasi
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Mustaqil gaplashish uchun tabiiy jumlalar bloklarini birlashtiring,
          talaffuzini tinglang va o'z qisqa gaplaringizni erkin tuzing.
        </p>
      </div>

      {/* Language / Template Picker */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {SPOKEN_SENTENCE_TEMPLATES.map((tpl, idx) => (
          <button
            key={tpl.id}
            onClick={() => {
              setSelectedTemplateIndex(idx);
              setSelectedMiddleIdx(0);
              setSelectedSuffixIdx(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
              selectedTemplateIndex === idx
                ? 'bg-stone-900 text-white shadow-sm'
                : 'glass-panel text-stone-700 hover:bg-stone-200/60'
            }`}
          >
            <MessageSquareQuote className="w-3.5 h-3.5 text-amber-400" />
            <span>{tpl.language}</span>
          </button>
        ))}
      </div>

      {/* Interactive Sentence Constructor Deck */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-stone-300/80 space-y-6">
        {/* Generated Live Sentence Card */}
        <div className="p-6 rounded-xl bg-white border border-amber-300/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>Tayyor Jonli Jumla</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSpeechRate(speechRate === 0.9 ? 0.75 : 0.9)}
                className="px-2 py-0.5 rounded text-[11px] bg-stone-100 hover:bg-stone-200 text-stone-700"
              >
                Tezlik: {speechRate}x
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-stone-600 hover:text-stone-900"
                title="Jumlani nusxalash"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copied ? 'Nusxalandi' : 'Nusxa'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-relaxed">
              "{fullTargetSentence}"
            </div>
            <div className="text-sm font-medium text-amber-900 leading-relaxed">
              "{fullUzbekSentence}"
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => handleSpeak(fullTargetSentence, activeTemplate.langCode)}
              className="py-2.5 px-6 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
              <span>Talaffuzni Eshitish (+10 XP)</span>
            </button>
          </div>
        </div>

        {/* Chunks Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Middle Chunk Selector */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
              1-Bo'lak: Fikr yo'nalishi (Bog'lovchi / Fe'l)
            </div>
            <div className="space-y-2">
              {activeTemplate.middles.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedMiddleIdx(idx)}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-colors flex flex-col gap-0.5 ${
                    selectedMiddleIdx === idx
                      ? 'bg-amber-50 border-amber-500 text-amber-950 font-medium'
                      : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                  }`}
                >
                  <span className="font-semibold text-stone-900">{m.target}</span>
                  <span className="text-[11px] text-stone-500">{m.uzbek}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Suffix Chunk Selector */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
              2-Bo'lak: Xulosa / To'ldiruvchi (Predikat)
            </div>
            <div className="space-y-2">
              {activeTemplate.suffixes.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSuffixIdx(idx)}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-colors flex flex-col gap-0.5 ${
                    selectedSuffixIdx === idx
                      ? 'bg-amber-50 border-amber-500 text-amber-950 font-medium'
                      : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                  }`}
                >
                  <span className="font-semibold text-stone-900">{s.target}</span>
                  <span className="text-[11px] text-stone-500">{s.uzbek}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Freeform Quick Speech Box */}
      <div className="glass-panel p-6 rounded-2xl border border-stone-300/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="font-serif font-bold text-stone-900 text-base">
              O'z Qisqa Gaplaringizni Talaffuzini Tekshiring
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <select
              value={customLanguage}
              onChange={(e) => setCustomLanguage(e.target.value)}
              className="p-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-800 focus:outline-none"
            >
              <option value="en-US">Inglizcha (en-US)</option>
              <option value="ru-RU">Ruscha (ru-RU)</option>
              <option value="tr-TR">Turkcha (tr-TR)</option>
              <option value="de-DE">Nemischa (de-DE)</option>
              <option value="es-ES">Ispancha (es-ES)</option>
              <option value="fr-FR">Fransuzcha (fr-FR)</option>
              <option value="ko-KR">Koreyscha (ko-KR)</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && customInput.trim()) {
                handleSpeak(customInput, customLanguage);
              }
            }}
            placeholder="Ixtiyoriy so'z yoki qisqa gap yozing (masalan: Hello, how are you today?)..."
            className="flex-1 p-3.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
          />

          <button
            onClick={() => {
              if (customInput.trim()) handleSpeak(customInput, customLanguage);
            }}
            disabled={!customInput.trim()}
            className="py-3 px-5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 shrink-0 shadow-sm"
          >
            <Volume2 className="w-4 h-4" />
            <span>Tinglash</span>
          </button>
        </div>
      </div>
    </div>
  );
};
