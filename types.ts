
export type TestType = 'career' | 'personality' | 'skills';

export type Question = string;

export interface Tests {
  career: Question[];
  personality: Question[];
  skills: Question[];
}

export type Answers = Record<number, string>;

export interface RecommendationResult {
  recommendations: string[];
  reasoning: string;
}
