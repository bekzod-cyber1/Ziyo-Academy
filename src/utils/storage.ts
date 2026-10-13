import { UserProgress } from '../types';

const STORAGE_KEY = 'ziyo_academy_user_progress_v3';

const UZBEK_DAY_NAMES = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];

function generateInitialWeeklyActivity(goal: number, todayMinutes: number) {
  const result = [];
  const now = new Date();

  // Past 6 days + today = 7 days
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = UZBEK_DAY_NAMES[d.getDay()];

    // Generate realistic prior study minutes to motivate consistency
    let mins = 0;
    if (i === 0) {
      mins = todayMinutes;
    } else if (i === 1) {
      mins = 32;
    } else if (i === 2) {
      mins = 25;
    } else if (i === 3) {
      mins = 15;
    } else if (i === 4) {
      mins = 30;
    } else if (i === 5) {
      mins = 20;
    } else {
      mins = 28;
    }

    result.push({
      day: dayName,
      date: dateStr,
      minutes: mins,
      goal: goal,
    });
  }
  return result;
}

const defaultProgress: UserProgress = {
  completedLessonIds: ['eng-a1-1'],
  streakDays: 4,
  totalXp: 480,
  vocabularyMastered: ['eng-1', 'eng-2', 'ru-1'],
  quizScores: { 'eng-a1-1': 100 },
  codingSolvedIds: ['py-intro-1'],
  lastStudyDate: new Date().toISOString().split('T')[0],
  dailyGoalMinutes: 25,
  minutesStudiedToday: 20,
  goalMetToday: false,
  weeklyActivity: generateInitialWeeklyActivity(25, 20),
};

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toISOString().split('T')[0];
    if (!raw) {
      saveUserProgress(defaultProgress);
      return defaultProgress;
    }
    const parsed = JSON.parse(raw) as UserProgress;

    // Ensure weeklyActivity exists
    if (!parsed.weeklyActivity || parsed.weeklyActivity.length === 0) {
      parsed.weeklyActivity = generateInitialWeeklyActivity(
        parsed.dailyGoalMinutes || 25,
        parsed.minutesStudiedToday || 0
      );
    }

    // Check if day changed: reset today's study minutes if new day
    if (parsed.lastStudyDate !== today) {
      const updated: UserProgress = {
        ...parsed,
        minutesStudiedToday: 0,
        goalMetToday: false,
        lastStudyDate: today,
        weeklyActivity: generateInitialWeeklyActivity(
          parsed.dailyGoalMinutes || 25,
          0
        ),
      };
      saveUserProgress(updated);
      return updated;
    }

    return { ...defaultProgress, ...parsed };
  } catch (e) {
    console.error('Error loading user progress:', e);
    return defaultProgress;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving user progress:', e);
  }
}

export function setDailyGoal(minutes: number): UserProgress {
  const current = loadUserProgress();
  const goalMet = current.minutesStudiedToday >= minutes;

  // Update today's entry in weeklyActivity
  const todayStr = new Date().toISOString().split('T')[0];
  const updatedWeekly = current.weeklyActivity.map((item) =>
    item.date === todayStr ? { ...item, goal: minutes } : item
  );

  const updated: UserProgress = {
    ...current,
    dailyGoalMinutes: minutes,
    goalMetToday: goalMet,
    weeklyActivity: updatedWeekly,
  };
  saveUserProgress(updated);
  return updated;
}

export function addStudyMinutes(minutes: number): UserProgress {
  const current = loadUserProgress();
  const newMinutes = current.minutesStudiedToday + minutes;
  const wasMet = current.goalMetToday;
  const nowMet = newMinutes >= current.dailyGoalMinutes;

  const bonusXp = !wasMet && nowMet ? 100 : 0; // Celebration reward for achieving daily goal!

  // Update today's activity in weeklyActivity
  const todayStr = new Date().toISOString().split('T')[0];
  const todayDayName = UZBEK_DAY_NAMES[new Date().getDay()];

  let foundToday = false;
  const updatedWeekly = current.weeklyActivity.map((item) => {
    if (item.date === todayStr) {
      foundToday = true;
      return { ...item, minutes: newMinutes, goal: current.dailyGoalMinutes };
    }
    return item;
  });

  if (!foundToday) {
    updatedWeekly.push({
      day: todayDayName,
      date: todayStr,
      minutes: newMinutes,
      goal: current.dailyGoalMinutes,
    });
    if (updatedWeekly.length > 7) {
      updatedWeekly.shift();
    }
  }

  const updated: UserProgress = {
    ...current,
    minutesStudiedToday: newMinutes,
    goalMetToday: nowMet,
    totalXp: current.totalXp + bonusXp + minutes * 2,
    weeklyActivity: updatedWeekly,
  };
  saveUserProgress(updated);
  return updated;
}

export function addCompletedLesson(lessonId: string, xpGain: number): UserProgress {
  const current = loadUserProgress();
  const completed = new Set(current.completedLessonIds);
  const isNew = !completed.has(lessonId);
  completed.add(lessonId);

  const today = new Date().toISOString().split('T')[0];
  let streak = current.streakDays;
  if (current.lastStudyDate !== today) {
    streak += 1;
  }

  // Adding lesson adds estimated 12 minutes of study time
  const newMinutes = current.minutesStudiedToday + 12;
  const goalMet = newMinutes >= current.dailyGoalMinutes;

  const updatedWeekly = current.weeklyActivity.map((item) =>
    item.date === today ? { ...item, minutes: newMinutes } : item
  );

  const updated: UserProgress = {
    ...current,
    completedLessonIds: Array.from(completed),
    totalXp: current.totalXp + (isNew ? xpGain : 10),
    streakDays: streak,
    lastStudyDate: today,
    minutesStudiedToday: newMinutes,
    goalMetToday: goalMet,
    weeklyActivity: updatedWeekly,
  };
  saveUserProgress(updated);
  return updated;
}

export function addMasteredVocab(wordId: string): UserProgress {
  const current = loadUserProgress();
  const vocab = new Set(current.vocabularyMastered);
  vocab.add(wordId);
  const newMinutes = current.minutesStudiedToday + 2;
  const goalMet = newMinutes >= current.dailyGoalMinutes;

  const today = new Date().toISOString().split('T')[0];
  const updatedWeekly = current.weeklyActivity.map((item) =>
    item.date === today ? { ...item, minutes: newMinutes } : item
  );

  const updated: UserProgress = {
    ...current,
    vocabularyMastered: Array.from(vocab),
    totalXp: current.totalXp + 15,
    minutesStudiedToday: newMinutes,
    goalMetToday: goalMet,
    weeklyActivity: updatedWeekly,
  };
  saveUserProgress(updated);
  return updated;
}

export function addSolvedCoding(codeId: string, xpGain: number): UserProgress {
  const current = loadUserProgress();
  const solved = new Set(current.codingSolvedIds);
  const isNew = !solved.has(codeId);
  solved.add(codeId);
  const newMinutes = current.minutesStudiedToday + 15;
  const goalMet = newMinutes >= current.dailyGoalMinutes;

  const today = new Date().toISOString().split('T')[0];
  const updatedWeekly = current.weeklyActivity.map((item) =>
    item.date === today ? { ...item, minutes: newMinutes } : item
  );

  const updated: UserProgress = {
    ...current,
    codingSolvedIds: Array.from(solved),
    totalXp: current.totalXp + (isNew ? xpGain : 20),
    minutesStudiedToday: newMinutes,
    goalMetToday: goalMet,
    weeklyActivity: updatedWeekly,
  };
  saveUserProgress(updated);
  return updated;
}
