import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing with security limit
app.use(express.json({ limit: '1mb' }));

// Server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

const SYSTEM_INSTRUCTION = `Siz "Ziyo Academy" ta'lim platformasining aqlli, tezkor, do'stona va jonli sun'iy intellekt murabbiysisiz (Ziyo AI Murabbiy).

Asosiy xususiyatlaringiz:
1. TEZKOR VA LO'NDA: Oddiy savollar va hol-ahvol so'rashlarga qisqa, samimiy, tez va tabiiy javob bering. Keraksiz uzun rasmiyatchilik qilmang.
2. ODDIY SUHBATLAR: Oddiy kundalik suhbatlarni (salomlashish, hazil, kayfiyat, kundalik hayot, motivatsiya) xuddi haqiqiy do'stona ustozdek erkin va samimiy olib boring.
3. KENG BILIM: Xorijiy tillar (Ingliz tili A1-C1, Rus, Turk, Nemis, Fransuz, Koreys, Ispan) va dasturlash (Python, JavaScript, C++, Algoritmlar) bo'yicha har qanday murakkab savollarga aniq, sodda misollar bilan tushuntiring.
4. TIL: Foydalanuvchi qaysi tilda murojaat qilsa (O'zbek, Rus, Ingliz, Turk va h.k.), o'sha tilda ravon javob bering.`;

// Quick friendly responses for instant chit-chat when offline or for instant latency
const FAST_CHIT_CHAT: Record<string, string> = {
  salom: "Salom! Kayfiyatingiz yaxshimi? Bugun qaysi til yoki dasturlash mavzusida suhbatlashamiz?",
  "assalomu alaykum": "Vaalaykum assalom! Xush kelibsiz. Bugun nimani o'rganishni yoki qanday savolni ko'rib chiqishni xohlaysiz?",
  qalaysan: "Ajoyib, rahmat! O'zingizda nima yangiliklar? O'qishlar, mashqlar qanday ketyapti?",
  "ishlar qalay": "Hammasi a'lo darajada! Sizda darslar va maqsadlar qanday boryapti?",
  rahmat: "Arzimaydi, doimo xursandman! Yana biror savol yoki mavzu bo'lsa, bemalol so'rang.",
  raxmat: "Arzimaydi! Har doim yordam berishga tayyorman.",
  "sen kimsan": "Men Ziyo Academy'ning AI Murabbiysiman — tillar, dasturlash va har qanday savolingiz bo'yicha do'stona yordamchingizman!",
  "isming nima": "Mening ismim Ziyo AI Murabbiy. Qisqacha Ziyo deb chaqirishingiz mumkin!",
};

// ==================== STREAMING ENDPOINT FOR ULTRA-FAST RESPONSES ====================
app.post('/api/ai/stream', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Xabar matni kiritilishi shart.' });
    }

    const cleanMsg = message.trim();
    const lowerMsg = cleanMsg.toLowerCase().replace(/[?!.,]/g, '').trim();

    // Check fast chit-chat instant cache
    if (FAST_CHIT_CHAT[lowerMsg]) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders?.();

      const reply = FAST_CHIT_CHAT[lowerMsg];
      res.write(`data: ${JSON.stringify({ text: reply })}\n\n`);
      res.write('data: [DONE]\n\n');
      return res.end();
    }

    // SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    if (ai) {
      // Build conversation contents with history
      const formattedContents: any[] = [];

      if (Array.isArray(history)) {
        for (const h of history.slice(-6)) {
          // Keep last 6 exchanges for tight context
          if (h.sender === 'user') {
            formattedContents.push({ role: 'user', parts: [{ text: h.text }] });
          } else if (h.sender === 'ai') {
            formattedContents.push({ role: 'model', parts: [{ text: h.text }] });
          }
        }
      }

      // Add current message
      formattedContents.push({ role: 'user', parts: [{ text: cleanMsg }] });

      const stream = await ai.models.generateContentStream({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }, // Minimal latency
          temperature: 0.7,
        },
      });

      for await (const chunk of stream) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } else {
      // Fallback response streamed
      const fallbackReply = `Salom! Savolingizni oldim: "${cleanMsg}".\n\nPlatformamizdagi darsliklar va lug'at mashqlaridan erkin foydalanishingiz mumkin.`;
      res.write(`data: ${JSON.stringify({ text: fallbackReply })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
    }
  } catch (err: any) {
    console.error('Error in /api/ai/stream:', err);
    res.write(
      `data: ${JSON.stringify({ text: "Kechirasiz, aloqada uzilish bo'ldi. Iltimos qaytadan urinib ko'ring." })}\n\n`
    );
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

// Non-streaming fallback endpoint with ThinkingLevel.LOW
app.post('/api/ai/ask', async (req: Request, res: Response) => {
  try {
    const { question, history } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Savol matni kiritilishi shart.' });
    }

    const cleanMsg = question.trim();
    const lowerMsg = cleanMsg.toLowerCase().replace(/[?!.,]/g, '').trim();

    if (FAST_CHIT_CHAT[lowerMsg]) {
      return res.json({ reply: FAST_CHIT_CHAT[lowerMsg] });
    }

    if (ai) {
      const formattedContents: any[] = [];
      if (Array.isArray(history)) {
        for (const h of history.slice(-6)) {
          if (h.sender === 'user') {
            formattedContents.push({ role: 'user', parts: [{ text: h.text }] });
          } else if (h.sender === 'ai') {
            formattedContents.push({ role: 'model', parts: [{ text: h.text }] });
          }
        }
      }
      formattedContents.push({ role: 'user', parts: [{ text: cleanMsg }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }, // Minimal latency
          temperature: 0.7,
        },
      });

      return res.json({ reply: response.text || "Savol bo'yicha javob tayyorlandi." });
    } else {
      return res.json({
        reply: `Ziyo AI Murabbiy: "${cleanMsg}" savolingiz qabul qilindi! Darsliklarimiz va mashqlar orqali bilimingizni mustahkamlashingiz mumkin.`,
      });
    }
  } catch (error: any) {
    console.error('Error in /api/ai/ask:', error);
    return res.status(500).json({
      error: "AI xizmati bilan bog'lanishda xatolik yuz berdi.",
      details: error.message,
    });
  }
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
