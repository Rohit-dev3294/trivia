import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Answer, Quiz, QuizCategory, QuizCategoryResponse } from 'src/app/modal/quiz.model';
import { QuizStateService } from 'src/app/service/quiz-state.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styles: [`
   .question{
      display: flex;
      flex-direction: row;
   }
  `]
})
export class QuizQuestionsComponent  {

  constructor(
    private quizService: QuizService,
    private router: Router,
    private quizStateService: QuizStateService
  ) {}
  quizData:Quiz[] = [];

  selectedAnswer: number = 0;
  trivia!: QuizCategoryResponse;
  selectedCategory: QuizCategory = {id:'Select a category',name:'Select a category'};
  selectedDifficulty: string = 'Select difficulty';
  ngOnInit(): void {
    this.quizService.getCategory().subscribe((data:QuizCategoryResponse) => {
      this.trivia = data;
    });
  }

  getQuestionList() {
    this.quizService
      .getQuestions(
        this.selectedCategory.id,
        this.selectedDifficulty.toLowerCase()
      )
      .subscribe((data: Quiz[]) => {
        this.quizData = data;
      });
  }

  clickedAnswer(option: Answer, questionIndex: number) {
    let availableOptions = this.quizData[questionIndex].answers;
    for (let index in availableOptions) {
      if (availableOptions[index].answer === option.answer) {
        availableOptions[index].selected = !availableOptions[index].selected;
        if(availableOptions[index].selected){
          this.selectedAnswer++;
        } else{
          this.selectedAnswer--;
        }

      } else  if(availableOptions[index].selected){
        availableOptions[index].selected = false;
        this.selectedAnswer--;
      }
    }
  }
  submit(){
    this.quizStateService.sendResult(this.quizData);
    this.router.navigate(['/result']);
  }

}
