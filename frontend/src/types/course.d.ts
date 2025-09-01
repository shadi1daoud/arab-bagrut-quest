
// Type definitions for course-related components

export interface Unit {
  id: string;
  number: number;
  title: string;
  status: 'idle' | 'in-progress' | 'completed';
  duration: string;
  hasStreak?: boolean;
  videoSrc?: string;
  chapters?: {
    time: number;
    title: string;
  }[];
  pdfUrl?: string;
  notes?: string;
  faqs?: {
    question: string;
    answer: string;
    timestamps?: {
      time: number;
      label: string;
    }[];
  }[];
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  grade: string;
  description: string;
  progress: number;
  totalXP: number;
  totalUnits: number;
  units: Unit[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  type: 'multiple-choice' | 'true-false';
}
