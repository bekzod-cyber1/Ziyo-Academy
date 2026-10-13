import React, { useState } from 'react';
import { UserProgress, Course } from '../types';
import {
  Trophy,
  Flame,
  Award,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock,
  Target,
  Plus,
  TrendingUp,
} from 'lucide-react';
import { setDailyGoal, addStudyMinutes } from '../utils/storage';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';

interface ProgressDashboardProps {
  progress: UserProgress;
  courses: Course[];
  onOpenRoadmap: () => void;
  onOpenLesson: (lessonId: string) => void;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  courses,
  onOpenRoadmap,
  onOpenLesson,
  onUpdateProgress,
}) => {
  const totalLessons = courses.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedCount = progress.completedLessonIds.length;
  const overallPercentage = Math.min(
    100,
    Math.round((completedCount / Math.max(totalLessons, 1)) * 100)
  );

  // Daily goal progress calculation
  const goalMinutes = progress.dailyGoalMinutes || 25;
  const studiedMinutes = progress.minutesStudiedToday || 0;
  const goalPercent = Math.min(
    100,
    Math.round((studiedMinutes / Math.max(goalMinutes, 1)) * 100)
  );
  const isGoalMet = studiedMinutes >= goalMinutes || progress.goalMetToday;

  const handleSetGoal = (mins: number) => {
    const updated = setDailyGoal(mins);
    onUpdateProgress(updated);
  };

  const handleAddMinutes = (mins: number) => {
    const updated = addStudyMinutes(mins);
    onUpdateProgress(updated);
  };

  // Recharts Chart Data (Last 7 Days)
  const chartData = (progress.weeklyActivity || []).map((item) => ({
    name: item.day,
    minutes: item.minutes,
    goal: item.goal || goalMinutes,
    date: item.date,
    isMet: item.minutes >= (item.goal || goalMinutes),
  }));

  const totalWeeklyMinutes = chartData.reduce(
    (acc, cur) => acc + cur.minutes,
    0
  );
  const averageDailyMinutes = Math.round(
    totalWeeklyMinutes / Math.max(chartData.length, 1)
  );

  return (
    <div className="py-6 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200/70 pb-5">
        <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
          Shaxsiy Kabinet & Tahlil
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">
          Mening O'quv Natijalarim va Kunlik Faollik
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Har kungi o'rganish vaqtingizni belgilang, 7 kunlik grafik tahlilini
          kuzatib boring va C1 erkin muloqot darajasi sari intiling.
        </p>
      </div>

      {/* DAILY STUDY GOAL & 7-DAY VISUAL BAR CHART GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Daily Goal Controls (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-7 rounded-2xl border border-stone-300/80 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-800 font-bold uppercase">
              <Target className="w-4 h-4 text-amber-700" />
              <span>Kunlik Maqsad (Daily Target)</span>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Bugun: <span className="tabular-nums">{studiedMinutes}</span> /{' '}
                <span className="tabular-nums">{goalMinutes}</span> daqiqa
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                {isGoalMet
                  ? "Ajoyib! Bugungi kunlik maqsadingiz muvaffaqiyatli bajarildi."
                  : `Maqsadga erishish uchun yana ${Math.max(
                      0,
                      goalMinutes - studiedMinutes
                    )} daqiqa o'rganing.`}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-mono tabular-nums text-stone-700">
                <span>Bajarilish: {goalPercent}%</span>
                <span>
                  {isGoalMet ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Maqsad Bajarildi (+100 XP)
                    </span>
                  ) : (
                    `${studiedMinutes} / ${goalMinutes} min`
                  )}
                </span>
              </div>
              <div className="w-full h-3 bg-stone-200/80 rounded-full overflow-hidden p-0.5 border border-stone-300/60">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isGoalMet
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-500'
                      : 'bg-gradient-to-r from-amber-600 to-amber-700'
                  }`}
                  style={{ width: `${goalPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-stone-200/60">
            {/* Quick Add Minutes */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAddMinutes(5)}
                className="flex-1 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium border border-stone-300 transition-colors flex items-center justify-center gap-1"
                title="5 daqiqa o'qish"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+5 daq</span>
              </button>
              <button
                onClick={() => handleAddMinutes(15)}
                className="flex-1 py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                title="15 daqiqa dars"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>+15 daq Mashq</span>
              </button>
            </div>

            {/* Change Goal Presets */}
            <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
              <span className="font-mono text-stone-500">Maqsad:</span>
              <div className="flex items-center gap-1.5">
                {[15, 25, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => handleSetGoal(mins)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                      goalMinutes === mins
                        ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Visual Bar Chart Using Recharts (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-7 rounded-2xl border border-stone-300/80 flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/70 pb-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-amber-700" />
                <span>So'nggi 7 Kunlik O'quv Faolligi</span>
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-base mt-0.5">
                Muntazam Ta'lim Grafigi (Recharts)
              </h4>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono tabular-nums text-stone-600">
              <span>
                Jami: <b className="text-stone-900">{totalWeeklyMinutes}</b> daqiqa
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>
                O'rtacha: <b className="text-stone-900">{averageDailyMinutes}</b> daqiqa/kun
              </span>
            </div>
          </div>

          {/* Responsive Recharts Bar Chart Container */}
          <div className="w-full h-56 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={{ stroke: '#e7e5e4' }}
                  tick={{ fill: '#78716c', fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={{ stroke: '#e7e5e4' }}
                  tick={{ fill: '#78716c', fontSize: 11 }}
                  unit="m"
                />
                <Tooltip
                  cursor={{ fill: 'rgba(214, 211, 209, 0.2)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="p-3 bg-stone-900 text-white rounded-lg text-xs font-mono shadow-xl border border-stone-700 space-y-1">
                          <div className="font-bold text-amber-300">
                            {data.name} ({data.date})
                          </div>
                          <div>Vaqt: {data.minutes} daqiqa</div>
                          <div className="text-stone-400">
                            Kunlik maqsad: {data.goal} daqiqa
                          </div>
                          <div
                            className={
                              data.isMet
                                ? 'text-emerald-400 font-semibold'
                                : 'text-amber-400'
                            }
                          >
                            {data.isMet ? '✓ Maqsad bajarildi' : 'Reja davomida'}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine
                  y={goalMinutes}
                  stroke="#b45309"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: `Reja: ${goalMinutes}m`,
                    position: 'top',
                    fill: '#b45309',
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                />
                <Bar dataKey="minutes" radius={[6, 6, 0, 0]} maxBarSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isMet ? '#059669' : '#d97706'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-100 font-sans">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block" />
                Maqsad bajarildi
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-600 inline-block" />
                O'quv vaqti
              </span>
            </div>
            <span className="italic hidden sm:inline">
              Har kuni uzluksiz o'rganish xotirada 4x mustahkam saqlaydi
            </span>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl space-y-2 border border-stone-300/80">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-medium">Umumiy XP</span>
            <Trophy className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tabular-nums">
            {progress.totalXp}
          </div>
          <div className="text-[11px] text-stone-500 font-mono">
            +{progress.completedLessonIds.length * 50} darslardan
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2 border border-stone-300/80">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-medium">Kunlik Ketma-ketlik</span>
            <Flame className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tabular-nums">
            {progress.streakDays} kun
          </div>
          <div className="text-[11px] text-emerald-700 font-mono">
            Faol poliglot
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2 border border-stone-300/80">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-medium">Tugallangan Darslar</span>
            <BookOpen className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tabular-nums">
            {completedCount}{' '}
            <span className="text-sm font-normal text-stone-400">
              / {totalLessons}
            </span>
          </div>
          <div className="text-[11px] text-stone-500 font-mono">
            {overallPercentage}% kursdan
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2 border border-stone-300/80">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-medium">Yodlangan So'zlar</span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tabular-nums">
            {progress.vocabularyMastered.length} ta
          </div>
          <div className="text-[11px] text-stone-500 font-mono">
            Talaffuz qilingan
          </div>
        </div>
      </div>

      {/* C1 ADVANCED FLUENCY & CEFR MILESTONES */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-stone-300/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
              CEFR & Mustaqil Erkin Muloqot (C1)
            </span>
            <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
              A1 dan C1 Mustaqil Ravon Gaplasha Olish Bosqichi
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              O'ylanmasdan va to'xtalmasdan ona tilidek erkin muloqot qiluvchi
              C1 darajasiga chiqish mezonlari.
            </p>
          </div>

          <button
            onClick={onOpenRoadmap}
            className="py-2.5 px-5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>C1 Yo'l Xaritasini Ko'rish</span>
          </button>
        </div>

        {/* 5-Step Progressive Level Grid: A1 -> A2 -> B1 -> B2 -> C1 */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
          {[
            {
              level: 'A1',
              title: 'Asoslar',
              desc: 'Salomlashish, fonetika',
              done: true,
            },
            {
              level: 'A2',
              title: 'Elementar',
              desc: 'Odatlar, sayohat',
              done: completedCount >= 2,
            },
            {
              level: 'B1',
              title: "O'rta",
              desc: 'Tajribalar, shart gap',
              done: completedCount >= 4,
            },
            {
              level: 'B2',
              title: 'Mustaqil',
              desc: "Inversiya, akademik so'z",
              done: completedCount >= 6,
            },
            {
              level: 'C1',
              title: 'Erkin Muloqot',
              desc: 'Spontan nutq, idiomatik boylik',
              done: completedCount >= 8,
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border text-center transition-all ${
                step.done
                  ? 'bg-amber-50/80 border-amber-300 text-stone-900 shadow-xs'
                  : 'bg-stone-100/50 border-stone-200 text-stone-400'
              }`}
            >
              <div className="text-sm font-serif font-bold text-amber-900">
                {step.level}
              </div>
              <div className="text-xs font-semibold mt-0.5">{step.title}</div>
              <div className="text-[10px] text-stone-500 mt-0.5 leading-snug">
                {step.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* List of Recent Completed Lessons */}
      <div className="glass-panel p-6 rounded-2xl border border-stone-300/80 space-y-4">
        <h3 className="text-lg font-serif font-semibold text-stone-900">
          O'zlashtirilgan Darslar Tarixi
        </h3>

        <div className="space-y-2">
          {courses
            .flatMap((c) => c.lessons)
            .map((lesson) => {
              const isDone = progress.completedLessonIds.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  onClick={() => onOpenLesson(lesson.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    isDone
                      ? 'bg-white border-stone-200 hover:border-amber-400'
                      : 'bg-stone-50/60 border-stone-200/60 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-stone-300 shrink-0" />
                    )}
                    <div>
                      <div className="text-xs font-semibold text-stone-900">
                        {lesson.title}
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono">
                        {lesson.level} · {lesson.durationMinutes} daqiqa
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-amber-800">
                    +{lesson.xpReward} XP
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
