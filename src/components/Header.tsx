import React from 'react';
import { Sparkles, Flame, Clock, CheckCircle2, Bot } from 'lucide-react';

export type AppTab =
  | 'courses'
  | 'conversational'
  | 'sentences'
  | 'ai-tutor'
  | 'programming'
  | 'games'
  | 'playground'
  | 'progress';

interface HeaderProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  streakDays: number;
  totalXp: number;
  minutesStudiedToday: number;
  dailyGoalMinutes: number;
  goalMetToday: boolean;
  onOpenRoadmap: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  streakDays,
  totalXp,
  minutesStudiedToday,
  dailyGoalMinutes,
  goalMetToday,
  onOpenRoadmap,
}) => {
  return (
    <header className="glass-panel sticky top-0 z-50 px-6 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 lg:gap-8">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <button
          onClick={() => onSelectTab('courses')}
          className="text-xl font-bold tracking-tight text-stone-900 font-serif whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors flex items-center gap-2"
        >
          <span>Ziyo Academy</span>
          <span className="text-xs text-stone-400 font-sans font-normal hidden lg:inline">
            · B2/C1 & Dasturlash
          </span>
        </button>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('courses')}
            className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors ${
              activeTab === 'courses'
                ? 'border-amber-700 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Darsliklar
          </button>
          <button
            onClick={() => onSelectTab('conversational')}
            className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors ${
              activeTab === 'conversational'
                ? 'border-amber-700 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Mustaqil Muloqot (C1)
          </button>
          <button
            onClick={() => onSelectTab('sentences')}
            className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors ${
              activeTab === 'sentences'
                ? 'border-amber-700 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Qisqa Gaplar
          </button>
          <button
            onClick={() => onSelectTab('ai-tutor')}
            className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'ai-tutor'
                ? 'border-amber-700 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <Bot className="w-4 h-4 text-amber-700" />
            <span>AI Murabbiy</span>
          </button>
          <button
            onClick={() => onSelectTab('programming')}
            className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors ${
              activeTab === 'programming'
                ? 'border-amber-700 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Dasturlash
          </button>
          <button
            onClick={() => onSelectTab('games')}
            className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors ${
              activeTab === 'games'
                ? 'border-amber-700 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Lug'at
          </button>
          <button
            onClick={() => onSelectTab('playground')}
            className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors ${
              activeTab === 'playground'
                ? 'border-amber-700 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Kod Maydoni
          </button>
          <button
            onClick={() => onSelectTab('progress')}
            className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors ${
              activeTab === 'progress'
                ? 'border-amber-700 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Natijam
          </button>
        </nav>

        {/* Zone 3: Single Primary Action & Metric */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Daily Goal & Streak status */}
          <div className="hidden xl:flex items-center gap-2.5 text-xs font-mono tabular-nums text-stone-600">
            <span
              onClick={() => onSelectTab('progress')}
              className={`flex items-center gap-1 cursor-pointer transition-colors ${
                goalMetToday
                  ? 'text-emerald-700 font-bold'
                  : 'text-amber-800 font-medium'
              }`}
              title="Bugungi o'quv vaqti"
            >
              <Clock className="w-3.5 h-3.5" />
              {minutesStudiedToday}/{dailyGoalMinutes}m
              {goalMetToday && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline ml-0.5" />}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1 text-orange-600 font-medium">
              <Flame className="w-3.5 h-3.5 fill-orange-500/20" />
              {streakDays} kun
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-stone-700">{totalXp} XP</span>
          </div>

          <button
            onClick={onOpenRoadmap}
            className="px-3.5 py-1.5 text-xs font-semibold tracking-wide text-stone-900 bg-amber-100/80 hover:bg-amber-200 border border-amber-300/60 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>C1 Yo'l Xaritasi</span>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div className="md:hidden flex items-center gap-2 pt-2.5 mt-2 border-t border-stone-200/60 text-xs font-medium text-stone-600 overflow-x-auto pb-1">
        <button
          onClick={() => onSelectTab('courses')}
          className={`px-2 py-1 whitespace-nowrap rounded ${activeTab === 'courses' ? 'bg-stone-200 text-stone-900 font-bold' : ''}`}
        >
          Darsliklar
        </button>
        <button
          onClick={() => onSelectTab('conversational')}
          className={`px-2 py-1 whitespace-nowrap rounded ${activeTab === 'conversational' ? 'bg-stone-200 text-stone-900 font-bold' : ''}`}
        >
          Muloqot
        </button>
        <button
          onClick={() => onSelectTab('sentences')}
          className={`px-2 py-1 whitespace-nowrap rounded ${activeTab === 'sentences' ? 'bg-stone-200 text-stone-900 font-bold' : ''}`}
        >
          Gap Tuzish
        </button>
        <button
          onClick={() => onSelectTab('ai-tutor')}
          className={`px-2 py-1 whitespace-nowrap rounded ${activeTab === 'ai-tutor' ? 'bg-stone-200 text-stone-900 font-bold' : ''}`}
        >
          AI Murabbiy
        </button>
        <button
          onClick={() => onSelectTab('programming')}
          className={`px-2 py-1 whitespace-nowrap rounded ${activeTab === 'programming' ? 'bg-stone-200 text-stone-900 font-bold' : ''}`}
        >
          Dasturlash
        </button>
        <button
          onClick={() => onSelectTab('games')}
          className={`px-2 py-1 whitespace-nowrap rounded ${activeTab === 'games' ? 'bg-stone-200 text-stone-900 font-bold' : ''}`}
        >
          Lug'at
        </button>
        <button
          onClick={() => onSelectTab('playground')}
          className={`px-2 py-1 whitespace-nowrap rounded ${activeTab === 'playground' ? 'bg-stone-200 text-stone-900 font-bold' : ''}`}
        >
          Kod
        </button>
        <button
          onClick={() => onSelectTab('progress')}
          className={`px-2 py-1 whitespace-nowrap rounded ${activeTab === 'progress' ? 'bg-stone-200 text-stone-900 font-bold' : ''}`}
        >
          Profil ({minutesStudiedToday}/{dailyGoalMinutes}m)
        </button>
      </div>
    </header>
  );
};
