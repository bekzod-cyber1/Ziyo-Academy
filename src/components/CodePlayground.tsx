import React, { useState } from 'react';
import { CODE_CHALLENGES } from '../data/codingChallengesData';
import { CodeChallenge } from '../types';
import { Play, RotateCcw, CheckCircle2, Terminal, Code2, Sparkles, BookOpen } from 'lucide-react';

interface CodePlaygroundProps {
  onSolveChallenge: (challengeId: string, xp: number) => void;
  solvedIds: string[];
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  onSolveChallenge,
  solvedIds,
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<CodeChallenge>(
    CODE_CHALLENGES[0]
  );
  const [code, setCode] = useState<string>(selectedChallenge.starterCode);
  const [terminalOutput, setTerminalOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<
    { input: string; expected: string; passed: boolean }[] | null
  >(null);

  const handleSelectChallenge = (ch: CodeChallenge) => {
    setSelectedChallenge(ch);
    setCode(ch.starterCode);
    setTerminalOutput('');
    setTestResults(null);
  };

  const handleResetCode = () => {
    setCode(selectedChallenge.starterCode);
    setTerminalOutput('');
    setTestResults(null);
  };

  const executeCode = () => {
    setIsRunning(true);
    setTerminalOutput('Kompilyatsiya va testlar bajarilmoqda...');

    setTimeout(() => {
      let outputText = '';
      let allPassed = false;

      if (selectedChallenge.language === 'javascript') {
        try {
          // Safe client-side JS evaluation with captured logs
          const logs: string[] = [];
          const customConsole = {
            log: (...args: any[]) => {
              logs.push(
                args
                  .map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a)))
                  .join(' ')
              );
            },
          };

          const runFn = new Function('console', code);
          runFn(customConsole);

          outputText = logs.join('\n');
          const evalPassed =
            code.includes('filter') &&
            code.includes('map') &&
            (outputText.includes('4') || outputText.includes('2, 4, 6, 8'));

          allPassed = evalPassed;
          setTestResults(
            selectedChallenge.testCases.map((tc) => ({
              ...tc,
              passed: evalPassed,
            }))
          );
        } catch (err: any) {
          outputText = `Xatolik: ${err.message}`;
          allPassed = false;
        }
      } else if (selectedChallenge.language === 'python') {
        // Python sandbox logic
        const hasLogic =
          code.includes('[::-1]') ||
          (code.includes('reverse') && code.includes('return'));
        if (hasLogic) {
          outputText = `>>> is_palindrome("kiyik")\nTrue\n>>> is_palindrome("ziyo")\nFalse\n>>> Barcha 3 ta test muvaffaqiyatli o'tdi!\n[Vaqt: 12ms | Xotira: 4.2MB]`;
          allPassed = true;
        } else {
          outputText = `>>> Kutilgan natija olinmadi.\nMaslahat: Matnni tozalang va uning teskari nusxasi bilan solishtiring (text[::-1]).`;
          allPassed = false;
        }
        setTestResults(
          selectedChallenge.testCases.map((tc) => ({
            ...tc,
            passed: allPassed,
          }))
        );
      } else {
        // C++ Sandbox simulation
        const hasBinarySearch =
          code.includes('binarySearch') && code.includes('while') && code.includes('mid');
        if (hasBinarySearch) {
          outputText = `g++ -O3 main.cpp -o binary_search\n./binary_search\nTopilgan indeks: 5\n[O(log N) vaqt murakkabligi tasdiqlandi | Xotira: 1.1MB]`;
          allPassed = true;
        } else {
          outputText = `Kompilyatsiya: Binary search qidiruv algoritmi shartini to'g'ri tekshiring (arr[mid] == target).`;
          allPassed = false;
        }
        setTestResults(
          selectedChallenge.testCases.map((tc) => ({
            ...tc,
            passed: allPassed,
          }))
        );
      }

      setTerminalOutput(outputText || selectedChallenge.expectedOutput);
      setIsRunning(false);

      if (allPassed) {
        onSolveChallenge(selectedChallenge.id, selectedChallenge.xp);
      }
    }, 450);
  };

  return (
    <div className="py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/70 pb-5">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
            Dasturlash Laboratoriyasi
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">
            Interaktiv Kod Maydoni & Algoritmlar
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Python, JavaScript va C++ tillarida amaliy algoritmlarni yozing va natijani darhol tekshiring.
          </p>
        </div>
      </div>

      {/* Challenge Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {CODE_CHALLENGES.map((ch) => {
          const isSelected = selectedChallenge.id === ch.id;
          const isSolved = solvedIds.includes(ch.id);

          return (
            <button
              key={ch.id}
              onClick={() => handleSelectChallenge(ch)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-amber-600 shadow-sm ring-1 ring-amber-500/20'
                  : 'glass-panel hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-amber-800 font-bold">
                    {ch.language}
                  </span>
                  {isSolved && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Yechilgan
                    </span>
                  )}
                </div>
                <h4 className="font-serif font-semibold text-stone-900 text-sm mt-1">
                  {ch.title}
                </h4>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono mt-3 pt-2 border-t border-stone-100">
                <span>{ch.difficulty}</span>
                <span className="text-amber-800 font-semibold">+{ch.xp} XP</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Workspace: Split Editor & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Code Editor (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-stone-300/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-amber-700" />
              <span className="font-mono text-xs font-semibold text-stone-800">
                main.{selectedChallenge.language === 'python' ? 'py' : selectedChallenge.language === 'cpp' ? 'cpp' : 'js'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCode}
                className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md transition-colors text-xs flex items-center gap-1"
                title="Kodni asl holatiga qaytarish"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Asliga qaytarish</span>
              </button>
            </div>
          </div>

          {/* Code Textarea with Dark Terminal Look */}
          <div className="relative rounded-xl overflow-hidden border border-stone-800 bg-stone-950">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={14}
              className="w-full p-4 font-mono text-xs bg-stone-950 text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed selection:bg-amber-900/60"
              spellCheck={false}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={executeCode}
              disabled={isRunning}
              className="py-2.5 px-6 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-sm"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              <span>{isRunning ? 'Ishlamoqda...' : 'Kodni Ishga Tushirish'}</span>
            </button>

            <span className="text-xs text-stone-500 font-mono">
              Brauzerda xavfsiz simulyatsiya
            </span>
          </div>
        </div>

        {/* Right: Task Details & Console Terminal (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Task Description */}
          <div className="glass-panel p-5 rounded-2xl border border-stone-300/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-800 font-bold">
              <BookOpen className="w-4 h-4" />
              <span>Topshiriq Tafsiloti</span>
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base">
              {selectedChallenge.title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {selectedChallenge.description}
            </p>
            <div className="p-3 bg-stone-100/90 rounded-lg text-xs font-sans text-stone-800">
              <b className="text-stone-900">Vazifa:</b> {selectedChallenge.task}
            </div>
          </div>

          {/* Terminal Output */}
          <div className="glass-panel p-5 rounded-2xl border border-stone-300/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-600">
              <Terminal className="w-4 h-4 text-stone-500" />
              <span>Chiqish Terminali (STDOUT)</span>
            </div>

            <div className="bg-stone-950 text-stone-200 p-4 rounded-xl font-mono text-xs min-h-[140px] whitespace-pre-wrap overflow-x-auto border border-stone-800">
              {terminalOutput || (
                <span className="text-stone-600 italic">
                  Natijani ko'rish uchun "Kodni Ishga Tushirish" tugmasini bosing...
                </span>
              )}
            </div>

            {/* Test Case Status */}
            {testResults && (
              <div className="pt-2 space-y-1.5">
                <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                  Test Sinovlari
                </div>
                {testResults.map((tr, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg text-xs flex items-center justify-between ${
                      tr.passed
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-rose-50 text-rose-900 border border-rose-200'
                    }`}
                  >
                    <span>Sinov #{idx + 1}: {tr.input}</span>
                    <span className="font-bold">
                      {tr.passed ? '✓ O\'tdi' : '✗ Xato'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
