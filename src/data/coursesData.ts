import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'english-b2',
    name: 'Ingliz Tili (A1 - C1)',
    originalName: 'English Polyglot Mastery',
    category: 'english',
    flag: '🇬🇧',
    description: "Noldan boshlab xalqaro C1 mustaqil ravon gaplashish darajasigacha bo'lgan chuqur grammatika va real muloqot darslari.",
    maxLevel: 'C1',
    totalLessons: 15,
    estimatedHours: 85,
    lessons: [
      {
        id: 'eng-a1-1',
        courseId: 'english-b2',
        level: 'A1',
        order: 1,
        title: 'Fonetika, Salomlashish va Shaxs Olmoshlari',
        subtitle: 'Ingliz tilida to\'g\'ri talaffuz va kundalik tanishuv formulasi',
        durationMinutes: 18,
        xpReward: 50,
        overview: "Ushbu darsda siz ingliz tilidagi asosiy unli va undosh tovushlar, salomlashish turlari hamda shaxs olmoshlari (I, you, he, she, it, we, they)ni o'rganasiz.",
        grammarRules: [
          {
            title: "1. Shaxs olmoshlari (Subject Pronouns)",
            description: "Gapda harakatni bajaruvchi shaxsni ifodalaydi. Ingliz tilida ega (subject) doimo gap boshida kelishi shart.",
            formula: "Pronoun + Verb + Complement",
            examples: [
              { target: "I am a student.", uzbek: "Men talabaman.", notes: "I doimo katta harf bilan yoziladi." },
              { target: "She lives in Tashkent.", uzbek: "U Toshkentda yashaydi.", notes: "3-shaxs birlikda fe'lga -s qo'shiladi." },
              { target: "They speak English fluently.", uzbek: "Ular inglizcha ravon gaplashishadi." },
            ],
          },
          {
            title: "2. Rasmiy va Norasmiy Salomlashish",
            description: "Vaqtga qarab to'g'ri salomlashish madaniyati suhbatdoshda ijobiy taassurot qoldiradi.",
            examples: [
              { target: "Good morning / Good afternoon / Good evening", uzbek: "Xayrli tong / Xayrli kun / Xayrli oqshom (Rasmiy)" },
              { target: "How do you do? — Pleased to meet you.", uzbek: "Ahvollaringiz qalay? — Siz bilan tanishganimdan mamnunman." },
            ],
          },
        ],
        dialogue: [
          { speaker: "John", text: "Hello! My name is John. What is your name?", translation: "Salom! Mening ismim Jon. Sizning ismingiz nima?" },
          { speaker: "Aziza", text: "Nice to meet you, John! I am Aziza from Uzbekistan.", translation: "Tanishganimdan xursandman, Jon! Men O'zbekistondan Azizaman." },
          { speaker: "John", text: "Pleased to meet you, Aziza! Welcome to our team.", translation: "Siz bilan tanishganimdan shodman, Aziza! Jamoamizga xush kelibsiz." },
        ],
        vocabulary: [
          { id: 'eng-1', word: 'Greeting', transcription: '/ˈɡriː.tɪŋ/', translation: 'Salomlashish', langCode: 'en-US', exampleSentence: 'A polite greeting starts every conversation.', exampleTranslation: 'Xushmuomala salomlashish har bir suhbatni boshlaydi.', level: 'A1' },
          { id: 'eng-2', word: 'Fluent', transcription: '/ˈfluː.ənt/', translation: 'Ravon, erkin', langCode: 'en-US', exampleSentence: 'He speaks three languages fluently.', exampleTranslation: 'U uchta tilda ravon gapiradi.', level: 'A1' },
          { id: 'eng-3', word: 'Welcome', transcription: '/ˈwel.kəm/', translation: 'Xush kelibsiz', langCode: 'en-US', exampleSentence: 'Welcome to our international academy.', exampleTranslation: 'Xalqaro akademiyamizga xush kelibsiz.', level: 'A1' },
          { id: 'eng-4', word: 'Colleague', transcription: '/ˈkɒl.iːɡ/', translation: 'Hamkasb', langCode: 'en-US', exampleSentence: 'Meet my new colleague from London.', exampleTranslation: 'Londondan kelgan yangi hamkasbim bilan tanishing.', level: 'A1' },
        ],
        quiz: [
          {
            id: 'q-eng-1',
            question: "Qaysi jumla 'Men O'zbekistondanman' ma'nosini to'g'ri ifodalaydi?",
            options: ["I are from Uzbekistan", "I am from Uzbekistan", "I is from Uzbekistan", "I be from Uzbekistan"],
            correctAnswerIndex: 1,
            explanation: "'I' (men) olmoshi bilan 'to be' fe'lining 'am' shakli qo'llaniladi.",
          },
          {
            id: 'q-eng-2',
            question: "Uchinchi shaxs birlik (he/she/it) uchun qaysi olmosh to'g'ri?",
            options: ["We", "They", "She", "You"],
            correctAnswerIndex: 2,
            explanation: "'She' uchinchi shaxs ayol jinsi uchun birlik olmoshidir.",
          },
        ],
        sentenceExercises: [
          {
            id: 'se-eng-1',
            uzbekSentence: "Siz bilan tanishganimdan juda xursandman.",
            targetSentence: "I am very pleased to meet you.",
            jumbledWords: ["pleased", "I", "to", "am", "you", "very", "meet."],
            explanation: "Ingliz tilida tartib: Ega (I) + Kesim (am) + Sifat (pleased) + To'ldiruvchi.",
          },
        ],
      },
      {
        id: 'eng-a2-1',
        courseId: 'english-b2',
        level: 'A2',
        order: 2,
        title: "Present Simple vs Continuous: Kundalik Odatlar va Hozirgi Harakat",
        subtitle: 'Doimiy odatlar va ayni damda sodir bo\'layotgan hodisalarni solishtirish',
        durationMinutes: 22,
        xpReward: 60,
        overview: "Present Simple (doimiy takrorlanuvchi ishlar) va Present Continuous (ayni damda davom etayotgan harakatlar) o'rtasidagi farqni aniq signallar bilan o'rganamiz.",
        grammarRules: [
          {
            title: "1. Qiyoslash va Kalit So'zlar",
            description: "Present Simple: always, usually, often, every day. Present Continuous: now, right now, at the moment.",
            formula: "Simple: S + V(s) | Continuous: S + am/is/are + V-ing",
            examples: [
              { target: "I read books every evening.", uzbek: "Men har oqshom kitob o'qiyman. (Odat)", notes: "Present Simple" },
              { target: "I am reading an interesting article right now.", uzbek: "Men ayni damda qiziqarli maqola o'qiyapman. (Harakat)", notes: "Present Continuous" },
            ],
          },
          {
            title: "2. State Verbs (Holat fe'llari qoidasi)",
            description: "Know, understand, love, believe kabi his-tuyg'u va aqliy fe'llar odatda -ing shaklida qo'llanilmaydi.",
            examples: [
              { target: "I understand the lesson. (NOT: I am understanding)", uzbek: "Men darsni tushunyapman." },
            ],
          },
        ],
        vocabulary: [
          { id: 'eng-5', word: 'Routine', transcription: '/ruːˈtiːn/', translation: 'Kun tartibi, odat', langCode: 'en-US', exampleSentence: 'My morning routine includes coffee and code.', exampleTranslation: 'Mening ertalabki tartibimga kofe va dasturlash kiradi.', level: 'A2' },
          { id: 'eng-6', word: 'Currently', transcription: '/ˈkʌr.ənt.li/', translation: 'Hozirgi paytda', langCode: 'en-US', exampleSentence: 'She is currently preparing for IELTS.', exampleTranslation: 'U hozirda IELTS imtihoniga tayyorgarlik ko\'rmoqda.', level: 'A2' },
          { id: 'eng-7', word: 'Improve', transcription: '/ɪmˈpruːv/', translation: 'Yaxshilamoq, rivojlantirmoq', langCode: 'en-US', exampleSentence: 'Daily practice will improve your accent.', exampleTranslation: 'Kundalik mashq talaffuzingizni yaxshilaydi.', level: 'A2' },
        ],
        quiz: [
          {
            id: 'q-eng-3',
            question: "To'g'ri variantni tanlang: 'Look! It ___ outside.'",
            options: ["snows", "is snowing", "snowed", "snowing"],
            correctAnswerIndex: 1,
            explanation: "'Look!' buyruq so'zi harakat ayni damda sodir bo'layotganini bildiradi, shuning uchun 'is snowing' to'g'ri.",
          },
        ],
      },
      {
        id: 'eng-b1-1',
        courseId: 'english-b2',
        level: 'B1',
        order: 3,
        title: "Present Perfect vs Past Simple: Hayotiy Tajriba va Aniq Vaqt",
        subtitle: 'Have/has + V3 vositasida natija va tajribalarni professional ifodalash',
        durationMinutes: 25,
        xpReward: 70,
        overview: "O'zbek tilidagi o'tgan zamondan farqli o'laroq, ingliz tilida aniq vaqt ko'rsatilgan va natijasi hozirga bog'liq holatlar ikki xil zamonda aytiladi.",
        grammarRules: [
          {
            title: "1. Present Perfect (Tajriba va natija)",
            description: "Qachon bo'lgani noma'lum yoki muhim emas, eng asosiysi natija hozir ko'rinib turibdi. Kalit so'zlar: ever, never, already, yet, since, for.",
            formula: "Subject + have/has + Past Participle (V3)",
            examples: [
              { target: "I have visited London twice.", uzbek: "Men Londonga ikki marta borganman (hayotiy tajriba).", notes: "Present Perfect" },
              { target: "I visited London in 2022.", uzbek: "Men Londonga 2022-yilda borgan edim (aniq o'tgan vaqt).", notes: "Past Simple" },
            ],
          },
        ],
        vocabulary: [
          { id: 'eng-8', word: 'Accomplishment', transcription: '/əˈkʌm.plɪʃ.mənt/', translation: 'Yutuq, muvaffaqiyat', langCode: 'en-US', exampleSentence: 'Learning B2 English is a major accomplishment.', exampleTranslation: 'B2 darajasida ingliz tilini o\'rganish katta yutuqdir.', level: 'B1' },
          { id: 'eng-9', word: 'Opportunity', transcription: '/ˌɒp.əˈtjuː.nə.ti/', translation: 'Imkoniyat', langCode: 'en-US', exampleSentence: 'Language opens up global career opportunities.', exampleTranslation: 'Til global karyera imkoniyatlarini ochadi.', level: 'B1' },
        ],
        quiz: [
          {
            id: 'q-eng-4',
            question: "Qaysi gapda grammatik xato mavjud emas?",
            options: [
              "I have seen him yesterday.",
              "I saw him yesterday.",
              "I has seen him yesterday.",
              "I did seen him yesterday.",
            ],
            correctAnswerIndex: 1,
            explanation: "'Yesterday' aniq o'tgan zamon signali bo'lgani sababli Past Simple (saw) ishlatiladi.",
          },
        ],
      },
      {
        id: 'eng-b2-1',
        courseId: 'english-b2',
        level: 'B2',
        order: 4,
        title: "Mixed Conditionals, Inversion va Akademik Argumentatsiya",
        subtitle: 'B2 darajasidagi murakkab shart gaplar va rasmiy uslubdagi inversiya',
        durationMinutes: 30,
        xpReward: 90,
        overview: "B2 Upper-Intermediate bosqichida o'tmishdagi farazning bugungi kundagi natijasi (Mixed Conditionals) va ritorik ta'sir kuchaytiruvchi Inversion usullari chuqur tahlil qilinadi.",
        grammarRules: [
          {
            title: "1. Mixed Conditionals (Aralash shart gaplar)",
            description: "O'tmishda sodir bo'lmagan hodisa agar bo'lganida, HOZIR natijasi qanday bo'lishi edi?",
            formula: "If + Past Perfect (had V3), would + bare infinitive (now)",
            examples: [
              { target: "If I had accepted the scholarship, I would be in Cambridge now.", uzbek: "Agar grantni qabul qilganimda, hozir Kembrijda bo'lar edim.", notes: "Past condition -> Present result" },
            ],
          },
          {
            title: "2. Negative Inversion (Emfatik Inversiya)",
            description: "Gap boshiga inkor ravishi (Not only, Seldom, Rarely, Never) qo'yilsa, so'roq gap tartibi yuzaga keladi.",
            examples: [
              { target: "Never have I witnessed such brilliant dedication.", uzbek: "Hech qachon bunchalik yuksak sadoqatni ko'rmaganman.", notes: "Ta'sirchan rasmiy uslub" },
            ],
          },
        ],
        vocabulary: [
          { id: 'eng-10', word: 'Hypothesis', transcription: '/haɪˈpɒθ.ə.sɪs/', translation: 'Faraz, gipoteza', langCode: 'en-US', exampleSentence: 'Our initial hypothesis was validated by data.', exampleTranslation: 'Bizning dastlabki farazimiz ma\'lumotlar bilan tasdiqlandi.', level: 'B2' },
          { id: 'eng-11', word: 'Eloquent', transcription: '/ˈel.ə.kwənt/', translation: 'Fasohotli, notiq, ta\'sirchan', langCode: 'en-US', exampleSentence: 'She delivered an eloquent defense of her research.', exampleTranslation: 'U o\'z tadqiqotini juda ta\'sirchan va ravon himoya qildi.', level: 'B2' },
          { id: 'eng-12', word: 'Subtle', transcription: '/ˈsʌt.əl/', translation: 'Nozik, sezilmas darajada chuqur', langCode: 'en-US', exampleSentence: 'Notice the subtle difference between these two idioms.', exampleTranslation: 'Ushbu ikki ibora o\'rtasidagi nozik farqqa e\'tibor bering.', level: 'B2' },
        ],
        quiz: [
          {
            id: 'q-eng-5',
            question: "Inversiya qoidasiga ko'ra qaysi variant to'g'ri?",
            options: [
              "Rarely we see such impressive results.",
              "Rarely do we see such impressive results.",
              "Rarely we do see such impressive results.",
              "Rarely are we see such impressive results.",
            ],
            correctAnswerIndex: 1,
            explanation: "Inversiyada gap boshida 'Rarely' kelsa, yordamchi fe'l egadan oldinga o'tadi: 'Rarely do we see...'",
          },
        ],
      },
      {
        id: 'eng-c1-1',
        courseId: 'english-b2',
        level: 'C1',
        order: 5,
        title: "C1 Mustaqil Erkin Muloqot: Idiomalar, Nozik Ma'nolar va Spontan Nutq",
        subtitle: 'Ona tilidek tabiiy so\'zlashuv, ritorik usullar va tezkor fikrlash',
        durationMinutes: 35,
        xpReward: 120,
        overview: "C1 (Advanced) darajasi — o'ylanmasdan, tabiiy tezlikda va nozik hazil, idiomatik iboralar hamda boy so'z zaxirasi bilan mustaqil gaplasha olish mahoratidir.",
        grammarRules: [
          {
            title: "1. Spontan Nutqda Bog'lovchilar (Discourse Markers)",
            description: "Nutqni jonlantirish va fikrni oson ulab ketish vositalari: 'Having said that', 'At the end of the day', 'By and large'.",
            examples: [
              { target: "Having said that, we cannot overlook the ethical implications.", uzbek: "Shunday bo'lsa-da, biz axloqiy oqibatlarni ko'zdan qochira olmaymiz.", notes: "C1 nozik qarshi fikr" },
              { target: "At the end of the day, consistent effort yields mastery.", uzbek: "Oxir-oqibat, muntazam harakat mukammallikka olib keladi." },
            ],
          },
          {
            title: "2. Cleft Sentences (Fikrni urg'ulash formulasi)",
            description: "Suhbatda asosiy nuqtani ta'kidlash formulasi: 'What I value most is...'",
            formula: "What + S + V + is/was + complement",
            examples: [
              { target: "What impressed me the most was their intellectual curiosity.", uzbek: "Meni eng hayratlantirgan narsa ularning intellektual qiziquvchanligi bo'ldi." },
            ],
          },
        ],
        dialogue: [
          { speaker: "Sarah (Examiner)", text: "Could you elaborate on why continuous learning is paramount in the modern era?", translation: "Zamonaviy davrda uzluksiz ta'lim nima sababdan birinchi darajali ekanini tushuntira olasizmi?" },
          { speaker: "Alisher (C1 Candidate)", text: "Without a shadow of a doubt. The technological landscape evolves exponentially, which necessitates lifelong adaptability.", translation: "Hech shubhasiz. Texnologik dunyo tez rivojlanmoqda, bu esa butun umrlik moslashuvchanlikni talab qiladi." },
        ],
        vocabulary: [
          { id: 'eng-c1-1', word: 'Paramount', transcription: '/ˈpær.ə.maʊnt/', translation: 'Eng muhim, birinchi darajali', langCode: 'en-US', exampleSentence: 'Language fluency is of paramount importance.', exampleTranslation: 'Tilni ravon bilish eng muhim ahamiyatga ega.', level: 'C1' },
          { id: 'eng-c1-2', word: 'Nuance', transcription: '/ˈnjuː.ɑːns/', translation: 'Nozik ma\'no, qirra', langCode: 'en-US', exampleSentence: 'He grasped the cultural nuances immediately.', exampleTranslation: 'U madaniy nozik qirralarni bir zumda angladi.', level: 'C1' },
          { id: 'eng-c1-3', word: 'Spontaneous', transcription: '/spɒnˈteɪ.ni.əs/', translation: 'Tabiiy, o\'z-o\'zidan oqib chiquvchi', langCode: 'en-US', exampleSentence: 'C1 speakers engage in fluent, spontaneous debate.', exampleTranslation: 'C1 so\'zlashuvchilari ravon va erkin munozaraga kirishadilar.', level: 'C1' },
        ],
        quiz: [
          {
            id: 'q-eng-c1-1',
            question: "Qaysi jumla 'Cleft sentence' (urg'u berish) shakliga to'liq misol bo'ladi?",
            options: [
              "What I love most is programming.",
              "I love programming most.",
              "Programming is cool.",
              "Loved I programming."
            ],
            correctAnswerIndex: 0,
            explanation: "'What I love most is...' formulasi asosiy fikrni ajratib ko'rsatuvchi Cleft Sentence hisoblanadi.",
          },
        ],
      },
    ],
  },
  {
    id: 'russian-b2',
    name: 'Rus Tili (A1 - B2)',
    originalName: 'Русский язык для полиглотов',
    category: 'russian',
    flag: '🇷🇺',
    description: "Alifbo va to'g'ri talaffuzdan boshlab 6 ta padej, harakat fe'llari hamda professional muloqotgacha bo'lgan darslik.",
    maxLevel: 'B2',
    totalLessons: 10,
    estimatedHours: 55,
    lessons: [
      {
        id: 'ru-a1-1',
        courseId: 'russian-b2',
        level: 'A1',
        order: 1,
        title: 'Rus Alifbosi, Unlilarning Reduksiyasi va Jinslar',
        subtitle: 'Мужской, женский и средний род имен существительных',
        durationMinutes: 20,
        xpReward: 50,
        overview: "Rus tilida otlarning uch xil jinsi mavjud: muzhskoy, jenskiy va sredniy. So'nggi harfiga qarab jinsni bir zumda aniqlash formulasini o'rganamiz.",
        grammarRules: [
          {
            title: "1. Otlarning jinsi (Род существительных)",
            description: "Muzhskoy rod: undosh harf bilan tugaydi (стол, брат). Jenskiy rod: -а / -я (книга, семья). Sredniy rod: -о / -е (окно, море).",
            examples: [
              { target: "Это мой новый дом.", uzbek: "Bu mening yangi uyim. (Muzhskoy rod)", notes: "Дом - undosh bilan tugagan" },
              { target: "Это моя красивая машина.", uzbek: "Bu mening chiroyli mashinam. (Jenskiy rod)", notes: "Машина - 'а' bilan tugagan" },
              { target: "Это наше открытое окно.", uzbek: "Bu bizning ochiq derazamiz. (Sredniy rod)", notes: "Окно - 'о' bilan tugagan" },
            ],
          },
        ],
        dialogue: [
          { speaker: "Алексей", text: "Здравствуйте! Как ваши дела?", translation: "Assalomu alaykum! Ishlaringiz qanday?" },
          { speaker: "Фарход", text: "Добрый день! Спасибо, всё отлично. А у вас?", translation: "Xayrli kun! Rahmat, hammasi a'lo. Sizdachi?" },
          { speaker: "Алексей", text: "Тоже хорошо, спасибо. Рад познакомиться!", translation: "Menda ham yaxshi, rahmat. Tanishganimdan xursandman!" },
        ],
        vocabulary: [
          { id: 'ru-1', word: 'Здравствуйте', transcription: '[здрáвствуйте]', translation: 'Assalomu alaykum', langCode: 'ru-RU', exampleSentence: 'Здравствуйте, уважаемые коллеги.', exampleTranslation: 'Assalomu alaykum, hurmatli hamkasblar.', level: 'A1' },
          { id: 'ru-2', word: 'Спасибо', transcription: '[спасúбо]', translation: 'Rahmat', langCode: 'ru-RU', exampleSentence: 'Большое спасибо за помощь!', exampleTranslation: 'Yordamingiz uchun katta rahmat!', level: 'A1' },
          { id: 'ru-3', word: 'Успех', transcription: '[успéх]', translation: 'Muvaffaqiyat, omad', langCode: 'ru-RU', exampleSentence: 'Желаю вам большого успеха в учебе.', exampleTranslation: 'O\'qishingizda ulkan muvaffaqiyatlar tilayman.', level: 'A1' },
        ],
        quiz: [
          {
            id: 'q-ru-1',
            question: "'Книга' (kitob) so'zi qaysi jinsga mansub?",
            options: ["Мужской род", "Женский род", "Средний род", "Общий род"],
            correctAnswerIndex: 1,
            explanation: "'Книга' so'zi '-а' unlisi bilan tugagani sababli ayol jinsi (женский род) hisoblanadi.",
          },
        ],
      },
      {
        id: 'ru-b1-1',
        courseId: 'russian-b2',
        level: 'B1',
        order: 2,
        title: "Глаголы Движения: Идти vs Ходить, Ехать vs Ездить",
        subtitle: 'Bir yo\'nalishli va har xil yo\'nalishli harakat fe\'llari tizimi',
        durationMinutes: 26,
        xpReward: 70,
        overview: "Rus tilida piyoda yoki transportda yurish, bir tomonga (идти/ехать) yoki muntazam borib-kelish (ходить/ездить) mutlaqo boshqa fe'llar bilan aytiladi.",
        grammarRules: [
          {
            title: "1. Однонаправленные vs Разнонаправленные",
            description: "Идти/Ехать — ayni paytda bitta yo'nalish bo'ylab harakat. Ходить/Ездить — takroriy harakat, ikki tomonga borib-kelish qobiliyati.",
            examples: [
              { target: "Сейчас я иду на работу.", uzbek: "Hozir men ishga piyoda ketyapman. (Bir yo'nalish)", notes: "Идти" },
              { target: "Каждый день я хожу пешком.", uzbek: "Har kuni men piyoda yuraman. (Takroriy)", notes: "Ходить" },
            ],
          },
        ],
        vocabulary: [
          { id: 'ru-4', word: 'Путешествие', transcription: '[путешéствие]', translation: 'Sayohat', langCode: 'ru-RU', exampleSentence: 'Путешествие расширяет кругозор.', exampleTranslation: 'Sayohat dunyoqarashni kengaytiradi.', level: 'B1' },
          { id: 'ru-5', word: 'Возможность', transcription: '[возмóжность]', translation: 'Imkoniyat', langCode: 'ru-RU', exampleSentence: 'Не упустите прекрасную возможность.', exampleTranslation: 'Ajoyib imkoniyatni qo\'ldan boy bermang.', level: 'B1' },
        ],
        quiz: [
          {
            id: 'q-ru-2',
            question: "'Hozir men universitetga ketyapman' gapini qanday aytish to'g'ri?",
            options: ["Я сейчас хожу в университет", "Я сейчас иду в университет", "Я вчера пошел в университет", "Я езжу пешком"],
            correctAnswerIndex: 1,
            explanation: "Ayni damda bir yo'nalishda piyoda borilayotgani sababli 'иду' fe'li ishlatiladi.",
          },
        ],
      },
      {
        id: 'ru-b2-1',
        courseId: 'russian-b2',
        level: 'B2',
        order: 3,
        title: "Деепричастия, Причастия и Бизнес-Переговоры",
        subtitle: 'B2 darajasidagi qochirma iboralar va rasmiy nutq konstruksiyalari',
        durationMinutes: 30,
        xpReward: 85,
        overview: "Rasmiy va akademik yozishmada, shuningdek, biznes muzokaralarida sifatdosh (причастие) va ravishdosh (деепричастие) larni to'g'ri tuzish usullari.",
        grammarRules: [
          {
            title: "1. Деепричастие (Qo'shimcha harakat)",
            description: "Asosiy harakat bilan bir paytda bajariluvchi qo'shimcha harakatni ifodalaydi (-ая/-я, -в/-вши).",
            examples: [
              { target: "Изучая языки, мы открываем новые горизонти.", uzbek: "Tillarni o'rganar ekanmiz, biz yangi ufqlarni ochamiz.", notes: "Деепричастный оборот" },
            ],
          },
        ],
        vocabulary: [
          { id: 'ru-6', word: 'Сотрудничество', transcription: '[сотрýдничество]', translation: 'Hamkorlik', langCode: 'ru-RU', exampleSentence: 'Мы ценим долгосрочное сотрудничество.', exampleTranslation: 'Biz uzoq muddatli hamkorlikni qadrlaymiz.', level: 'B2' },
          { id: 'ru-7', word: 'Инновация', transcription: '[инновáция]', translation: 'Yangilik, innovatsiya', langCode: 'ru-RU', exampleSentence: 'Технологические инновации меняют мир.', exampleTranslation: 'Texnologik innovatsiyalar dunyoni o\'zgartirmoqda.', level: 'B2' },
        ],
        quiz: [
          {
            id: 'q-ru-3',
            question: "Qaysi so'z 'деепричастие' (ravishdosh) hisoblanadi?",
            options: ["Читая", "Читающий", "Прочитанный", "Книга"],
            correctAnswerIndex: 0,
            explanation: "'Читая' (o'qiy turib) fe'li ravishdosh (-я qo'shimchasi) bo'lib, qo'shimcha harakatni ifodalaydi.",
          },
        ],
      },
    ],
  },
  {
    id: 'programming-dev',
    name: 'Dasturlash (Python, JS, C++)',
    originalName: 'Modern Software Engineering',
    category: 'programming',
    flag: '💻',
    description: "Sintaksisdan tortib Algoritmlar, OOP, Asinxronlik va xotira boshqaruvigacha bo'lgan amaliy kod darsliklari.",
    maxLevel: 'B2',
    totalLessons: 9,
    estimatedHours: 80,
    lessons: [
      {
        id: 'py-intro-1',
        courseId: 'programming-dev',
        level: 'A1',
        order: 1,
        title: "Python Asoslari: O'zgaruvchilar, Shartlar va Ma'lumot Turlari",
        subtitle: 'Dasturlash dunyosiga ilk qadam va toza kod yozish madaniyati',
        durationMinutes: 20,
        xpReward: 60,
        overview: "Python tilining eng katta kuchi — o'qilishi oson va sodda sintaksis. Ushbu darsda siz str, int, float, boolean turlari hamda if-elif-else shart operatorlari bilan tanishasiz.",
        grammarRules: [
          {
            title: "1. O'zgaruvchilar va Dinamik Tiplash",
            description: "Pythonda o'zgaruvchi turini oldindan e'lon qilish shart emas. Tizim qiymatga qarab o'zi aniqlaydi.",
            formula: "variable_name = value",
            examples: [
              { target: "user_name = 'Aziz'", uzbek: "Satr (String) qiymat saqlash" },
              { target: "user_age = 24", uzbek: "Butun son (Integer) saqlash" },
              { target: "is_active = True", uzbek: "Mantiqiy (Boolean) holat" },
            ],
          },
          {
            title: "2. Shart operatorlari (if-elif-else)",
            description: "Kodingiz turli vaziyatlarda turlicha qaror qabul qilishi uchun shartlardan foydalaniladi.",
            examples: [
              { target: "if score >= 90:\n    print('A daraja')", uzbek: "Agar ball 90 yoki undan yuqori bo'lsa" },
            ],
          },
        ],
        vocabulary: [
          { id: 'prog-1', word: 'Variable', transcription: '/ˈveə.ri.ə.bəl/', translation: 'O\'zgaruvchi', langCode: 'en-US', exampleSentence: 'Store the user score in a variable.', exampleTranslation: 'Foydalanuvchi ballini o\'zgaruvchida saqlang.', level: 'A1' },
          { id: 'prog-2', word: 'Function', transcription: '/ˈfʌŋk.ʃən/', translation: 'Funksiya', langCode: 'en-US', exampleSentence: 'A pure function has no side effects.', exampleTranslation: 'Toza funksiya nojo\'ya ta\'sirlarsiz ishlaydi.', level: 'A1' },
          { id: 'prog-3', word: 'Condition', transcription: '/kənˈdɪʃ.ən/', translation: 'Shart', langCode: 'en-US', exampleSentence: 'Evaluate the condition before loop execution.', exampleTranslation: 'Sikl bajarilishidan oldin shartni tekshiring.', level: 'A1' },
        ],
        quiz: [
          {
            id: 'q-py-1',
            question: "Pythonda ekranga ma'lumot chiqarish uchun qaysi funksiya ishlatiladi?",
            options: ["echo()", "console.log()", "print()", "System.out.println()"],
            correctAnswerIndex: 2,
            explanation: "Pythonda standart konsolga chiqarish funksiyasi print() hisoblanadi.",
          },
        ],
        codingTask: {
          language: 'python',
          instruction: "Berilgan yosh (age) 18 dan katta yoki teng bo'lsa 'Xush kelibsiz', aks holda 'Kirish cheklangan' deb chiqaruvchi kod yozing.",
          starterCode: "age = 20\n\nif age >= 18:\n    print('Xush kelibsiz')\nelse:\n    print('Kirish cheklangan')\n",
          solutionCode: "age = 20\nif age >= 18:\n    print('Xush kelibsiz')\nelse:\n    print('Kirish cheklangan')",
          expectedOutput: "Xush kelibsiz",
          hints: ["if age >= 18 shartini tekshiring", "print() funksiyasidan foydalaning"],
        },
      },
      {
        id: 'js-async-1',
        courseId: 'programming-dev',
        level: 'B1',
        order: 2,
        title: "JavaScript ES6+ va Asinxron Dasturlash: Promises & Async/Await",
        subtitle: 'Serverdan ma\'lumot yuklash va bloklanmaydigan Event Loop falsafasi',
        durationMinutes: 28,
        xpReward: 75,
        overview: "Veb ilovalarning asosi bo'lgan JavaScript tilida asinxron jarayonlar, API so'rovlari va modern sintaksis (destructuring, arrow functions) ni puxta o'rganamiz.",
        grammarRules: [
          {
            title: "1. Async / Await sintaksisi",
            description: "Vaqt oluvchi jarayonlar (masalan tarmoq so'rovlari) brauzerni qotirib qo'ymasligi uchun asinxron bajariladi.",
            formula: "async function fetchData() { const res = await fetch(url); return await res.json(); }",
            examples: [
              { target: "const [first, ...rest] = [10, 20, 30];", uzbek: "Array destructuring va Rest operatori" },
            ],
          },
        ],
        vocabulary: [
          { id: 'prog-4', word: 'Asynchronous', transcription: '/eɪˈsɪŋ.krə.nəs/', translation: 'Asinxron (parallel)', langCode: 'en-US', exampleSentence: 'Asynchronous calls prevent UI freezes.', exampleTranslation: 'Asinxron chaqiriqlar interfeys qotib qolishini oldini oladi.', level: 'B1' },
          { id: 'prog-5', word: 'Promise', transcription: '/ˈprɒm.ɪs/', translation: 'Vada (kutilayotgan natija)', langCode: 'en-US', exampleSentence: 'A promise resolves or rejects.', exampleTranslation: 'Promise yoki muvaffaqiyatli yakunlanadi yoki rad etiladi.', level: 'B1' },
        ],
        quiz: [
          {
            id: 'q-js-1',
            question: "Async funksiya har doim nima qaytaradi?",
            options: ["String", "Number", "Promise", "Array"],
            correctAnswerIndex: 2,
            explanation: "'async' kalit so'zi bilan e'lon qilingan har qanday funksiya har doim Promise ob'ektini qaytaradi.",
          },
        ],
        codingTask: {
          language: 'javascript',
          instruction: "Massivdagi faqat juft sonlarni 2 ga ko'paytirib yangi massiv qaytaring: [1, 2, 3, 4, 5, 6]",
          starterCode: "const numbers = [1, 2, 3, 4, 5, 6];\nconst result = numbers.filter(n => n % 2 === 0).map(n => n * 2);\nconsole.log(result);\n",
          solutionCode: "const numbers = [1, 2, 3, 4, 5, 6];\nconst result = numbers.filter(n => n % 2 === 0).map(n => n * 2);\nconsole.log(result);",
          expectedOutput: "[ 4, 8, 12 ]",
          hints: ["filter() metodi bilan juftlarni ajrating", "map() metodi bilan 2 ga ko'paytiring"],
        },
      },
      {
        id: 'cpp-algo-1',
        courseId: 'programming-dev',
        level: 'B2',
        order: 3,
        title: "C++: Pointers, Memory Management va Binary Search Algoritmi",
        subtitle: 'Xotirani bevosita boshqarish va O(log N) tezlikdagi qidiruv algoritmi',
        durationMinutes: 32,
        xpReward: 95,
        overview: "C++ dasturchilarga xotira (RAM) ustidan to'liq nazorat beradi. Ko'rsatkichlar (pointers), Stack vs Heap farqi hamda ikkilik qidiruv (Binary Search) algoritmining ishlash mexanizmini ko'ramiz.",
        grammarRules: [
          {
            title: "1. Ko'rsatkichlar (Pointers) va Manzillar",
            description: "* operatori ko'rsatkich qiymatini olish yoki e'lon qilish, & operatori esa o'zgaruvchining xotiradagi manzilini olish uchun xizmat qiladi.",
            examples: [
              { target: "int a = 100;\nint* ptr = &a;\ncout << *ptr;", uzbek: "ptr a ning manzilini saqlaydi, *ptr esa 100 qiymatini chiqaradi." },
            ],
          },
          {
            title: "2. Binary Search Algoritmi (O(log N))",
            description: "Tartiblangan massivni ikkiga bo'lish orqali qidiruv maydonini har qadamda ikki barobarga qisqartiradi.",
            examples: [
              { target: "mid = left + (right - left) / 2;", uzbek: "Overflow xatosini oldini oluvchi o'rta nuqta hisoblash formulasi" },
            ],
          },
        ],
        vocabulary: [
          { id: 'prog-6', word: 'Algorithm', transcription: '/ˈæl.ɡə.rɪ.ðəm/', translation: 'Algoritm', langCode: 'en-US', exampleSentence: 'Binary search is an efficient search algorithm.', exampleTranslation: 'Ikkilik qidiruv samarali qidiruv algoritmidir.', level: 'B2' },
          { id: 'prog-7', word: 'Pointer', transcription: '/ˈpɔɪn.tər/', translation: 'Ko\'rsatkich (xotira manzili)', langCode: 'en-US', exampleSentence: 'Pointers store memory addresses of variables.', exampleTranslation: 'Ko\'rsatkichlar o\'zgaruvchilarning xotira manzillarini saqlaydi.', level: 'B2' },
          { id: 'prog-8', word: 'Complexity', transcription: '/kəmˈplek.sə.ti/', translation: 'Murakkablik (Big-O)', langCode: 'en-US', exampleSentence: 'Time complexity determines scalability.', exampleTranslation: 'Vaqt murakkabligi masshtablilikni belgilaydi.', level: 'B2' },
        ],
        quiz: [
          {
            id: 'q-cpp-1',
            question: "Binary Search algoritmining vaqt murakkabligi (Time Complexity) qanday?",
            options: ["O(N^2)", "O(N)", "O(log N)", "O(1)"],
            correctAnswerIndex: 2,
            explanation: "Tartiblangan ro'yxat har iteratsiyada ikkiga bo'linganligi sababli murakkablik O(log N) bo'ladi.",
          },
        ],
        codingTask: {
          language: 'cpp',
          instruction: "Massiv elementlarini tartiblash va xotira boshqaruvi bo'yicha ko'rsatkichlar ishlashini tekshiruvchi C++ kodi.",
          starterCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int val = 42;\n    int* ptr = &val;\n    cout << \"Qiymat: \" << *ptr << endl;\n    return 0;\n}\n",
          solutionCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int val = 42;\n    int* ptr = &val;\n    cout << \"Qiymat: \" << *ptr << endl;\n    return 0;\n}",
          expectedOutput: "Qiymat: 42",
          hints: ["*ptr orqali manzil ichidagi sonni oling"],
        },
      },
    ],
  },
  {
    id: 'german-b2',
    name: 'Nemis Tili (A1 - B2)',
    originalName: 'Deutschkurs für Profis',
    category: 'german',
    flag: '🇩🇪',
    description: "Der/Die/Das artikllari, 4 ta kelishik (Kasus), trennbare Verben hamda B2 darajasidagi Konjunktiv II.",
    maxLevel: 'B2',
    totalLessons: 8,
    estimatedHours: 50,
    lessons: [
      {
        id: 'de-a1-1',
        courseId: 'german-b2',
        level: 'A1',
        order: 1,
        title: "Artikllar va Salomlashish: Der, Die, Das",
        subtitle: 'Nemis tilidagi jinslar tizimi va kundalik muloqot iboralari',
        durationMinutes: 20,
        xpReward: 50,
        overview: "Nemis tilida har bir ot o'zining aniq artikliga ega: Der (Muzhskoy), Die (Jenskiy), Das (Sredniy). Bularni so'z bilan birga yodlash zarur.",
        grammarRules: [
          {
            title: "1. Belirtili Artikllar (Bestimmte Artikel)",
            description: "Der Mann (erkak kishi), Die Frau (ayol kishi), Das Kind (bola). Ko'plikda barcha jinslar uchun artikl 'Die' bo'ladi.",
            examples: [
              { target: "Guten Tag! Wie geht es Ihnen?", uzbek: "Xayrli kun! Ahvollaringiz qanday? (Rasmiy)", notes: "Höflichkeitsform" },
              { target: "Ich lerne Deutsch mit Freude.", uzbek: "Men nemis tilini zavq bilan o'rganyapman." },
            ],
          },
        ],
        vocabulary: [
          { id: 'de-1', word: 'Guten Tag', transcription: '[ˈɡuːtn̩ ˈtaːk]', translation: 'Xayrli kun', langCode: 'de-DE', exampleSentence: 'Guten Tag, wie kann ich Ihnen helfen?', exampleTranslation: 'Xayrli kun, sizga qanday yordam bera olaman?', level: 'A1' },
          { id: 'de-2', word: 'Freiheit', transcription: '[ˈfʁaɪ̯haɪ̯t]', translation: 'Ozodlik, erkinlik', langCode: 'de-DE', exampleSentence: 'Bildung schenkt geistige Freiheit.', exampleTranslation: 'Ta\'lim aqliy erkinlik bag\'ishlaydi.', level: 'A1' },
          { id: 'de-3', word: 'Wunderbar', transcription: '[ˈvʊndɐbaːɐ̯]', translation: 'Ajoyib, mukammal', langCode: 'de-DE', exampleSentence: 'Das ist eine wunderbare Idee!', exampleTranslation: 'Bu ajoyib g\'oya!', level: 'A1' },
        ],
        quiz: [
          {
            id: 'q-de-1',
            question: "'Das Buch' (kitob) so'zi qaysi grammatik jinsga tegishli?",
            options: ["Maskulin (Der)", "Feminin (Die)", "Neutral (Das)", "Plural (Die)"],
            correctAnswerIndex: 2,
            explanation: "'Das' artikli neutral (o'rta jins) ni ifodalaydi.",
          },
        ],
      },
    ],
  },
  {
    id: 'spanish-b2',
    name: 'Ispan Tili (A1 - B2)',
    originalName: 'Español Global',
    category: 'spanish',
    flag: '🇪🇸',
    description: "Dunyoning 500 milliondan ortiq insonlari so'zlashuvchi ispan tilini B2 darajasigacha qiziqarli o'rganing.",
    maxLevel: 'B2',
    totalLessons: 8,
    estimatedHours: 48,
    lessons: [
      {
        id: 'es-a1-1',
        courseId: 'spanish-b2',
        level: 'A1',
        order: 1,
        title: "Salomlashish va Ikki Xil 'Bo'lmoq': Ser vs Estar",
        subtitle: 'Doimiy xususiyatlar (Ser) va vaqtinchalik holatlar (Estar) siri',
        durationMinutes: 18,
        xpReward: 50,
        overview: "Ispan tilida 'bo'lmoq' ma'nosidagi ikki xil fe'l bor: Ser (doimiy kimlik, xarakter) va Estar (joylashuv, kayfiyat, vaqtinchalik holat).",
        grammarRules: [
          {
            title: "1. Ser va Estar farqi",
            description: "Soy estudiante (Men talabaman - Ser). Estoy en casa (Men uydaman - Estar).",
            examples: [
              { target: "Hola, ¿cómo estás?", uzbek: "Salom, qandaysan?", notes: "Estar (holat)" },
              { target: "Soy de Samarcanda.", uzbek: "Men Samarqandlikman.", notes: "Ser (kelib chiqish)" },
            ],
          },
        ],
        vocabulary: [
          { id: 'es-1', word: 'Hola', transcription: '[ˈo.la]', translation: 'Salom', langCode: 'es-ES', exampleSentence: '¡Hola! ¿Qué tal tu día?', exampleTranslation: 'Salom! Kuning qanday o\'tmoqda?', level: 'A1' },
          { id: 'es-2', word: 'Gracias', transcription: '[ˈɡɾa.sjas]', translation: 'Rahmat', langCode: 'es-ES', exampleSentence: 'Muchas gracias por tu amistad.', exampleTranslation: 'Do\'stligingiz uchun katta rahmat.', level: 'A1' },
          { id: 'es-3', word: 'Maravilloso', transcription: '[ma.ɾa.βiˈʝo.so]', translation: 'Ajoyib, hayratlanarli', langCode: 'es-ES', exampleSentence: 'El viaje a España fue maravilloso.', exampleTranslation: 'Ispaniyaga sayohat ajoyib bo\'ldi.', level: 'A1' },
        ],
        quiz: [
          {
            id: 'q-es-1',
            question: "Vaqtinchalik kayfiyat yoki joylashuvni aytishda qaysi fe'l ishlatiladi?",
            options: ["Ser", "Estar", "Haber", "Tener"],
            correctAnswerIndex: 1,
            explanation: "Ispan tilida holat va joylashuv uchun 'Estar' fe'li qo'llaniladi.",
          },
        ],
      },
    ],
  },
  {
    id: 'turkish-c1',
    name: 'Turk Tili (A1 - C1)',
    originalName: 'Türkçe Akıcı Konuşma',
    category: 'turkish',
    flag: '🇹🇷',
    description: "O'zbek tiliga qardosh, jarangdor turk tilida unlilar uyg'unligidan tortib C1 erkin va ravon muloqotgacha bo'lgan to'liq kurs.",
    maxLevel: 'C1',
    totalLessons: 10,
    estimatedHours: 50,
    lessons: [
      {
        id: 'tr-a1-1',
        courseId: 'turkish-c1',
        level: 'A1',
        order: 1,
        title: "Unlilar Uyg'unligi, Salomlashish va Shaxs Qo'shimchalari",
        subtitle: 'Büyük Ünlü Uyumu va turkcha samimiy muloqot formulasi',
        durationMinutes: 20,
        xpReward: 50,
        overview: "Turk tili agglyutinativ til bo'lib, o'zbek tiliga juda yaqin. Unlilar qattiq (a, ı, o, u) va yumshoq (e, i, ö, ü) guruhlarga bo'linadi.",
        grammarRules: [
          {
            title: "1. Katta unlilar uyg'unligi (Büyük Ünlü Uyumu)",
            description: "So'zning so'nggi unlisi qalin bo'lsa, qo'shimcha ham qalin bo'ladi (-lar, -da, -dan). Yumshoq bo'lsa (-ler, -de, -den).",
            examples: [
              { target: "Ev -> Evler (Uylar)", uzbek: "Yumshoq unli 'e' bo'lgani sababli '-ler' qo'shiladi." },
              { target: "Araba -> Arabalar (Mashinalar)", uzbek: "Qalin unli 'a' bo'lgani sababli '-lar' qo'shiladi." },
            ],
          },
          {
            title: "2. Shaxs qo'shimchalari (-yim, -sin, -dir)",
            description: "Ben öğrenciyim (Men talabaman), Sen iyisin (Sen yaxshisan).",
            examples: [
              { target: "Merhaba! Nasılsınız? — Çok iyiyim, teşekkür ederim.", uzbek: "Salom! Qandaysiz? — Juda yaxshiman, rahmat." },
            ],
          },
        ],
        dialogue: [
          { speaker: "Emre", text: "Merhaba! Benim adım Emre. Türkiye'ye hoş geldiniz!", translation: "Salom! Mening ismim Emre. Turkiyaga xush kelibsiz!" },
          { speaker: "Sarvar", text: "Hoş bulduk Emre bey! Ben Özbekistan'dan geldim.", translation: "Xush ko'rdik Emre bey! Men O'zbekistondan keldim." },
        ],
        vocabulary: [
          { id: 'tr-1', word: 'Merhaba', transcription: '[merhaba]', translation: 'Salom, assalomu alaykum', langCode: 'tr-TR', exampleSentence: 'Merhaba, gününüz aydın olsun.', exampleTranslation: 'Salom, kuningiz yorug\' bo\'lsin.', level: 'A1' },
          { id: 'tr-2', word: 'Görüşmek üzere', transcription: '[görüşmek üzere]', translation: 'Ko\'rishguncha', langCode: 'tr-TR', exampleSentence: 'Yarın derste görüşmek üzere!', exampleTranslation: 'Ertaga darsda ko\'rishguncha!', level: 'A1' },
          { id: 'tr-3', word: 'Harika', transcription: '[harika]', translation: 'Ajoyib, mukammal', langCode: 'tr-TR', exampleSentence: 'Türkçe konuşmak harika bir duygu.', exampleTranslation: 'Turkcha gaplashish ajoyib tuyg\'u.', level: 'A1' },
        ],
        quiz: [
          {
            id: 'q-tr-1',
            question: "Turk tilida 'Kitap' so'zining ko'plik shakli qaysi?",
            options: ["Kitapler", "Kitaplar", "Kitaplarim", "Kitapdan"],
            correctAnswerIndex: 1,
            explanation: "'Kitap' so'zidagi so'nggi unli 'a' qalin bo'lgani sababli '-lar' qo'shiladi: Kitaplar.",
          },
        ],
      },
      {
        id: 'tr-c1-1',
        courseId: 'turkish-c1',
        level: 'C1',
        order: 2,
        title: "C1 Erkin So'zlashuv: Deyimler va Spontan Turkcha Fikr Bayon Qilish",
        subtitle: 'Turkchada ona tilidek erkin munozara va iboralar san\'ati',
        durationMinutes: 30,
        xpReward: 110,
        overview: "Turk madaniyatida iboralar (deyimler) juda boy. Ushbu C1 darsida suhbatdoshni jalb qiluvchi ritorik iboralar va mustaqil suhbat texnikasi beriladi.",
        grammarRules: [
          {
            title: "1. Jonli nutq bog'lovchilari",
            description: "'Nitekim', 'Kaldı ki', 'Her halükarda', 'Açıkça belirtmek gerekirse'.",
            examples: [
              { target: "Açıkça belirtmek gerekirse, bu başarı azmin sonucudur.", uzbek: "Ochiq aytish kerakki, bu muvaffaqiyat qat'iyat natijasidir." },
            ],
          },
        ],
        vocabulary: [
          { id: 'tr-c1-1', word: 'Azim', transcription: '[azim]', translation: 'Qat\'iyat, matonat', langCode: 'tr-TR', exampleSentence: 'Büyük azimle çalışan hedefine ulaşır.', exampleTranslation: 'Ulkan qat\'iyat bilan mehnat qilgan maqsadiga yetadi.', level: 'C1' },
          { id: 'tr-c1-2', word: 'Samimiyet', transcription: '[samimiyet]', translation: 'Samimiylik, ixlos', langCode: 'tr-TR', exampleSentence: 'İletişimde samimiyet güven kazandırır.', exampleTranslation: 'Muloqotda samimiylik ishonch keltiradi.', level: 'C1' },
        ],
        quiz: [
          {
            id: 'q-tr-c1-1',
            question: "'Nitekim' bog'lovchisi qanday ma'noni bildiradi?",
            options: ["Shunday qilib / zero / chindan ham", "Hech qachon", "Aksincha", "Ertaga"],
            correctAnswerIndex: 0,
            explanation: "'Nitekim' oldingi aytilgan fikrni tasdiqlab, 'haqiqatan ham / shunday qilib' ma'nosida keladi.",
          },
        ],
      },
    ],
  },
  {
    id: 'french-c1',
    name: 'Fransuz Tili (A1 - C1)',
    originalName: 'Français Polyglotte',
    category: 'french',
    flag: '🇫🇷',
    description: "Jahon diplomatiyasi va madaniyati tili bo'lgan fransuz tilida A1 dan C1 gacha erkin so'zlashuv kursi.",
    maxLevel: 'C1',
    totalLessons: 8,
    estimatedHours: 55,
    lessons: [
      {
        id: 'fr-a1-1',
        courseId: 'french-c1',
        level: 'A1',
        order: 1,
        title: "Fonetika, Salomlashish va Être/Avoir Fe'llari",
        subtitle: 'Fransuzcha nafis talaffuz va kundalik birinchi suhbat',
        durationMinutes: 20,
        xpReward: 50,
        overview: "Fransuz tilida burun unlilari (nasal vowels) va oxirgi undoshlarning o'qilmaslik qoidasi mavjud. Asosiy ikki fe'l: Être (bo'lmoq) va Avoir (ega bo'lmoq).",
        grammarRules: [
          {
            title: "1. Être fe'li tuslanishi",
            description: "Je suis (Menman), Tu es (Sensan), Il/Elle est (U), Nous sommes (Biz), Vous êtes (Siz), Ils/Elles sont (Ular).",
            examples: [
              { target: "Je suis ravi de vous rencontrer.", uzbek: "Siz bilan uchrashganimdan juda xursandman." },
            ],
          },
        ],
        vocabulary: [
          { id: 'fr-1', word: 'Bonjour', transcription: '[bɔ̃.ʒuʁ]', translation: 'Salom, xayrli kun', langCode: 'fr-FR', exampleSentence: 'Bonjour, comment allez-vous?', exampleTranslation: 'Xayrli kun, ahvollaringiz qalay?', level: 'A1' },
          { id: 'fr-2', word: 'Magnifique', transcription: '[ma.ɲi.fik]', translation: 'Ajoyib, go\'zal', langCode: 'fr-FR', exampleSentence: 'Paris est une ville magnifique.', exampleTranslation: 'Parij juda go\'zal shahar.', level: 'A1' },
        ],
        quiz: [
          {
            id: 'q-fr-1',
            question: "'Nous sommes' jumlasining ma'nosi nima?",
            options: ["Biz talabamiz", "Bizmiz / Biz bo'lamiz", "Sizsiz", "Ular bor"],
            correctAnswerIndex: 1,
            explanation: "'Nous sommes' — 'Être' fe'lining 'Biz' shaxsiga mos shakli bo'lib, 'Bizmiz' degan ma'noni beradi.",
          },
        ],
      },
    ],
  },
  {
    id: 'korean-b2',
    name: 'Koreys Tili (A1 - B2)',
    originalName: '한국어 마스터',
    category: 'korean',
    flag: '🇰🇷',
    description: "Hangeul (한글) alifbosidan boshlab B2 darajasidagi rasmiy va norasmiy muloqot hamda TOPIK imtihoniga tayyorgarlik.",
    maxLevel: 'B2',
    totalLessons: 8,
    estimatedHours: 50,
    lessons: [
      {
        id: 'ko-a1-1',
        courseId: 'korean-b2',
        level: 'A1',
        order: 1,
        title: "Hangeul Alifbosi va Hurmat Shakllari (-요 / -습니다)",
        subtitle: 'Koreys alifbosining mantiqiy tuzilishi va kundalik salomlashish',
        durationMinutes: 22,
        xpReward: 50,
        overview: "Koreys alifbosi Qirol Sejong tomonidan juda mantiqiy yaratilgan. Unlilar osmon, yer va inson falsafasiga asoslangan.",
        grammarRules: [
          {
            title: "1. Hurmat darajalari (-ㅂ니다 / -어요)",
            description: "Rasmiy holatda: -습니다/ㅂ니다. Kundalik muloyim holatda: -아/어요.",
            examples: [
              { target: "안녕하세요? (Annyeonghaseyo?)", uzbek: "Salom, assalomu alaykum (Kundalik muloyim)" },
              { target: "감사합니다 (Gamsahamnida)", uzbek: "Katta rahmat (Rasmiy hurmat)" },
            ],
          },
        ],
        vocabulary: [
          { id: 'ko-1', word: '안녕하세요', transcription: '[annyeonghaseyo]', translation: 'Assalomu alaykum', langCode: 'ko-KR', exampleSentence: '안녕하세요, 만나서 반갑습니다.', exampleTranslation: 'Assalomu alaykum, uchrashganimdan xursandman.', level: 'A1' },
          { id: 'ko-2', word: '감사합니다', transcription: '[gamsahamnida]', translation: 'Rahmat', langCode: 'ko-KR', exampleSentence: '도와주셔서 감사합니다.', exampleTranslation: 'Yordamingiz uchun rahmat.', level: 'A1' },
        ],
        quiz: [
          {
            id: 'q-ko-1',
            question: "Koreys tilida muloyim salomlashish qaysi?",
            options: ["안녕하세요 (Annyeonghaseyo)", "잘 가 (Jal ga)", "미안해 (Mianhae)", "네 (Ne)"],
            correctAnswerIndex: 0,
            explanation: "안녕하세요 — koreys tilidagi standart muloyim salomlashish iborasidir.",
          },
        ],
      },
    ],
  },
];
