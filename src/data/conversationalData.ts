import { ConversationalConnector, SpokenSentenceTemplate } from '../types';

export const CONVERSATIONAL_CONNECTORS: ConversationalConnector[] = [
  {
    id: 'conn-opinion',
    category: 'fikr_bildirish',
    titleUzbek: "Mustaqil Fikr Bildirish & Pozitsiyani Himoya Qilish",
    patterns: [
      {
        target: "As far as I'm concerned, consistency beats talent every single day.",
        uzbek: "Mening fikrimcha, muntazamlik har kuni iste'doddan ustun turadi.",
        langCode: "en-US",
        context: "O'z shaxsiy nuqtai nazaringizni erkin bayon qilishda",
      },
      {
        target: "По правде говоря, постоянная практика важнее всего.",
        uzbek: "Rostini aytganda, doimiy amaliyot hammasidan muhimroq.",
        langCode: "ru-RU",
        context: "Samimiy va ishonchli suhbatda",
      },
      {
        target: "Bana kalırsa, her gün az da olsa pratik yapmak gerekir.",
        uzbek: "Menga qolsa, har kuni oz bo'lsa ham mashq qilish zarur.",
        langCode: "tr-TR",
        context: "Turkcha erkin muloqotda fikr berish",
      },
      {
        target: "Meiner Auffassung nach ist disziplinierte Übung der Schlüssel.",
        uzbek: "Mening tushunchamga ko'ra, intizomli mashq kalit hisoblanadi.",
        langCode: "de-DE",
        context: "Nemischa mustaqil fikr bildirish",
      },
    ],
  },
  {
    id: 'conn-debate',
    category: 'muhokama',
    titleUzbek: "Qarshi Fikr Bildirish va Yumshoq E'tiroz",
    patterns: [
      {
        target: "I see your point, but on the other hand, we need to consider the risks.",
        uzbek: "Fikringizni tushundim, biroq boshqa tomondan, xatarlarni ham hisobga olishimiz kerak.",
        langCode: "en-US",
        context: "Madaniyatli va diplomatik bahsda",
      },
      {
        target: "С одной стороны вы правы, но с другой стороны есть нюансы.",
        uzbek: "Bir tomondan haqiqat bor, lekin ikkinchi tomondan nozik jihatlar ham mavjud.",
        langCode: "ru-RU",
        context: "Muzokaralarda muvozanatli javob berish",
      },
      {
        target: "Haklısınız ama diğer taraftan farklı bir yol da var.",
        uzbek: "Haqsiez, lekin boshqa tomondan boshqacha yo'l ham bor.",
        langCode: "tr-TR",
        context: "Turkchada suhbatdoshni hurmat qilgan holda e'tiroz bildirish",
      },
    ],
  },
  {
    id: 'conn-fillers',
    category: 'kundalik_ibora',
    titleUzbek: "Vaqt Yutish va Tabiiy Pauzalar (Hesitation Devices)",
    patterns: [
      {
        target: "What I'm trying to say is that results take time.",
        uzbek: "Aytmoqchi bo'lganim shuki, natijalar ma'lum vaqt talab qiladi.",
        langCode: "en-US",
        context: "Fikrni aniqlashtirish va pauzani tabiiy to'ldirish",
      },
      {
        target: "Дело в том, что свободное владение языком требует смелости.",
        uzbek: "Gap shundaki, tilni ravon bilish jasorat talab qiladi.",
        langCode: "ru-RU",
        context: "Suhbatni jonlantiruvchi kirish iborasi",
      },
      {
        target: "Şöyle ki, konuştukça dil engeli ortadan kalkar.",
        uzbek: "Shundayki, gapirgan sari til to'sig'i yo'qoladi.",
        langCode: "tr-TR",
        context: "Sodda va jonli turkcha tushuntirish",
      },
    ],
  },
];

export const SPOKEN_SENTENCE_TEMPLATES: SpokenSentenceTemplate[] = [
  {
    id: 'tpl-en-1',
    title: 'Inglizcha Kundalik Fikr Bildirish',
    language: 'Ingliz tili (English)',
    langCode: 'en-US',
    prefix: { target: "To be completely honest,", uzbek: "Rostini aytsam," },
    middles: [
      { target: "I really believe that", uzbek: "men qat'iy ishonamanki," },
      { target: "I tend to prefer", uzbek: "men ko'proq ma'qul ko'ramanki," },
      { target: "we should definitely focus on", uzbek: "biz albatta e'tiborni qaratishimiz kerak," },
      { target: "it is impossible to ignore", uzbek: "buni e'tibordan chetda qoldirib bo'lmaydiki," },
    ],
    suffixes: [
      { target: "practical daily speaking habits.", uzbek: "amaliy kundalik so'zlashuv odatlariga." },
      { target: "real-world programming challenges.", uzbek: "real hayotdagi dasturlash masalalariga." },
      { target: "building continuous mental resilience.", uzbek: "uzluksiz ruhiy bardoshni rivojlantirishga." },
      { target: "making fast progress towards C1 level.", uzbek: "C1 darajasi sari tezkor ildamlab borishga." },
    ],
  },
  {
    id: 'tpl-ru-1',
    title: 'Ruscha Jonli Muloqot va Argument',
    language: 'Rus tili (Русский)',
    langCode: 'ru-RU',
    prefix: { target: "Если говорить откровенно,", uzbek: "Ochiq aytganda," },
    middles: [
      { target: "мне кажется, что", uzbek: "menga shunday tuyuladiki," },
      { target: "очень важно понимать, что", uzbek: "shuni tushunish o'ta muhimki," },
      { target: "мы можем легко преодолеть", uzbek: "biz osonlik bilan yengib o'tamiz," },
      { target: "ключевой фактор заключается в том, что", uzbek: "asosiy omil shundan iboratki," },
    ],
    suffixes: [
      { target: "любой языковой барьер с практикой.", uzbek: "amaliyot orqali har qanday til to'sig'ini." },
      { target: "уверенность приходит во время диалога.", uzbek: "ishonch bevosita suhbat jarayonida keladi." },
      { target: "современные технологии открывают двери.", uzbek: "zamonaviy texnologiyalar yangi eshiklarni ochadi." },
    ],
  },
  {
    id: 'tpl-tr-1',
    title: 'Turkcha Samimiy So\'zlashuv Iboralari',
    language: 'Turk tili (Türkçe)',
    langCode: 'tr-TR',
    prefix: { target: "Açıkçası,", uzbek: "Ochiq aytganda," },
    middles: [
      { target: "benim düşünceme göre", uzbek: "mening fikrimcha" },
      { target: "hiç şüphe yok ki", uzbek: "hech shubhasizki" },
      { target: "düzenli olarak çalışırsak", uzbek: "agar tartibli o'rgansak" },
    ],
    suffixes: [
      { target: "kısa sürede akıcı konuşabiliriz.", uzbek: "qisqa fursatda ravon gaplasha olamiz." },
      { target: "büyük bir başarı elde ederiz.", uzbek: "katta muvaffaqiyatga erishamiz." },
      { target: "yeni bir dünyaya adım atarız.", uzbek: "yangi bir dunyoga qadam qo'yamiz." },
    ],
  },
];
