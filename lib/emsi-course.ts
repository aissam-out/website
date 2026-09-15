export type EmsiSlide = {
  session: number;
  title: string;
  area: string;
  description: string;
  /** Directory slug under /slides/emsi/ */
  id: string;
  pageCount: number;
  thumb: string;
  pdf: string;
};

/**
 * Course deck metadata. Page images live at
 * `/slides/emsi/{id}/01.webp` … `NN.webp`.
 * Full decks are also available as compressed PDFs for download.
 */
export const emsiCourseSlides: readonly EmsiSlide[] = [
  {
    session: 1,
    title: "The AI Context & Environment",
    area: "Foundations",
    description:
      "The evolution of AI, the relationship between AI, ML, DL and transformers, and the Python/Colab environment used throughout the course.",
    id: "01-ai-context",
    pageCount: 17,
    thumb: "/slides/emsi/01-ai-context/01.webp",
    pdf: "/slides/emsi/01-ai-context/deck.pdf",
  },
  {
    session: 2,
    title: "Data Preprocessing & Quality",
    area: "Data",
    description:
      "Missing data, noise, inconsistencies, cleaning, transformations, scaling, encoding and class imbalance.",
    id: "02-data-preprocessing",
    pageCount: 5,
    thumb: "/slides/emsi/02-data-preprocessing/01.webp",
    pdf: "/slides/emsi/02-data-preprocessing/deck.pdf",
  },
  {
    session: 3,
    title: "Machine Learning Workflow & Metrics",
    area: "Machine Learning",
    description:
      "Supervised, unsupervised and reinforcement learning, train/validation/test splits, MSE, MAE, confusion matrices, precision and recall.",
    id: "03-ml-workflow-metrics",
    pageCount: 25,
    thumb: "/slides/emsi/03-ml-workflow-metrics/01.webp",
    pdf: "/slides/emsi/03-ml-workflow-metrics/deck.pdf",
  },
  {
    session: 4,
    title: "Classical Algorithms",
    area: "Machine Learning",
    description:
      "Linear and logistic regression, KNN, SVMs, decision trees, Random Forest, boosting and model benchmarking.",
    id: "04-classical-algorithms",
    pageCount: 18,
    thumb: "/slides/emsi/04-classical-algorithms/01.webp",
    pdf: "/slides/emsi/04-classical-algorithms/deck.pdf",
  },
  {
    session: 5,
    title: "Deep Learning Foundations",
    area: "Deep Learning",
    description:
      "The mathematical neuron, weights, bias, nonlinear activations, network composition and overfitting.",
    id: "05-deep-learning-foundations",
    pageCount: 28,
    thumb: "/slides/emsi/05-deep-learning-foundations/01.webp",
    pdf: "/slides/emsi/05-deep-learning-foundations/deck.pdf",
  },
  {
    session: 6,
    title: "Optimization & Gradient Descent",
    area: "Deep Learning",
    description:
      "Batch, stochastic and mini-batch gradient descent, momentum, RMSProp, Adam and learning-rate behavior.",
    id: "06-optimization-gradient-descent",
    pageCount: 27,
    thumb: "/slides/emsi/06-optimization-gradient-descent/01.webp",
    pdf: "/slides/emsi/06-optimization-gradient-descent/deck.pdf",
  },
  {
    session: 7,
    title: "Hyperparameters & Training Challenges",
    area: "Deep Learning",
    description:
      "Batch size, epochs, hidden layers, dropout, initialization, normalization, automated search and transfer learning.",
    id: "07-training-challenges",
    pageCount: 21,
    thumb: "/slides/emsi/07-training-challenges/01.webp",
    pdf: "/slides/emsi/07-training-challenges/deck.pdf",
  },
  {
    session: 8,
    title: "Convolutional Neural Networks",
    area: "Architectures",
    description:
      "Local filters, shared parameters, pooling, hierarchical visual features and practical CNN construction.",
    id: "08-cnns",
    pageCount: 17,
    thumb: "/slides/emsi/08-cnns/01.webp",
    pdf: "/slides/emsi/08-cnns/deck.pdf",
  },
  {
    session: 9,
    title: "Recurrent Neural Networks",
    area: "Architectures",
    description:
      "Sequential computation, hidden state, temporal dependencies and backpropagation through time.",
    id: "09-rnns",
    pageCount: 18,
    thumb: "/slides/emsi/09-rnns/01.webp",
    pdf: "/slides/emsi/09-rnns/deck.pdf",
  },
  {
    session: 10,
    title: "Transformers & Attention",
    area: "Transformers",
    description:
      "Queries, keys, values, self-attention, transformer blocks and practical experiments with LLM inference controls.",
    id: "10-transformers-attention",
    pageCount: 20,
    thumb: "/slides/emsi/10-transformers-attention/01.webp",
    pdf: "/slides/emsi/10-transformers-attention/deck.pdf",
  },
  {
    session: 11,
    title: "LLM Features & AI Ethics",
    area: "LLM Systems",
    description:
      "RAG, fine-tuning, RLHF, adversarial attacks, AI safety, ethics and function calling.",
    id: "11-llm-features-ethics",
    pageCount: 15,
    thumb: "/slides/emsi/11-llm-features-ethics/01.webp",
    pdf: "/slides/emsi/11-llm-features-ethics/deck.pdf",
  },
] as const;

export function slidePageSrc(deckId: string, page: number) {
  return `/slides/emsi/${deckId}/${String(page).padStart(2, "0")}.webp`;
}
