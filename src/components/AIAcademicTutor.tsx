import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Volume2,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Smile,
  RotateCcw,
} from 'lucide-react';
import { playPronunciation } from '../utils/speech';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const CASUAL_AND_ACADEMIC_CHIPS = [
  "Salom, qalaysiz? Bugun nima o'rganamiz?",
  "Menga biroz motivatsiya bera olasizmi?",
  "Ingliz tilida C1 Inversion qoidasi",
  "Rus tilida Harakat fe'llari (Идти vs Ходить)",
  "Turkchada unlilar uyg'unligi nima?",
  "Pythonda oddiy funksiya qanday yoziladi?",
];

export const AIAcademicTutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "Salom! Men Ziyo AI Murabbiyman — sizning shaxsiy ustozingiz va do'stingiz.\n\nSiz bilan oddiy samimiy suhbatlashishdan tortib, xorijiy tillar (Ingliz tili A1-C1, Rus, Turk, Nemis, Fransuz, Koreys) va dasturlash (Python, JavaScript, C++) bo'yicha har qanday savolingizga bir zumda javob berishga tayyorman. Qanday mavzuda gaplashamiz?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputText).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    const aiMsgId = `ai-${Date.now()}`;
    const aiPlaceholder: ChatMessage = {
      id: aiMsgId,
      sender: 'ai',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Pre-insert streaming AI message
    setMessages((prev) => [...prev, aiPlaceholder]);

    try {
      // Stream response from server-side endpoint (/api/ai/stream)
      const res = await fetch('/api/ai/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: newHistory.slice(-8), // Send recent conversation context
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);
      }

      if (res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let accumulatedText = '';
        let done = false;

        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = streamDone;

          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const dataPayload = line.replace('data: ', '').trim();
                if (dataPayload === '[DONE]') {
                  done = true;
                  break;
                }
                try {
                  const parsed = JSON.parse(dataPayload);
                  if (parsed.text) {
                    accumulatedText += parsed.text;
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === aiMsgId ? { ...m, text: accumulatedText } : m
                      )
                    );
                  }
                } catch {
                  // Skip parse errors on partial chunks
                }
              }
            }
          }
        }

        // If for some reason accumulatedText was empty, fallback
        if (!accumulatedText.trim()) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMsgId
                ? {
                    ...m,
                    text: "Savolingiz qabul qilindi! Saytimizdagi darslik va mashqlarni ko'rib chiqishingiz mumkin.",
                  }
                : m
            )
          );
        }
      }
    } catch (err: any) {
      console.warn('Streaming fallback triggered:', err);
      // Fallback to fast /api/ai/ask endpoint
      try {
        const fallbackRes = await fetch('/api/ai/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: textToSend, history: newHistory.slice(-6) }),
        });
        const fallbackData = await fallbackRes.json();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgId
              ? { ...m, text: fallbackData.reply || 'Javob tayyorlandi.' }
              : m
          )
        );
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgId
              ? {
                  ...m,
                  text: 'Salom! Siz bilan suhbatlashishdan mamnunman. Qanday savolingiz bor?',
                }
              : m
          )
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeakText = (text: string) => {
    const clean = text.replace(/[*#`_]/g, '').slice(0, 250);
    playPronunciation(clean, 'uz-UZ');
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: "Suhbat tarixi yangilandi! Qanday yangi mavzu yoki savolni muhokama qilamiz?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="py-6 space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/70 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-800 font-bold">
            <Zap className="w-4 h-4 text-amber-600 fill-amber-500/20" />
            <span>Tezkor Sun'iy Intellekt · Jonli Streaming</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">
            Ziyo AI Murabbiy va Jonli Suhbatdosh
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Oddiy samimiy muloqotdan tortib, murakkab tillar va dasturlash
            masalalarigacha — barcha savollarga soniyalar ichida tez javob oling.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-1 text-stone-500 hover:text-stone-900 transition-colors"
            title="Suhbat tarixini tozalash"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Yangi suhbat</span>
          </button>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="flex items-center gap-1 text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Himoyalangan API</span>
          </span>
        </div>
      </div>

      {/* Suggested Quick Chips */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-500 uppercase tracking-wider">
          <Smile className="w-3.5 h-3.5 text-amber-700" />
          <span>Tezkor Savol va Suhbat Mavzulari:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {CASUAL_AND_ACADEMIC_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              disabled={isLoading}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-stone-100 border border-stone-300/80 text-stone-800 whitespace-nowrap transition-colors shadow-2xs shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="glass-panel rounded-2xl border border-stone-300/80 overflow-hidden flex flex-col h-[540px]">
        {/* Messages Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isCurrentStreaming =
              msg.id.startsWith('ai-') && !msg.text && isLoading;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 items-start ${
                  isUser ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-stone-900 text-white'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-stone-900 text-stone-100 rounded-tr-xs'
                      : 'bg-white border border-stone-200 text-stone-800 rounded-tl-xs shadow-2xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text ? (
                      msg.text
                    ) : isCurrentStreaming ? (
                      <span className="flex items-center gap-1.5 text-stone-400 font-mono italic">
                        <span className="inline-block w-2 h-2 rounded-full bg-amber-600 animate-ping" />
                        Javob yozilmoqda...
                      </span>
                    ) : null}
                  </div>

                  {/* Actions & Timestamp */}
                  {msg.text && (
                    <div
                      className={`flex items-center justify-between gap-4 mt-2 pt-2 border-t text-[10px] font-mono ${
                        isUser
                          ? 'border-stone-800 text-stone-400'
                          : 'border-stone-100 text-stone-400'
                      }`}
                    >
                      <span>{msg.timestamp}</span>

                      {!isUser && (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleSpeakText(msg.text)}
                            className="hover:text-stone-900 transition-colors flex items-center gap-1"
                            title="Ovoz chiqarib o'qish"
                          >
                            <Volume2 className="w-3 h-3 text-amber-700" />
                            <span>Tinglash</span>
                          </button>
                          <button
                            onClick={() => handleCopyText(msg.id, msg.text)}
                            className="hover:text-stone-900 transition-colors flex items-center gap-1"
                            title="Nusxalash"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>{copiedId === msg.id ? 'Nusxalandi' : 'Nusxa'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white/90 border-t border-stone-200/80 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Salom bering, savol so'rang yoki kundalik suhbat quring..."
            disabled={isLoading}
            className="flex-1 p-3 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="py-3 px-5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Yuborish</span>
          </button>
        </div>
      </div>
    </div>
  );
};
