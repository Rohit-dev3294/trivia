import { Component, OnInit } from '@angular/core';
import { Answer, Quiz } from 'src/app/modal/quiz.model';
import { QuizStateService } from 'src/app/service/quiz-state.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {

  constructor(private quizStateService: QuizStateService) {}
  quizData: Quiz[] = [];
  correctAnsCount: number = 0;
  ngOnInit(): void {
    this.quizStateService.result$.subscribe((data: Quiz[]) => {
      this.quizData = data;
    });
  }
  getBtnClass(option: Answer, quiz: Quiz) {
    let btnClass: string = '';
    if (option?.selected) {
      if (option?.answer === quiz?.correctAnswer) {
        btnClass = 'btn-success';
        this.correctAnsCount++;
      } else {
        btnClass = 'btn-danger';
      }
    } else if (option?.answer === quiz?.correctAnswer) {
      btnClass = 'btn-success';
    } else {
      btnClass = 'btn-outline-success';
    }
    return btnClass;
  }

  getColorClass() {
    if (this.correctAnsCount < 2) {
      return 'red';
    } else if (this.correctAnsCount > 1 && this.correctAnsCount < 4) {
      return 'yellow';
    } else {
      return 'green';
    }
  }
}
