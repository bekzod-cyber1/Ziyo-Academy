import React, { useState } from 'react';
import { Course } from '../types';
import { BookOpen, Clock, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface CourseCatalogProps {
  courses: Course[];
  completedLessonIds: string[];
  onSelectCourse: (course: Course) => void;
  onOpenLesson: (lessonId: string) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  completedLessonIds,
  onSelectCourse,
  onOpenLesson,
}) => {
  const [filter, setFilter] = useState<'all' | 'languages' | 'programming'>('all');

  const filteredCourses = courses.filter((c) => {
    if (filter === 'languages') return c.category !== 'programming';
    if (filter === 'programming') return c.category === 'programming';
    return true;
  });

  return (
    <div className="py-8 space-y-8">
      {/* Editorial Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/70 pb-5">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
            Dasturlar Katalogi
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">
            Akademik Yo'nalishlar va Darsliklar
          </h2>
        </div>

        {/* Interactive Filter Tabs (functional segmented controls per Section 1.A) */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/60 rounded-lg">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setFilter('languages')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'languages'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Chet Tillari (B2)
          </button>
          <button
            onClick={() => setFilter('programming')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'programming'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Dasturlash (Dev)
          </button>
        </div>
      </div>

      {/* Featured Visual Spotlights (Polyglot + Programming) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative rounded-xl overflow-hidden border border-stone-200 shadow-sm group">
          <div className="h-48 overflow-hidden relative">
            <img
              src="/src/assets/images/feature_languages_polyglot_1791868779319.jpg"
              alt="Polyglot vocabulary notebooks and classical literature"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-stone-900/35" />
            <div className="absolute top-4 left-4 text-xs font-mono text-white/90 bg-stone-900/60 backdrop-blur-sm px-2.5 py-1 rounded">
              Poliglot Metodikasi
            </div>
          </div>
          <div className="p-5 bg-white space-y-2">
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              Chet tillarida B2 darajasiga yetish siri
            </h3>
            <p className="text-sm text-stone-600">
              Grammatika formulalari, kundalik 20 daqiqalik lug'at mustahkamlash va
              jonli fonetik audio mashqlar orqali ravon gapirish qobiliyati.
            </p>
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-stone-200 shadow-sm group">
          <div className="h-48 overflow-hidden relative">
            <img
              src="/src/assets/images/feature_programming_dev_1791868779380.jpg"
              alt="Engineering desk with algorithm state diagrams and code"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-stone-900/35" />
            <div className="absolute top-4 left-4 text-xs font-mono text-white/90 bg-stone-900/60 backdrop-blur-sm px-2.5 py-1 rounded">
              Muhandislik Amaliyoti
            </div>
          </div>
          <div className="p-5 bg-white space-y-2">
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              Nazariyadan bevosita amaliy kodga o'tish
            </h3>
            <p className="text-sm text-stone-600">
              Python sintaksisi, JavaScript asinxronligi va C++ xotira ko'rsatkichlari bo'yicha
              real vaqt rejimida brauzerda ishlovchi kod sinovlari.
            </p>
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const completedCount = course.lessons.filter((l) =>
            completedLessonIds.includes(l.id)
          ).length;
          const progressPercent = Math.round(
            (completedCount / Math.max(course.lessons.length, 1)) * 100
          );

          return (
            <div
              key={course.id}
              className="glass-panel rounded-xl p-6 transition-all hover:shadow-md hover:border-stone-400/80 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Course Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" role="img" aria-label={course.name}>
                      {course.flag}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-stone-900 leading-snug">
                        {course.name}
                      </h3>
                      <div className="text-xs text-stone-500 font-sans">
                        {course.originalName}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded">
                    {course.maxLevel}
                  </span>
                </div>

                <p className="text-sm text-stone-600 line-clamp-2">
                  {course.description}
                </p>

                {/* Unboxed Metadata (Section 1.A Anti-Slop Rule) */}
                <div className="flex items-center gap-2 text-xs text-stone-500 pt-2 border-t border-stone-200/60 font-mono">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                    {course.lessons.length} ta dars
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    ~{course.estimatedHours} soat
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-stone-400" />
                    Sertifikat
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs text-stone-600 font-mono tabular-nums">
                    <span>O'zlashtirish</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-700 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Lesson Preview Links */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Asosiy Darslar
                  </div>
                  <div className="space-y-1.5">
                    {course.lessons.slice(0, 3).map((lesson) => {
                      const isDone = completedLessonIds.includes(lesson.id);
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onOpenLesson(lesson.id)}
                          className="w-full text-left p-2 rounded-lg bg-stone-100/70 hover:bg-stone-200/70 transition-colors flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-2 text-xs text-stone-800 truncate">
                            {isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <span className="text-[10px] font-mono text-stone-500 w-4 shrink-0">
                                {lesson.order}.
                              </span>
                            )}
                            <span className="truncate group-hover:text-amber-900 font-medium">
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-stone-500 shrink-0 ml-2">
                            {lesson.level}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5 mt-4 border-t border-stone-200/60">
                <button
                  onClick={() => onSelectCourse(course)}
                  className="w-full py-2 px-3 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300/80 rounded-lg transition-colors flex items-center justify-center gap-1.5 group"
                >
                  <span>Kursni to'liq ko'rish</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
