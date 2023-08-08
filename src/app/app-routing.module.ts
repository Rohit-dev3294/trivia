import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { QuizQuestionsComponent } from './components/quiz-questions/quiz-questions.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';

export const routes: Route[] = [
  {
    path: '',
    component: QuizQuestionsComponent,
  },
  {
    path: 'result',
    component: QuizResultComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
