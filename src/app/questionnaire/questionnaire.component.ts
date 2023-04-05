import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '../service/questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit{
  public questionsList: any = [];
  public currentQuestion: number = 0;
  public correctAnswers: number = 0;
  public incorrectAnswers: number = 0;
  constructor(private questionnaireService : QuestionnaireService) {  }

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionnaireService.getQuestionnaireJson()
      .subscribe(res => {
        //console.log(res); // Test in console if reading JSON
        this.questionsList = res.questions;
      })
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQuestion: number, option: any) {
    if (option.correct) {
      this.correctAnswers++;
    } else {
      this.incorrectAnswers++;
    }

    this.currentQuestion++;
  }

}
