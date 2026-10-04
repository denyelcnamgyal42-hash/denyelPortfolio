export const portfolio = {
  name: 'Denyel Chokey Namgyal',
  intro:
    'I build AI systems across machine learning, NLP, computer vision and intelligent applications while exploring how these systems can also be made secure.',
  focus: ['Artificial Intelligence', 'Machine Learning', 'NLP', 'Computer Vision', 'Cybersecurity'],
  projects: [
    {
      name: 'Dzonglish NLP',
      summary: 'A pipeline for code-mixed Romanized Dzongkha and English.',
      stack: ['SVM', 'CRF', 'XLM-R', 'ByT5'],
      dataset: '2,500+ messages',
    },
    {
      name: 'Smart Attendance Management',
      summary: 'Computer vision for real-time presence tracking.',
      stack: ['YOLO', 'DeepFace'],
    },
    {
      name: 'EduGuide Bhutan',
      summary: 'Retrieval, mock exams and educational guidance.',
      stack: ['RAG'],
    },
    { name: 'JobScoutAI', summary: 'Intelligent job discovery and matching.', stack: ['FastAPI'] },
    {
      name: 'LogGuard',
      summary: 'Sliding-window detection of repeated failed SSH logins.',
      stack: ['CLI', 'Security'],
    },
    {
      name: 'HumanWrite',
      summary: 'A writing assistant with retrieval-based style analysis.',
      stack: ['LLM', 'Groq'],
    },
  ],
};
export const sections = [
  'About',
  'Projects',
  'Research',
  'Skills',
  'Experience',
  'Contact',
] as const;
export type Section = 'home' | 'intro' | 'core' | 'Resume' | (typeof sections)[number];
