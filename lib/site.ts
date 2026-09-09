export const site = {
  name: "Epistemic Noise",
  domain: "https://epistemicnoise.com",
  author: "Aissam Outchakoucht",
  email: "aissam.outchakoucht@gmail.com",
  tagline: "I build systems that understand language. I write about why we often don’t.",
  description:
    "Aissam Outchakoucht builds language, speech, and agentic AI systems, and writes about uncertainty, perspective, intelligence, and the strange business of knowing things.",
  gaId: "G-LSTZ3JZNVP",
  socials: {
    github: "https://github.com/aissam-out",
    linkedin: "https://www.linkedin.com/in/aissam-outchakoucht/",
    x: "https://twitter.com/aissam_out",
    medium: "https://aissam-outchakoucht.medium.com/",
    scholar: "https://scholar.google.com/citations?user=Py3xMSMAAAAJ&hl=en",
  },
} as const;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/reads", label: "Reads" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/articles", label: "Articles" },
] as const;

export const marqueeItems = [
  "Artificial Intelligence",
  "Language",
  "Perspective",
  "Open Source",
  "Uncertainty",
  "Agents",
  "Knowledge",
  "Speech",
];

export const rooms = [
  {
    href: "/about",
    eyebrow: "01",
    title: "About",
    description:
      "AI engineer working on conversational systems — and the questions they leave open.",
  },
  {
    href: "/projects",
    eyebrow: "02",
    title: "Projects",
    description:
      "Darija datasets and libraries, production ML pipelines, chatbots, and voice skills.",
  },
  {
    href: "/reads",
    eyebrow: "03",
    title: "2-minute reads",
    description:
      "NLP boiled down. Foundations to advanced techniques, packed into a short note.",
  },
  {
    href: "/thoughts",
    eyebrow: "04",
    title: "Thoughts",
    description:
      "Essays on certainty, perception, and how much of what we call knowing actually stands.",
  },
] as const;

export const beliefs = [
  {
    title: "Measure the uncertainty",
    body: "A lot of what people call knowledge is borrowed confidence. The useful move is to notice where the chain of justification actually stops.",
  },
  {
    title: "Ship conversational systems",
    body: "Chat, voice, agents. The interesting work is not the demo — it is the system that holds up when a real person starts talking.",
  },
  {
    title: "Open-source Darija",
    body: "Moroccan dialect is spoken by millions and still under-served in NLP. Datasets and tools should exist in the open.",
  },
  {
    title: "Write in public",
    body: "Short notes, long essays, tutorials. Writing is how the work gets inspected — by you first, then by anyone else.",
  },
] as const;

export const stats = [
  { value: "8+", label: "Years in AI" },
  { value: "500k", label: "DODa entries" },
  { value: "61", label: "2-minute notes" },
  { value: "11", label: "Papers" },
] as const;

export const timeline = [
  {
    period: "2025 — now",
    title: "AI Specialist, inwi",
    place: "Casablanca",
    body: "Conversational AI inside a telecommunications company — production systems, not slides.",
  },
  {
    period: "2022 — 2025",
    title: "Conversational AI Specialist, Affiniti AI",
    place: "London",
    body: "AI for mental health. Helping therapists deliver better outcomes to more patients.",
  },
  {
    period: "2019 — 2022",
    title: "Head of R&D, MonarkIT",
    place: "Marrakech",
    body: "Chatbots and voice assistants. Built conversational products and the research behind them.",
  },
  {
    period: "2017 — 2022",
    title: "PhD, IoT security & machine learning",
    place: "ENSEM, Casablanca",
    body: "Access control, blockchain, and ML for the Internet of Things.",
  },
  {
    period: "2014 — 2016",
    title: "MSc, Cryptography and Information Security",
    place: "Mohammed V University, Rabat",
    body: "The cryptographic and security foundations that still shape how I think about systems.",
  },
] as const;

export const papers: ReadonlyArray<{
  title: string;
  year: string;
  href: string;
  venue: string;
  citations: number;
}> = [
  {
    title:
      "Dynamic Access Control Policy based on Blockchain and Machine Learning for the Internet of Things",
    year: "2017",
    href: "https://doi.org/10.14569/IJACSA.2017.080757",
    venue: "IJACSA",
    citations: 262,
  },
  {
    title: "A Blockchain-based Access Control for Big Data",
    year: "2017",
    href: "https://ijcncs.org/published/volume5/issue7/index.php",
    venue: "IJCNCS",
    citations: 101,
  },
  {
    title: "Moroccan Dialect — Darija — Open Dataset",
    year: "2021",
    href: "https://arxiv.org/abs/2103.09687",
    venue: "arXiv",
    citations: 32,
  },
];

export type StackItem = {
  name: string;
  icon: string;
};

export const stackGroups: ReadonlyArray<{
  label: string;
  items: ReadonlyArray<StackItem>;
}> = [
  {
    label: "Models & languages",
    items: [
      { name: "Python", icon: "python" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "Keras", icon: "keras" },
      { name: "Flask", icon: "flask" },
    ],
  },
  {
    label: "AI tools",
    items: [
      { name: "ChatGPT", icon: "openai" },
      { name: "Claude", icon: "anthropic" },
      { name: "DeepSeek", icon: "deepseek" },
      { name: "GitHub Copilot", icon: "githubcopilot" },
      { name: "Hugging Face", icon: "huggingface" },
      { name: "Cursor", icon: "cursor" },
    ],
  },
  {
    label: "Systems",
    items: [
      { name: "Alexa", icon: "amazonalexa" },
      { name: "AWS", icon: "amazonwebservices" },
      { name: "DigitalOcean", icon: "digitalocean" },
      { name: "Docker", icon: "docker" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Postgres", icon: "postgresql" },
      { name: "Redis", icon: "redis" },
      { name: "Git", icon: "git" },
    ],
  },
];

/** Flat list kept for any callers that still expect `stack`. */
export const stack: StackItem[] = stackGroups.flatMap((group) => [...group.items]);

export const seriesCopy: Record<
  string,
  { blurb: string; startLabel?: string }
> = {
  "you-know-nothing-jon-snow": {
    blurb:
      "Five chapters on certainty, perception, and how much of what we call knowing actually stands when you look closely.",
    startLabel: "Start with Ring the bells",
  },
  "alexa-skills-with-python": {
    blurb:
      "A hands-on path from first skill to APL, multilingual support, and monetization — written for builders who want the working parts left in.",
    startLabel: "Start with the introduction",
  },
};

