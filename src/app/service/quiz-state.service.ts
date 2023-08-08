import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../modal/quiz.modal';

@Injectable({providedIn: 'root'})
export class QuizStateService {

  private finalResult: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>([]);
  result$ = this.finalResult.asObservable();

  sendResult(result: Quiz[]) {
    this.finalResult.next(result);
  }

}
