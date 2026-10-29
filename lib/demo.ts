const photo = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
export const pictures = {
  selfie: "/couple-selfie.png",
  hero: photo("photo-1511285560929-80b456fea0bc", 1800),
  sarah: photo("photo-1534528741775-53994a69daeb", 300),
  julien: photo("photo-1500648767791-00dcc994a43e", 300),
  coach: photo("photo-1518611012118-696072aa579a", 700),
  photographer: photo("photo-1544005313-94ddf0286df2", 700),
  rings: photo("photo-1512163143273-bde0e3cc7407"),
  flowers: photo("photo-1525310072745-f49212b5ac6d"),
  suit: photo("photo-1594938298603-c8148c4dae35"),
  venue: photo("photo-1519167758481-83f550bb49b3"),
  couple: photo("photo-1529333166437-7750a6dd5a70"),
  moodboard: photo("photo-1434030216411-0b793f4b4173", 700),
  party: photo("photo-1511795409834-ef04bbd61622", 700),
  speech: photo("photo-1455390582262-044cdead277a", 700),
  witnesses: photo("photo-1517457373958-b7bdd4587205", 700),
  dinner: photo("photo-1414235077428-338989a2e8c0"),
};
export const couples = [
  {
    name: "Léa & Thomas",
    city: "Paris",
    month: "Juin 2027",
    img: photo("photo-1522673607200-164d1b6ce486", 500),
  },
  {
    name: "Manon & Romain",
    city: "Nice",
    month: "Mai 2027",
    img: photo("photo-1516589178581-6cd7833ae3b2", 500),
  },
  {
    name: "Julie & Maxime",
    city: "Provence",
    month: "Août 2027",
    img: photo("photo-1529636798458-92182e662485", 500),
  },
  {
    name: "Chloé & Hugo",
    city: "Bordeaux",
    month: "Septembre 2027",
    img: photo("photo-1511285560929-80b456fea0bc", 500),
  },
];
export const offers = [
  {
    id: "monsieur",
    name: "By Monsieur",
    category: "Costumes",
    city: "Paris",
    image: pictures.julien,
    specialty: "Costumes sur-mesure",
    signature: "Hugo, co-fondateur",
    desc: "Créer des tenues qui vous ressemblent vraiment, pour que vous vous sentiez vous, simplement en mieux.",
    individual: "−15 % sur votre costume",
    collective: "−30 % par couple avec un autre couple",
    saving: 240,
  },
  {
    id: "coach",
    name: "Anaïs Coaching",
    category: "Sport",
    city: "Paris · En ligne",
    image: pictures.coach,
    specialty: "Coaching sportif mariage",
    signature: "Anaïs",
    desc: "Mon objectif : que vous vous sentiez le mieux possible dans votre corps pour profiter pleinement de cette période unique.",
    individual: "−15 % sur votre programme",
    collective: "−30 % par couple avec un autre couple",
    saving: 90,
  },
  {
    id: "lucie",
    name: "Lucie Photographie",
    category: "Photographes",
    city: "Île-de-France · Provence",
    image: pictures.photographer,
    specialty: "Photographe de mariage",
    signature: "Lucie",
    desc: "Des photos naturelles, vraies et pleines d’émotion, pour revivre votre journée comme si vous y étiez encore.",
    individual: "−15 % sur votre reportage",
    collective: "−30 % par couple avec un autre couple",
    saving: 450,
  },
  {
    id: "fleurs",
    name: "Atelier Pivoine",
    category: "Fleuristes",
    city: "Paris",
    image: pictures.flowers,
    desc: "Des fleurs de saison, un peu de poésie et beaucoup d’amour.",
    individual: "−10 % sur votre décoration",
    collective: "−20 % à partir de 5 couples",
    saving: 180,
  },
  {
    id: "lieu",
    name: "La Maison des oliviers",
    category: "Lieux de réception",
    city: "Provence",
    image: pictures.venue,
    desc: "Une parenthèse sous les oliviers pour célébrer votre histoire.",
    individual: "−10 % sur la privatisation",
    collective: "−15 % avec 3 couples",
    saving: 600,
  },
  {
    id: "photo",
    name: "Les instants doux",
    category: "Photographes",
    city: "Nice",
    image: pictures.hero,
    desc: "Des images vivantes pour garder la beauté des petits instants.",
    individual: "−10 % sur votre reportage",
    collective: "−15 % avec un autre couple",
    saving: 150,
  },
  {
    id: "robe",
    name: "Maison Éloïse",
    category: "Robes de mariée",
    city: "Paris",
    image: couples[2].img,
    desc: "Des matières délicates et une silhouette toute à vous.",
    individual: "Retouches offertes",
    collective: "−15 % à deux couples",
    saving: 200,
  },
  {
    id: "table",
    name: "À notre table",
    category: "Traiteurs",
    city: "Bordeaux",
    image: pictures.dinner,
    desc: "Une cuisine généreuse pour les grandes tablées heureuses.",
    individual: "−10 % sur le menu",
    collective: "−15 % à 5 couples",
    saving: 300,
  },
  {
    id: "resto",
    name: "Les heures heureuses",
    category: "Restaurants",
    city: "Paris",
    image: pictures.dinner,
    desc: "Un dîner à deux, juste pour le plaisir de se retrouver.",
    individual: "−15 % sur le dîner",
    collective: "−20 % à deux couples",
    saving: 30,
  },
  {
    id: "spa",
    name: "Le refuge",
    category: "Spas et expériences",
    city: "Nice",
    image: pictures.venue,
    desc: "Une pause douce à partager, avant ou après le grand jour.",
    individual: "−10 % sur le duo",
    collective: "−20 % à 3 couples",
    saving: 45,
  },
];
type Witness = {
  name: string;
  mission: string;
  planning: boolean;
  budget: boolean;
  party: boolean;
};
type Post = {
  id: number;
  author: string;
  text: string;
  likes: number;
  liked: boolean;
  comments: string[];
};
export type Data = {
  followingCouples: string[];
  tribeLikes: string[];
  savedCouples: string[];
  tribeComments: Record<string, string[]>;
  weddingStyle: string;
  inspiration: string;
  partyPlan: string;
  speechDraft: string;
  savedPosts: number[];
  members: string[];
  conversations: Record<string, string[]>;
  messages: string[];
  done: string[];
  favorites: string[];
  joined: string[];
  witnesses: Witness[];
  posts: Post[];
  budget: number;
  expenses: { name: string; amount: number }[];
  memories: string[];
  answer: string;
  date: string;
  auto: boolean;
  groups: string[];
  chat: { role: string; text: string }[];
};
export const initial: Data = {
  followingCouples: [],
  tribeLikes: [],
  savedCouples: [],
  tribeComments: {},
  weddingStyle: "Naturel",
  inspiration: "",
  partyPlan: "",
  speechDraft: "",
  savedPosts: [],
  members: ["Sarah", "Julien"],
  conversations: {},
  messages: [
    "J’ai hâte de te voir quand tu seras devant moi, juste avant la cérémonie. Je sais que tu vas pleurer.",
    "Ce que j’aime le plus, c’est qu’on soit une équipe dans tout, même dans le stress. Avec toi, tout est plus simple.",
  ],
  done: [],
  favorites: [],
  joined: [],
  witnesses: [],
  posts: [
    {
      id: 1,
      author: "Léa & Thomas",
      text: "On cherche des idées pour un dîner en extérieur ! Vous avez des recommandations ?",
      likes: 24,
      liked: false,
      comments: ["Manon : Cet endroit a l’air magique !"],
    },
  ],
  budget: 20000,
  expenses: [
    { name: "Lieu de réception", amount: 4500 },
    { name: "Photographe", amount: 1800 },
  ],
  memories: [],
  answer: "",
  date: "2027-04-17",
  auto: false,
  groups: [],
  chat: [],
};

export const coupleStories = [
  {
    text: "On hésite pour le traiteur… Vous avez des recommandations ?",
    likes: 24,
  },
  {
    text: "Plutôt dîner en extérieur ou grande salle ? On aimerait vos avis !",
    likes: 36,
  },
  {
    text: "Des idées de faire-part originaux et pleins de personnalité ?",
    likes: 18,
  },
  {
    text: "Notre playlist prend forme ! Quelle chanson pour votre première danse ?",
    likes: 29,
  },
];
export const providerCategories = [
  { name: "Lieux", category: "Lieux de réception", image: pictures.venue },
  { name: "Traiteur", category: "Traiteurs", image: pictures.dinner },
  { name: "Photo", category: "Photographes", image: pictures.photographer },
  { name: "Fleurs", category: "Fleuristes", image: pictures.flowers },
  { name: "Tenues", category: "Costumes", image: pictures.suit },
];
