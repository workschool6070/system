export type QuestionType = 
  | 'mcq' 
  | 'true_false' 
  | 'matching' 
  | 'ordering' 
  | 'scenario';

export type CategoryType = 
  | 'process_management' 
  | 'memory_management' 
  | 'io_management' 
  | 'file_management';

export interface BaseQuestion {
  id: string;
  category: CategoryType;
  title: string;
  question: string;
  hint?: string;
  explanation: string;
  points: number;
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
}

export interface McqQuestion extends BaseQuestion {
  type: 'mcq';
  options: { id: string; text: string; code?: string }[];
  correctOptionId: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true_false';
  isCorrect: boolean;
  correctionIfFalse?: string;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  pairs: {
    id: string;
    term: string;
    definition: string;
  }[];
}

export interface OrderingQuestion extends BaseQuestion {
  type: 'ordering';
  items: { id: string; text: string; order: number }[];
  orderedDescription: string;
}

export interface ScenarioQuestion extends BaseQuestion {
  type: 'scenario';
  scenario: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
}

export type Question = 
  | McqQuestion 
  | TrueFalseQuestion 
  | MatchingQuestion 
  | OrderingQuestion 
  | ScenarioQuestion;

export interface WorksheetModule {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  iconName: string;
  category: CategoryType;
  learningObjectives: string[];
  lessonExplanation?: {
    conceptTitle: string;
    overview: string;
    keyPoints: string[];
    realWorldExample: string;
    goldenRule: string;
  };
  questions: Question[];
  summaryNotes?: string[];
}

export interface StudentProfile {
  name: string;
  schoolName: string;
  gradeClass: string;
  academicNumber: string;
}

export interface StudentAnswers {
  [questionId: string]: any;
}

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  score: number;
  totalPoints: number;
  answers: StudentAnswers;
}

export interface AssessmentResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  categoryScores: {
    [key in CategoryType]: { score: number; maxScore: number; percentage: number };
  };
  strengths: string[];
  areasForImprovement: string[];
  gradeLevel: 'ممتاز' | 'جيد جداً' | 'جيد' | 'بحاجة لمراجعة';
  timestamp: string;
}

export interface FlashcardItem {
  id: string;
  topic: string;
  front: string;
  back: string;
  keyTakeaway: string;
  category: CategoryType;
}
