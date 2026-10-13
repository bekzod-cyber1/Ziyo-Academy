import React, { useState, useEffect } from 'react';
import { COURSES } from './data/coursesData';
import { Course, Lesson, UserProgress } from './types';
import {
  loadUserProgress,
  addCompletedLesson,
  addMasteredVocab,
  addSolvedCoding,
  addStudyMinutes,
} from './utils/storage';
import { Header, AppTab } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CourseCatalog } from './components/CourseCatalog';
import { LessonViewer } from './components/LessonViewer';
import { VocabularyGames } from './components/VocabularyGames';
import { CodePlayground } from './components/CodePlayground';
import { ProgressDashboard } from './components/ProgressDashboard';
import { ConversationalMastery } from './components/ConversationalMastery';
import { SentenceBuilderLab } from './components/SentenceBuilderLab';
import { AIAcademicTutor } from './components/AIAcademicTutor';
import { B2RoadmapModal } from './components/B2RoadmapModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('courses');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress());

  // Keep progress in sync
  useEffect(() => {
    setProgress(loadUserProgress());
  }, []);

  // Background passive study timer: every 60 seconds of interaction, log 1 minute of active study!
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const updated = addStudyMinutes(1);
        return updated;
      });
    }, 60000); // 1 minute interval

    return () => clearInterval(timer);
  }, []);

  const handleOpenLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromLesson = () => {
    setActiveLessonId(null);
  };

  const handleCompleteLesson = (lessonId: string, xpReward: number) => {
    const updated = addCompletedLesson(lessonId, xpReward);
    setProgress(updated);
  };

  const handleAddMasteredVocab = (wordId: string) => {
    const updated = addMasteredVocab(wordId);
    setProgress(updated);
  };

  const handleSolveChallenge = (challengeId: string, xp: number) => {
    const updated = addSolvedCoding(challengeId, xp);
    setProgress(updated);
  };

  const handleAwardXp = (xp: number) => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        totalXp: prev.totalXp + xp,
      };
      return updated;
    });
  };

  const handleStartCourse = (courseId: string) => {
    const found = COURSES.find((c) => c.id === courseId);
    if (found && found.lessons.length > 0) {
      handleOpenLesson(found.lessons[0].id);
    }
  };

  // Find currently active lesson object if any
  const currentLesson: Lesson | undefined = activeLessonId
    ? COURSES.flatMap((c) => c.lessons).find((l) => l.id === activeLessonId)
    : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-100 selection:text-amber-900 font-sans transition-colors duration-200">
      {/* Top Bar with Strict 3-Zone Contract and Live Goal Tracker */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setActiveLessonId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        streakDays={progress.streakDays}
        totalXp={progress.totalXp}
        minutesStudiedToday={progress.minutesStudiedToday}
        dailyGoalMinutes={progress.dailyGoalMinutes}
        goalMetToday={progress.goalMetToday}
        onOpenRoadmap={() => setIsRoadmapOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 transition-opacity duration-300">
        {/* If a lesson is currently open, show LessonViewer */}
        {currentLesson ? (
          <LessonViewer
            lesson={currentLesson}
            isCompleted={progress.completedLessonIds.includes(currentLesson.id)}
            onBack={handleBackFromLesson}
            onComplete={handleCompleteLesson}
          />
        ) : (
          <>
            {/* When on Home / Courses tab, show Hero */}
            {activeTab === 'courses' && (
              <HeroSection
                onStartCourse={handleStartCourse}
                onExploreGames={() => {
                  setActiveTab('games');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* Course Catalog Tab */}
            {activeTab === 'courses' && (
              <CourseCatalog
                courses={COURSES}
                completedLessonIds={progress.completedLessonIds}
                onSelectCourse={(course) => {
                  if (course.lessons[0]) {
                    handleOpenLesson(course.lessons[0].id);
                  }
                }}
                onOpenLesson={handleOpenLesson}
              />
            )}

            {/* Dedicated Conversational Fluency & Spoken Mastery Tab (C1) */}
            {activeTab === 'conversational' && (
              <ConversationalMastery onAwardXp={handleAwardXp} />
            )}

            {/* Dedicated Short Sentence Builder Lab */}
            {activeTab === 'sentences' && (
              <SentenceBuilderLab onAwardXp={handleAwardXp} />
            )}

            {/* AI Academic Tutor Tab */}
            {activeTab === 'ai-tutor' && <AIAcademicTutor />}

            {/* Programming Specialized Tab */}
            {activeTab === 'programming' && (
              <div className="py-6 space-y-6">
                <div className="border-b border-stone-200/70 pb-5">
                  <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
                    Muhandislik Yo'nalishi
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">
                    Dasturlash: Python, JavaScript va C++
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Boshlang'ich sintaksisdan boshlab, OOP, asinxronlik va murakkab algoritmlargacha (B2 daraja).
                  </p>
                </div>

                <CourseCatalog
                  courses={COURSES.filter((c) => c.category === 'programming')}
                  completedLessonIds={progress.completedLessonIds}
                  onSelectCourse={(course) => {
                    if (course.lessons[0]) {
                      handleOpenLesson(course.lessons[0].id);
                    }
                  }}
                  onOpenLesson={handleOpenLesson}
                />
              </div>
            )}

            {/* Vocabulary Games & Pronunciation Tab */}
            {activeTab === 'games' && (
              <VocabularyGames
                onAddMasteredVocab={handleAddMasteredVocab}
                masteredVocabIds={progress.vocabularyMastered}
              />
            )}

            {/* Interactive Code Playground Tab */}
            {activeTab === 'playground' && (
              <CodePlayground
                onSolveChallenge={handleSolveChallenge}
                solvedIds={progress.codingSolvedIds}
              />
            )}

            {/* User Progress & Achievement Tab with Daily Study Goal & Recharts 7-day Bar Chart */}
            {activeTab === 'progress' && (
              <ProgressDashboard
                progress={progress}
                courses={COURSES}
                onOpenRoadmap={() => setIsRoadmapOpen(true)}
                onOpenLesson={handleOpenLesson}
                onUpdateProgress={(updated) => setProgress(updated)}
              />
            )}
          </>
        )}
      </main>

      {/* Global B2 & C1 Roadmap Modal */}
      <B2RoadmapModal
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
        userXp={progress.totalXp}
      />

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setActiveTab(tab as AppTab);
          setActiveLessonId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
