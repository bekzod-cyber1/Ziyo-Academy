import React, { useState } from 'react';
import { Lesson } from '../types';
import {
  Volume2,
  CheckCircle2,
  ArrowLeft,
  BookOpen,
  HelpCircle,
  Code2,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { playPronunciation } from '../utils/speech';

interface LessonViewerProps {
  lesson: Lesson;
  isCompleted: boolean;
  onBack: () => void;
  onComplete: (lessonId: string, xpReward: number) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  isCompleted,
  onBack,
  onComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'vocabulary' | 'exercises' | 'code'>(
    'theory'
  );
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Sentence Puzzle State
  const [constructedWords, setConstructedWords] = useState<string[]>([]);
  const [sentenceChecked, setSentenceChecked] = useState<boolean>(false);
  const [isSentenceCorrect, setIsSentenceCorrect] = useState<boolean | null>(null);

  // Code Playground State (for programming lessons)
  const [userCode, setUserCode] = useState<string>(
    lesson.codingTask?.starterCode || ''
  );
  const [codeOutput, setCodeOutput] = useState<string>('');
  const [codeTaskPassed, setCodeTaskPassed] = useState<boolean>(false);

  const handleSpeak = (text: string, langCode: string, id?: string) => {
    if (id) setPlayingWordId(id);
    playPronunciation(
      text,
      langCode,
      speechRate,
      () => setPlayingWordId(null),
      () => setPlayingWordId(null)
    );
  };

  const handleQuizOption = (qId: string, optIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const checkQuiz = () => {
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  // Sentence puzzle handlers
  const currentSentenceExercise = lesson.sentenceExercises?.[0];
  const handleWordClick = (word: string) => {
    if (sentenceChecked) return;
    setConstructedWords((prev) => [...prev, word]);
  };

  const removeConstructedWord = (index: number) => {
    if (sentenceChecked) return;
    setConstructedWords((prev) => prev.filter((_, i) => i !== index));
  };

  const checkSentence = () => {
    if (!currentSentenceExercise) return;
    const constructed = constructedWords.join(' ').trim();
    const correct = currentSentenceExercise.targetSentence.trim();
    const pass = constructed.toLowerCase() === correct.toLowerCase();
    setIsSentenceCorrect(pass);
    setSentenceChecked(true);
  };

  const resetSentence = () => {
    setConstructedWords([]);
    setSentenceChecked(false);
    setIsSentenceCorrect(null);
  };

  // Code task simulation
  const runCodeTask = () => {
    if (!lesson.codingTask) return;
    try {
      // Simulate code runner with output matching
      let simulatedOutput = '';
      if (lesson.codingTask.language === 'python') {
        if (userCode.includes('Xush kelibsiz') && userCode.includes('age')) {
          simulatedOutput = 'Xush kelibsiz\n[Dastur muvaffaqiyatli yakunlandi: Kod to\'g\'ri]';
          setCodeTaskPassed(true);
        } else {
          simulatedOutput = 'Kutilgan natija olinmadi. Shartni va print() operatorini tekshiring.';
          setCodeTaskPassed(false);
        }
      } else if (lesson.codingTask.language === 'javascript') {
        if (userCode.includes('filter') || userCode.includes('map')) {
          simulatedOutput = '[ 4, 8, 12 ]\n[Barcha testlar muvaffaqiyatli o\'tdi]';
          setCodeTaskPassed(true);
        } else {
          simulatedOutput = 'Diqqat: filter() yoki map() metodlaridan foydalaning.';
          setCodeTaskPassed(false);
        }
      } else {
        simulatedOutput = 'Qiymat: 42\n[C++ Pointer muvaffaqiyatli ishladi: O(1) xotira]';
        setCodeTaskPassed(true);
      }
      setCodeOutput(simulatedOutput);
    } catch {
      setCodeOutput('Sintaksis xatosi: Kodingizni qayta tekshiring.');
      setCodeTaskPassed(false);
    }
  };

  return (
    <div className="py-6 max-w-5xl mx-auto space-y-6">
      {/* Top Header & Back Button */}
      <div className="flex items-center justify-between border-b border-stone-200/70 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Katalogga qaytish</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
            <span>Tezlik:</span>
            <button
              onClick={() => setSpeechRate(0.8)}
              className={`px-2 py-0.5 rounded text-[11px] ${
                speechRate === 0.8
                  ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              0.8x (Sekin)
            </button>
            <button
              onClick={() => setSpeechRate(1.0)}
              className={`px-2 py-0.5 rounded text-[11px] ${
                speechRate === 1.0
                  ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              1.0x (Normal)
            </button>
          </div>

          {isCompleted && (
            <span className="flex items-center gap-1 text-xs text-emerald-700 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Tugallangan
            </span>
          )}
        </div>
      </div>

      {/* Lesson Headline */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
          <span className="font-semibold text-amber-800">{lesson.level} Bosqichi</span>
          <span aria-hidden="true">·</span>
          <span>{lesson.durationMinutes} daqiqa</span>
          <span aria-hidden="true">·</span>
          <span>+{lesson.xpReward} XP mukofoti</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 font-bold">
          {lesson.title}
        </h1>
        <p className="text-stone-600 text-sm">{lesson.subtitle}</p>
      </div>

      {/* Navigation Tabs (Functional Segmented Control) */}
      <div className="flex items-center gap-1 p-1 bg-stone-200/60 rounded-lg max-w-md">
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'theory'
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-stone-500" />
          <span>Nazariya & Qoidalar</span>
        </button>
        <button
          onClick={() => setActiveTab('vocabulary')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'vocabulary'
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5 text-stone-500" />
          <span>Lug'at & Talaffuz</span>
        </button>
        <button
          onClick={() => setActiveTab('exercises')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'exercises'
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
          <span>Mashqlar & Test</span>
        </button>
        {lesson.codingTask && (
          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Kod Sinovi</span>
          </button>
        )}
      </div>

      {/* Tab 1: Theory & Grammar Content */}
      {activeTab === 'theory' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl space-y-4">
            <h3 className="text-base font-semibold text-stone-900 font-serif">
              Darsning qisqacha mazmuni
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed font-sans">
              {lesson.overview}
            </p>
          </div>

          {/* Grammar Rules Cards */}
          <div className="space-y-6">
            {lesson.grammarRules.map((rule, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-xl space-y-4 border border-stone-200/80"
              >
                <div className="space-y-1">
                  <h4 className="text-base font-semibold text-stone-900">
                    {rule.title}
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {rule.description}
                  </p>
                </div>

                {rule.formula && (
                  <div className="p-3 bg-stone-100/90 rounded-lg border border-stone-200 text-xs font-mono text-stone-800">
                    <span className="text-stone-500">Formula: </span>
                    <span className="font-semibold text-amber-900">{rule.formula}</span>
                  </div>
                )}

                {/* Examples with speech button */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Namunaviy Jumlalar
                  </div>
                  <div className="space-y-2">
                    {rule.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="p-3 bg-white rounded-lg border border-stone-200 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-stone-900">
                            {ex.target}
                          </div>
                          <div className="text-xs text-stone-600">
                            {ex.uzbek}
                          </div>
                          {ex.notes && (
                            <div className="text-[11px] text-amber-800 font-sans italic">
                              Izoh: {ex.notes}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleSpeak(ex.target, lesson.vocabulary[0]?.langCode || 'en-US')}
                          className="p-2 text-stone-500 hover:text-amber-800 hover:bg-stone-100 rounded-md transition-colors shrink-0"
                          title="Talaffuzni tinglash"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dialogue Section if available */}
          {lesson.dialogue && lesson.dialogue.length > 0 && (
            <div className="glass-panel p-6 rounded-xl space-y-4">
              <h3 className="text-base font-semibold text-stone-900 font-serif">
                Jonli Suhbat & Muloqot Namunasi
              </h3>
              <div className="space-y-3">
                {lesson.dialogue.map((d, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3 rounded-lg bg-white border border-stone-200 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-amber-800 font-bold">
                        {d.speaker}:
                      </div>
                      <div className="text-sm font-medium text-stone-900">
                        {d.text}
                      </div>
                      <div className="text-xs text-stone-500">
                        {d.translation}
                      </div>
                    </div>
                    <button
                      onClick={() => handleSpeak(d.text, lesson.vocabulary[0]?.langCode || 'en-US')}
                      className="p-2 text-stone-500 hover:text-amber-800 hover:bg-stone-100 rounded-md transition-colors shrink-0"
                      title="Talaffuzni tinglash"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Vocabulary Bank & Audio Pronunciation */}
      {activeTab === 'vocabulary' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl space-y-3">
            <h3 className="text-base font-semibold text-stone-900 font-serif">
              Dars Leksikasi va Fonetik Talaffuzi
            </h3>
            <p className="text-sm text-stone-600">
              Har bir so'zning xalqaro transkripsiyasi (IPA), ma'nosi va audio talaffuzini tinglab o'rganing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.vocabulary.map((vocab) => {
              const isPlaying = playingWordId === vocab.id;
              return (
                <div
                  key={vocab.id}
                  className="glass-panel p-5 rounded-xl border border-stone-200 flex flex-col justify-between space-y-3 transition-all hover:border-amber-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-serif font-bold text-stone-900">
                        {vocab.word}
                      </div>
                      {vocab.transcription && (
                        <div className="text-xs text-stone-500 font-mono">
                          {vocab.transcription}
                        </div>
                      )}
                      <div className="text-sm font-medium text-amber-900 mt-1">
                        {vocab.translation}
                      </div>
                    </div>

                    <button
                      onClick={() => handleSpeak(vocab.word, vocab.langCode, vocab.id)}
                      className={`p-2.5 rounded-lg border transition-colors ${
                        isPlaying
                          ? 'bg-amber-700 text-white border-amber-800 animate-pulse'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-300'
                      }`}
                      title="Talaffuzni tinglash"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-3 border-t border-stone-200/70 text-xs space-y-1">
                    <div className="text-stone-800 font-medium italic">
                      "{vocab.exampleSentence}"
                    </div>
                    <div className="text-stone-500">
                      {vocab.exampleTranslation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Exercises & Quiz */}
      {activeTab === 'exercises' && (
        <div className="space-y-8">
          {/* Quiz Section */}
          <div className="glass-panel p-6 rounded-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-stone-900 font-serif">
                  Mavzuni Mustahkamlash Testi
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Savollarga javob berib, darsni qay darajada o'zlashtirganingizni sinang.
                </p>
              </div>
              {quizSubmitted && (
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Qayta urinish</span>
                </button>
              )}
            </div>

            <div className="space-y-6">
              {lesson.quiz.map((q, qIndex) => {
                const userAnswer = selectedAnswers[q.id];
                const isAnswered = userAnswer !== undefined;
                const isCorrect = userAnswer === q.correctAnswerIndex;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-white border border-stone-200 space-y-3"
                  >
                    <div className="text-sm font-semibold text-stone-900 flex items-start gap-2">
                      <span className="font-mono text-stone-400">{qIndex + 1}.</span>
                      <span>{q.question}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = userAnswer === optIndex;
                        let optionStyle =
                          'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800';

                        if (quizSubmitted) {
                          if (optIndex === q.correctAnswerIndex) {
                            optionStyle =
                              'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium';
                          } else if (isSelected) {
                            optionStyle =
                              'bg-rose-50 border-rose-400 text-rose-900';
                          }
                        } else if (isSelected) {
                          optionStyle =
                            'bg-amber-50 border-amber-500 text-amber-950 font-medium';
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => handleQuizOption(q.id, optIndex)}
                            className={`p-3 text-left rounded-lg border text-xs transition-colors ${optionStyle}`}
                          >
                            <span className="font-mono text-stone-400 mr-2">
                              {String.fromCharCode(65 + optIndex)}.
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && isAnswered && (
                      <div
                        className={`p-3 rounded-lg text-xs leading-relaxed ${
                          isCorrect
                            ? 'bg-emerald-50/70 text-emerald-900 border border-emerald-200'
                            : 'bg-rose-50/70 text-rose-900 border border-rose-200'
                        }`}
                      >
                        <span className="font-bold">
                          {isCorrect ? 'To\'g\'ri javob! ' : 'Xato: '}
                        </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!quizSubmitted ? (
              <button
                onClick={checkQuiz}
                disabled={Object.keys(selectedAnswers).length < lesson.quiz.length}
                className="w-full py-2.5 px-4 bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs font-semibold transition-colors"
              >
                Javoblarni Tekshirish
              </button>
            ) : (
              <div className="p-4 rounded-lg bg-stone-100 text-stone-800 text-xs flex items-center justify-between">
                <span>
                  Natija: {
                    lesson.quiz.filter(
                      (q) => selectedAnswers[q.id] === q.correctAnswerIndex
                    ).length
                  } / {lesson.quiz.length} to'g'ri
                </span>
                <span className="font-bold text-amber-800">
                  +{lesson.xpReward / 2} XP olindi
                </span>
              </div>
            )}
          </div>

          {/* Sentence Puzzle Exercise */}
          {currentSentenceExercise && (
            <div className="glass-panel p-6 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-900 font-serif">
                    Gapni To'g'ri Quring
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    So'zlarni bosib, o'zbekcha jumlaning to'g'ri tarjimasini yig'ing.
                  </p>
                </div>
                <button
                  onClick={resetSentence}
                  className="flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Tozalash</span>
                </button>
              </div>

              <div className="p-4 rounded-lg bg-stone-100/90 text-sm font-medium text-stone-800">
                "{currentSentenceExercise.uzbekSentence}"
              </div>

              {/* User Constructed Words Slot */}
              <div className="min-h-12 p-3 rounded-lg bg-white border border-dashed border-stone-300 flex flex-wrap gap-2 items-center">
                {constructedWords.length === 0 ? (
                  <span className="text-xs text-stone-400 italic">
                    Quyidagi so'zlarni bosing...
                  </span>
                ) : (
                  constructedWords.map((w, idx) => (
                    <button
                      key={idx}
                      onClick={() => removeConstructedWord(idx)}
                      className="px-2.5 py-1 bg-amber-100 text-amber-950 border border-amber-300 rounded text-xs font-medium hover:bg-amber-200 transition-colors"
                    >
                      {w} ✕
                    </button>
                  ))
                )}
              </div>

              {/* Jumbled Words Bank */}
              <div className="flex flex-wrap gap-2 pt-2">
                {currentSentenceExercise.jumbledWords.map((word, wIdx) => {
                  const isUsed = constructedWords.includes(word);
                  return (
                    <button
                      key={wIdx}
                      onClick={() => handleWordClick(word)}
                      disabled={isUsed || sentenceChecked}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        isUsed
                          ? 'opacity-30 bg-stone-100 border-stone-200 cursor-not-allowed'
                          : 'bg-white hover:bg-stone-50 border-stone-300 text-stone-800 shadow-sm'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>

              {!sentenceChecked ? (
                <button
                  onClick={checkSentence}
                  disabled={constructedWords.length === 0}
                  className="w-full py-2 px-4 bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-40 rounded-lg text-xs font-semibold transition-colors mt-2"
                >
                  Jumlani Tekshirish
                </button>
              ) : (
                <div
                  className={`p-3 rounded-lg text-xs space-y-1 ${
                    isSentenceCorrect
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                      : 'bg-rose-50 text-rose-900 border border-rose-300'
                  }`}
                >
                  <div className="font-bold">
                    {isSentenceCorrect ? 'Barakalla! Mukammal tuzildi.' : 'Xatolik mavjud.'}
                  </div>
                  <div>To'g'ri shakl: {currentSentenceExercise.targetSentence}</div>
                  <div className="text-stone-600 italic">
                    {currentSentenceExercise.explanation}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Coding Interactive Task (for programming track) */}
      {activeTab === 'code' && lesson.codingTask && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-stone-900 font-serif">
                  Interaktiv Dasturlash Topshirig'i
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Til: <span className="uppercase font-mono font-bold text-amber-800">{lesson.codingTask.language}</span>
                </p>
              </div>
              <span className="text-xs font-mono text-stone-500">
                Kutilgan natija: {lesson.codingTask.expectedOutput}
              </span>
            </div>

            <div className="p-3 bg-stone-100/90 rounded-lg text-xs text-stone-800 leading-relaxed">
              <span className="font-bold text-stone-900">Vazifa: </span>
              {lesson.codingTask.instruction}
            </div>

            {/* Code Editor Area */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                Kod Muharriri
              </label>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={9}
                className="w-full p-4 rounded-xl font-mono text-xs bg-stone-900 text-stone-100 border border-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed selection:bg-amber-900/50"
                spellCheck={false}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={runCodeTask}
                className="py-2 px-5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm"
              >
                <Code2 className="w-4 h-4" />
                <span>Kodni Ishga Tushirish</span>
              </button>
            </div>

            {/* Code Output Terminal */}
            {codeOutput && (
              <div className="space-y-1">
                <div className="text-xs font-mono text-stone-500">Chiqish Terminali:</div>
                <pre
                  className={`p-3 rounded-lg text-xs font-mono whitespace-pre-wrap ${
                    codeTaskPassed
                      ? 'bg-emerald-950/20 text-emerald-800 border border-emerald-300'
                      : 'bg-stone-900 text-stone-200 border border-stone-700'
                  }`}
                >
                  {codeOutput}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Completion Footer Card */}
      <div className="p-6 glass-panel rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-stone-300/80">
        <div>
          <h4 className="text-sm font-semibold text-stone-900 font-serif">
            Darsni yakunlash va XP ballarini qo'shish
          </h4>
          <p className="text-xs text-stone-600">
            Dars mazmunini ko'rib chiqib, test yoki mashqlarni bajarganingizdan so'ng yakunlang.
          </p>
        </div>

        <button
          onClick={() => onComplete(lesson.id, lesson.xpReward)}
          className="py-2.5 px-6 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{isCompleted ? "Qayta yakunlash (+10 XP)" : `Darsni Yakunlash (+${lesson.xpReward} XP)`}</span>
        </button>
      </div>
    </div>
  );
};
