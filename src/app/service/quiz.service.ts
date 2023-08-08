import { Injectable } from '@angular/core';
import { Answer, Question, Quiz, QuizResponse, QuizCategory, QuizCategoryResponse } from '../modal/quiz.modal';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private url = 'https://opentdb.com/api_category.php';

  constructor(private _http: HttpClient) {}

  getCategory(): Observable<QuizCategoryResponse> {
    return this._http.get<QuizCategoryResponse>(this.url).pipe(
      map((data) => {
        return getCategory(data);
      })
    );
  }

  getQuestions(categoryId: string, difficulty: string): Observable<Quiz[]> {
    const params = new HttpParams()
      .set('amount', 5)
      .set('category', categoryId)
      .set('difficulty', difficulty)
      .set('type', 'multiple');
    return this._http
      .get<QuizResponse>('https://opentdb.com/api.php', { params })
      .pipe(
        map((data) => {
          return getQuestions(data?.results);
        })
      );
  }
}

function getQuestions(results: Question[]): Quiz[] {
  let quizData: Quiz[] = [];
  for (let result of results) {
    let question = result?.question;
    let quiz!: Quiz;
    let answer: Answer[] = displayAnswer(
      result?.correct_answer,
      result?.incorrect_answers
    );
    quiz = {
      Question: question,
      correctAnswer: result?.correct_answer,
      answers: answer,
    };
    quizData.push(quiz);
  }
  return quizData;
}

function displayAnswer(correctAns: string, incorrectAns: string[]): Answer[] {
  let shuffledAnswer!: Answer[];
  let allAnswer: string[] = [];
  allAnswer.push(correctAns);
  allAnswer = [...allAnswer, ...incorrectAns];

  allAnswer = allAnswer
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  shuffledAnswer = allAnswer.map((answer: string) => ({
    answer: answer,
    selected: false,
  }));

  return shuffledAnswer;
}
function getCategory(data: QuizCategoryResponse): QuizCategoryResponse {
  const response: QuizCategoryResponse = {
    trivia_categories: [],
  };
  for (let category of data?.trivia_categories) {
    const triviaCategory: QuizCategory = {
      id: category.id,
      name: category.name,
    };
    response.trivia_categories.push(triviaCategory);
  }
  return response;
}
