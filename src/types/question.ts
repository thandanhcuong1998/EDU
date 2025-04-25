/**
 * TypeScript interfaces for question-related data structures
 */

/**
 * Token interface for Japanese characters with pronunciation
 */
export interface Token {
  text: string;
  pronunciation: string;
}

/**
 * Question type enum
 */
export type QuestionType = 'radio' | 'card-word-english' | 'card-word-japan' | 'mapping-word';

/**
 * Base Question interface
 */
export interface Question {
  type: QuestionType;
  title: string;
  correctAnswer: number | number[];
}

/**
 * Radio Question interface
 */
export interface RadioQuestion extends Question {
  type: 'radio';
  options: string[];
  images?: string[];
  pronunciation?: string[];
  correctAnswer: number;
}

/**
 * Card Word Question interface
 */
export interface CardWordQuestion extends Question {
  type: 'card-word-english' | 'card-word-japan';
  options: string[] | Token[];
  hintToken: Token[] | string;
  correctAnswer: number[];
}

/**
 * Mapping Word Question interface
 */
export interface MappingWordQuestion extends Question {
  type: 'mapping-word';
  options1: Array<Token & { indexCorrect: number }>;
  options2: Array<{ text: string }>;
}

/**
 * Union type for all question types
 */
export type AnyQuestion = RadioQuestion | CardWordQuestion | MappingWordQuestion;

/**
 * Answer interface
 */
export interface Answer {
  answer: any;
  index: number;
}

/**
 * Card Word Hook Props interface
 */
export interface CardWordHookProps {
  listAnswer: Answer[];
  onHandleAnswer: (value: any, index: number) => void;
  removeAnswer: (index: number) => void;
  handleDragStart: (index: number) => void;
  handleDrop: (index: number) => void;
  handleDragEnd: () => void;
  handleDragOver: (e: React.DragEvent<HTMLElement>) => void;
  handleOnClickPlayAudio: (question: AnyQuestion) => void;
}

/**
 * Audio Service Result interface
 */
export interface AudioResult {
  success: boolean;
  error?: string;
}