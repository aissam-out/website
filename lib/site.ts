export const site = {
  name: "Epistemic Noise",
  domain: "https://epistemicnoise.com",
  author: "Aissam Outchakoucht",
  email: "aissam.outchakoucht@gmail.com",
  tagline: "I build systems that learn from the world. I write about why we struggle to.",
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

/** User-facing labels for content kinds. Public URLs: /notes, /essays, /projects. */
export const kindLabels = {
  reads: {
    singular: "Note",
    plural: "Notes",
    closer: "End of note",
    promise: "Short observations on building, evaluating, and operating AI systems.",
  },
  thoughts: {
    singular: "Essay",
    plural: "Essays",
    closer: "End of essay",
    promise: "Longer writing on knowing and uncertainty.",
  },
  articles: {
    singular: "Project",
    plural: "Projects",
    closer: "End of project",
    promise: "Things that shipped.",
  },
  projects: {
    singular: "Project",
    plural: "Projects",
    closer: "End of project",
    promise: "Things that shipped.",
  },
} as const;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/notes", label: "Notes" },
  { href: "/essays", label: "Essays" },
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
      "AI engineer working on conversational systems, and the questions they leave open.",
  },
  {
    href: "/projects",
    eyebrow: "02",
    title: "Projects",
    description:
      "Darija, voice, chatbots, and production AI systems, from early shipping to current work.",
  },
  {
    href: "/notes",
    eyebrow: "03",
    title: "Notes",
    description:
      "Short observations on building, evaluating, and operating AI systems.",
  },
  {
    href: "/essays",
    eyebrow: "04",
    title: "Essays",
    description:
      "Longer writing on certainty, perception, and how much of what we call knowing actually stands.",
  },
] as const;

export const beliefs = [
  {
    title: "Measure the uncertainty",
    body: "A lot of what people call knowledge is borrowed confidence. The useful move is to notice where the chain of justification actually stops.",
    href: "/essays",
    linkLabel: "Read the essays",
  },
  {
    title: "Ship conversational systems",
    body: "Chat, voice, agents. The interesting work is not the demo; it is the system that holds up when a real person starts talking.",
    href: "/projects",
    linkLabel: "See the projects",
  },
  {
    title: "Open-source Darija",
    body: "Moroccan dialect is spoken by millions and still under-served in NLP. Datasets and tools should exist in the open.",
    href: "/projects/darija-open-dataset",
    linkLabel: "Darija Open Dataset",
  },
  {
    title: "Write in public",
    body: "Short notes, long essays, shipped projects. Writing is how the work gets inspected: by you first, then by anyone else.",
    href: "/notes",
    linkLabel: "Browse the notes",
  },
] as const;

export const stats = [
  { value: "8+", label: "Years in AI" },
  { value: "500k", label: "DODa entries" },
  { value: "16", label: "Two-minute notes" },
  { value: "11", label: "Papers on Scholar" },
] as const;

export const noteCategories = [
  { id: "all", label: "All" },
  { id: "systems", label: "Systems" },
  { id: "agents", label: "Agents" },
  { id: "retrieval", label: "Retrieval" },
  { id: "evaluation", label: "Evaluation" },
  { id: "inference", label: "Inference" },
  { id: "models", label: "Models" },
] as const;

/** Human labels for frontmatter categories shown on related cards. */
export const categoryLabels: Record<string, string> = {
  systems: "Systems",
  agents: "Agents",
  retrieval: "Retrieval",
  evaluation: "Evaluation",
  inference: "Inference",
  models: "Models",
  reads: "Note",
  thoughts: "Essay",
  articles: "Project",
  projects: "Project",
};

export const timeline = [
  {
    period: "2025–now",
    title: "AI Specialist, inwi",
    place: "Casablanca",
    body: "Conversational AI inside a telecommunications company: production systems, not slides.",
  },
  {
    period: "2022–2025",
    title: "Conversational AI Specialist, Affiniti AI",
    place: "London",
    body: "AI for mental health. Helping therapists deliver better outcomes to more patients.",
  },
  {
    period: "2019–2022",
    title: "Head of R&D, MonarkIT",
    place: "Marrakech",
    body: "Chatbots and voice assistants. Built conversational products and the research behind them.",
  },
  {
    period: "2017–2022",
    title: "PhD, IoT security & machine learning",
    place: "ENSEM, Casablanca",
    body: "Access control, blockchain, and ML for the Internet of Things.",
  },
  {
    period: "2014–2016",
    title: "MSc, Cryptography and Information Security",
    place: "Mohammed V University, Rabat",
    body: "The cryptographic and security foundations that still shape how I think about systems.",
  },
];

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
    title: "Moroccan Dialect (Darija) Open Dataset",
    year: "2021",
    href: "https://arxiv.org/abs/2103.09687",
    venue: "arXiv",
    citations: 32,
  },
];

export type StackItem = {
  name: string;
  /** simple-icons slug, or a local path under /icons/… */
  icon: string;
};

export const stackCapabilities = [
  "LLM Systems",
  "Retrieval",
  "Speech AI",
  "GPU Infrastructure",
] as const;

export const stackIntro =
  "I build AI systems from model to production: inference, retrieval, speech, GPU workloads, APIs, and the infrastructure that keeps them running.";

export const stackGroups: ReadonlyArray<{
  label: string;
  items: ReadonlyArray<StackItem>;
}> = [
  {
    label: "Machine Learning",
    items: [
      { name: "Python", icon: "python" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "Hugging Face", icon: "huggingface" },
      { name: "scikit-learn", icon: "scikitlearn" },
      { name: "NumPy", icon: "numpy" },
      { name: "CUDA", icon: "nvidia" },
    ],
  },
  {
    label: "AI Engineering",
    items: [
      { name: "FastAPI", icon: "fastapi" },
      { name: "vLLM", icon: "vllm" },
      { name: "Transformers", icon: "/icons/stack/transformers.svg" },
      {
        name: "OpenAI API",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/openai.svg",
      },
      { name: "MCP", icon: "modelcontextprotocol" },
      { name: "MLflow", icon: "mlflow" },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Linux", icon: "linux" },
      { name: "Nginx", icon: "nginx" },
      { name: "AWS", icon: "/icons/stack/aws.svg" },
      { name: "Google Cloud", icon: "googlecloud" },
      { name: "Git", icon: "git" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "Prometheus", icon: "prometheus" },
      { name: "Grafana", icon: "grafana" },
      { name: "Terraform", icon: "terraform" },
      { name: "NVIDIA GPU Operator", icon: "nvidia" },
    ],
  },
  {
    label: "Data & Retrieval",
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Redis", icon: "redis" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Qdrant", icon: "qdrant" },
      { name: "MinIO", icon: "minio" },
      { name: "Elasticsearch", icon: "elasticsearch" },
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
      "A five-part path from Alexa concepts to a working Rock-Paper-Scissors skill, then APL, multilingual support, and monetization, all in Python.",
    startLabel: "Start with the introduction",
  },
  "ai-system-design": {
    blurb:
      "A reference design for an assistant platform, followed from product guarantees through knowledge, durable execution, load, and controlled change.",
    startLabel: "Start with architecture",
  },
};

export function labelForCategory(value: string) {
  return categoryLabels[value] ?? categoryLabels[value.toLowerCase()] ?? value;
}
