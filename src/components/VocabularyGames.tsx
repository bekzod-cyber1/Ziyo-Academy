import React, { useState, useEffect } from 'react';
import { VocabWord } from '../types';
import { VOCABULARY_DATABASE } from '../data/vocabularyData';
import {
  Volume2,
  RotateCw,
  Check,
  X,
  Trophy,
  Flame,
  ArrowRight,
  Headphones,
  Zap,
  Sparkles,
} from 'lucide-react';
import { playPronunciation } from '../utils/speech';

interface VocabularyGamesProps {
  onAddMasteredVocab: (wordId: string) => void;
  masteredVocabIds: string[];
}

export const VocabularyGames: React.FC<VocabularyGamesProps> = ({
  onAddMasteredVocab,
  masteredVocabIds,
}) => {
  const [activeGame, setActiveGame] = useState<'flashcards' | 'match' | 'listening' | 'quiz'>(
    'flashcards'
  );
  const [selectedLang, setSelectedLang] = useState<string>('all');

  // Filtered vocabulary list
  const filteredWords = VOCABULARY_DATABASE.filter((w) => {
    if (selectedLang === 'all') return true;
    if (selectedLang === 'en') return w.langCode === 'en-US' && !w.id.includes('code');
    if (selectedLang === 'ru') return w.langCode === 'ru-RU';
    if (selectedLang === 'de') return w.langCode === 'de-DE';
    if (selectedLang === 'es') return w.langCode === 'es-ES';
    if (selectedLang === 'prog') return w.id.includes('code');
    return true;
  });

  // ==================== GAME 1: FLASHCARDS ====================
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const currentCard = filteredWords[cardIndex] || filteredWords[0];

  const handleNextCard = (known: boolean) => {
    if (known && currentCard) {
      onAddMasteredVocab(currentCard.id);
    }
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % filteredWords.length);
  };

  const handleSpeakWord = (word: VocabWord) => {
    playPronunciation(word.word, word.langCode, 0.9);
  };

  // ==================== GAME 2: WORD MATCH ====================
  interface MatchTile {
    id: string;
    text: string;
    pairId: string;
    isMatched: boolean;
    type: 'word' | 'translation';
  }

  const [matchTiles, setMatchTiles] = useState<MatchTile[]>([]);
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);
  const [matchScore, setMatchScore] = useState<number>(0);

  const initMatchGame = () => {
    const subset = [...filteredWords].sort(() => 0.5 - Math.random()).slice(0, 6);
    const tiles: MatchTile[] = [];
    subset.forEach((w) => {
      tiles.push({
        id: `w-${w.id}`,
        text: w.word,
        pairId: w.id,
        isMatched: false,
        type: 'word',
      });
      tiles.push({
        id: `t-${w.id}`,
        text: w.translation,
        pairId: w.id,
        isMatched: false,
        type: 'translation',
      });
    });
    setMatchTiles(tiles.sort(() => 0.5 - Math.random()));
    setSelectedTileId(null);
    setMatchedPairsCount(0);
    setMatchScore(0);
  };

  useEffect(() => {
    if (activeGame === 'match') {
      initMatchGame();
    }
  }, [activeGame, selectedLang]);

  const handleTileClick = (tile: MatchTile) => {
    if (tile.isMatched) return;

    if (!selectedTileId) {
      setSelectedTileId(tile.id);
      if (tile.type === 'word') {
        const found = VOCABULARY_DATABASE.find((v) => v.id === tile.pairId);
        if (found) playPronunciation(found.word, found.langCode);
      }
      return;
    }

    if (selectedTileId === tile.id) {
      setSelectedTileId(null);
      return;
    }

    const firstTile = matchTiles.find((t) => t.id === selectedTileId);
    if (!firstTile) return;

    if (firstTile.pairId === tile.pairId && firstTile.type !== tile.type) {
      // Match success!
      setMatchTiles((prev) =>
        prev.map((t) =>
          t.pairId === tile.pairId ? { ...t, isMatched: true } : t
        )
      );
      setMatchedPairsCount((c) => c + 1);
      setMatchScore((s) => s + 50);
      onAddMasteredVocab(tile.pairId);
      setSelectedTileId(null);
    } else {
      // Wrong match
      setSelectedTileId(null);
    }
  };

  // ==================== GAME 3: LISTENING & SPELLING ====================
  const [listenIndex, setListenIndex] = useState<number>(0);
  const [userSpelling, setUserSpelling] = useState<string>('');
  const [listenFeedback, setListenFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const currentListenWord = filteredWords[listenIndex] || filteredWords[0];

  const handlePlayListening = () => {
    if (!currentListenWord) return;
    playPronunciation(currentListenWord.word, currentListenWord.langCode, 0.85);
  };

  const handleCheckSpelling = () => {
    if (!currentListenWord) return;
    const cleanUser = userSpelling.trim().toLowerCase();
    const cleanTarget = currentListenWord.word.trim().toLowerCase();
    if (cleanUser === cleanTarget) {
      setListenFeedback('correct');
      onAddMasteredVocab(currentListenWord.id);
    } else {
      setListenFeedback('wrong');
    }
  };

  const handleNextListening = () => {
    setUserSpelling('');
    setListenFeedback('idle');
    setListenIndex((prev) => (prev + 1) % filteredWords.length);
  };

  return (
    <div className="py-6 space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/70 pb-5">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
            Fonetik & Leksik O'yinlar
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">
            Qiziqarli Lug'at O'yinlari va Talaffuz
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Xotirani mustahkamlovchi kartochkalar, tezkor juftliklar va audio eshitish mashqlari.
          </p>
        </div>

        {/* Language Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'en', label: 'Inglizcha' },
            { id: 'ru', label: 'Ruscha' },
            { id: 'de', label: 'Nemischa' },
            { id: 'es', label: 'Ispancha' },
            { id: 'prog', label: 'Dasturlash' },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setSelectedLang(l.id);
                setCardIndex(0);
                setListenIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedLang === l.id
                  ? 'bg-stone-900 text-stone-50'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Game Mode Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveGame('flashcards')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeGame === 'flashcards'
              ? 'bg-white border-amber-600/80 shadow-sm ring-1 ring-amber-500/20'
              : 'glass-panel hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-amber-800 font-bold uppercase">
              1-Rejim
            </span>
            <RotateCw className="w-4 h-4 text-stone-400" />
          </div>
          <div className="font-serif font-semibold text-stone-900 text-base mt-2">
            Lug'at Kartochkalari
          </div>
          <div className="text-xs text-stone-500 mt-1">
            3D aylanuvchi kartalar va audio talaffuz
          </div>
        </button>

        <button
          onClick={() => setActiveGame('match')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeGame === 'match'
              ? 'bg-white border-amber-600/80 shadow-sm ring-1 ring-amber-500/20'
              : 'glass-panel hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-amber-800 font-bold uppercase">
              2-Rejim
            </span>
            <Zap className="w-4 h-4 text-stone-400" />
          </div>
          <div className="font-serif font-semibold text-stone-900 text-base mt-2">
            So'z Juftligi (Speed Match)
          </div>
          <div className="text-xs text-stone-500 mt-1">
            Tezlikda tarjimalarni topib birlashtiring
          </div>
        </button>

        <button
          onClick={() => setActiveGame('listening')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeGame === 'listening'
              ? 'bg-white border-amber-600/80 shadow-sm ring-1 ring-amber-500/20'
              : 'glass-panel hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-amber-800 font-bold uppercase">
              3-Rejim
            </span>
            <Headphones className="w-4 h-4 text-stone-400" />
          </div>
          <div className="font-serif font-semibold text-stone-900 text-base mt-2">
            Eshitish & Yozish
          </div>
          <div className="text-xs text-stone-500 mt-1">
            Talaffuzni tinglab, to'g'ri imloda yozing
          </div>
        </button>
      </div>

      {/* ===================== GAME 1 DISPLAY: FLASHCARDS ===================== */}
      {activeGame === 'flashcards' && currentCard && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>
              Kartochka {cardIndex + 1} / {filteredWords.length}
            </span>
            <span>{currentCard.category || 'Mavzu'} · {currentCard.level}</span>
          </div>

          {/* Interactive Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[290px] rounded-2xl p-8 bg-white border border-stone-300/80 shadow-sm cursor-pointer select-none transition-all flex flex-col justify-between hover:border-amber-400"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400">
                {isFlipped ? "O'zbekcha Tarjimasi" : "Asl So'z (Bosib aylantiring)"}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeakWord(currentCard);
                }}
                className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-full border border-amber-200 transition-colors"
                title="Talaffuzni tinglash"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center py-6 space-y-2">
              {!isFlipped ? (
                <>
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                    {currentCard.word}
                  </div>
                  {currentCard.transcription && (
                    <div className="text-sm font-mono text-stone-500">
                      {currentCard.transcription}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-950">
                    {currentCard.translation}
                  </div>
                  <div className="text-xs text-stone-600 max-w-sm mx-auto pt-2 italic">
                    "{currentCard.exampleSentence}"
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {currentCard.exampleTranslation}
                  </div>
                </>
              )}
            </div>

            <div className="text-center text-[11px] text-stone-400 font-sans">
              Kartani ko'rish uchun bosing ↻
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNextCard(false)}
              className="flex-1 py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCw className="w-4 h-4" />
              <span>Qaytarish kerak</span>
            </button>
            <button
              onClick={() => handleNextCard(true)}
              className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Bilaman (+15 XP)</span>
            </button>
          </div>
        </div>
      )}

      {/* ===================== GAME 2 DISPLAY: WORD MATCH ===================== */}
      {activeGame === 'match' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-stone-600 glass-panel p-3 rounded-lg">
            <span className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-600" />
              To'plangan ball: <b className="text-stone-900">{matchScore}</b>
            </span>
            <span>
              Juftliklar: <b className="text-amber-800">{matchedPairsCount} / 6</b>
            </span>
            <button
              onClick={initMatchGame}
              className="text-stone-500 hover:text-stone-900 underline"
            >
              Qayta boshlash
            </button>
          </div>

          {matchedPairsCount === 6 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-emerald-300 shadow-sm space-y-4">
              <Sparkles className="w-10 h-10 text-amber-600 mx-auto" />
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Ajoyib Natija! Barcha juftliklar topildi.
              </h3>
              <p className="text-xs text-stone-600">
                Siz tezkor xotira mashqini muvaffaqiyatli yakunladingiz (+300 XP).
              </p>
              <button
                onClick={initMatchGame}
                className="py-2.5 px-6 bg-stone-900 text-white rounded-lg text-xs font-semibold"
              >
                Keyingi Bosqich
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {matchTiles.map((tile) => {
                const isSelected = selectedTileId === tile.id;
                return (
                  <button
                    key={tile.id}
                    onClick={() => handleTileClick(tile)}
                    disabled={tile.isMatched}
                    className={`p-4 rounded-xl text-xs font-medium border text-center transition-all min-h-[75px] flex items-center justify-center ${
                      tile.isMatched
                        ? 'opacity-25 bg-stone-100 border-stone-200 cursor-not-allowed'
                        : isSelected
                        ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold shadow-sm scale-102'
                        : 'bg-white hover:bg-stone-50 border-stone-300 text-stone-800 shadow-xs'
                    }`}
                  >
                    <span>{tile.text}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ===================== GAME 3 DISPLAY: LISTENING & SPELLING ===================== */}
      {activeGame === 'listening' && currentListenWord && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-stone-300/80 space-y-6">
            <div className="text-center space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
                Audio Talaffuz Mashqi
              </div>
              <button
                onClick={handlePlayListening}
                className="mx-auto w-16 h-16 rounded-full bg-amber-700 hover:bg-amber-800 text-white flex items-center justify-center transition-all hover:scale-105 shadow-md"
                title="Audioni tinglash"
              >
                <Volume2 className="w-8 h-8" />
              </button>
              <p className="text-xs text-stone-500">
                Yuqoridagi tugmani bosing va eshitilgan so'zni yozing.
              </p>
            </div>

            {/* Input field */}
            <div className="space-y-3">
              <input
                type="text"
                value={userSpelling}
                onChange={(e) => {
                  setUserSpelling(e.target.value);
                  setListenFeedback('idle');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCheckSpelling();
                }}
                placeholder="Eshitilgan so'zni kiriting..."
                className="w-full p-3.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-center font-medium"
              />

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCheckSpelling}
                  disabled={!userSpelling.trim()}
                  className="flex-1 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Tekshirish
                </button>
                <button
                  onClick={handleNextListening}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>Keyingisi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Feedback alert */}
            {listenFeedback === 'correct' && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs space-y-1 text-emerald-900">
                <div className="font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Barakalla! To'g'ri yozildi.
                </div>
                <div>Ma'nosi: {currentListenWord.translation}</div>
                <div className="text-stone-500 italic">
                  "{currentListenWord.exampleSentence}"
                </div>
              </div>
            )}

            {listenFeedback === 'wrong' && (
              <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl text-xs space-y-1 text-rose-900">
                <div className="font-bold flex items-center gap-1.5">
                  <X className="w-4 h-4 text-rose-600" />
                  Xatolik bor. Qaytadan tinglang.
                </div>
                <div>To'g'ri yozilishi: <span className="font-mono font-bold">{currentListenWord.word}</span></div>
                <div>Tarjimasi: {currentListenWord.translation}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
