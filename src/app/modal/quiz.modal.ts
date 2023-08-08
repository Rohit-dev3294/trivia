export interface Answer {
    answer: string;
    selected: boolean;
  }

  export interface Quiz {
    Question: string;
    answers: Answer[];
    correctAnswer: string
  }

   export interface QuizResponse {
    response_code: number;
    results: Question[];
  }

  export interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }

  export interface QuizCategoryResponse {
    trivia_categories: QuizCategory[];
  }

  export interface QuizCategory{
    id: string,
    name: string
  }
