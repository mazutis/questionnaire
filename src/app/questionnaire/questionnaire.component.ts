import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '../service/questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  public questionsList: any = [];
  public currentQuestion: number = 0;
  public correctAnswers: number = 0;
  public incorrectAnswers: number = 0;
  public questionsAttempted: number = 0;
  public progress: string = "0";
  isCompleted: boolean = false;
  constructor(private questionnaireService: QuestionnaireService) { }

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
    this.getProgress();
  }

  previousQuestion() {
    this.currentQuestion--;
    this.getProgress();
  }

  answer(currentQuestion: number, option: any) {
    if (currentQuestion === this.questionsList.length) {
      this.isCompleted = true;
    }

    if (option.correct) {
      this.correctAnswers++;
    } else {
      this.incorrectAnswers++;
    }
    if (this.currentQuestion != this.questionsList.length - 1) {
      this.currentQuestion++;
    }
    this.questionsAttempted++;
    this.getProgress();
  }

  resetQuestionnaire() {
    this.getAllQuestions();
    this.currentQuestion = 0;
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.progress = "0";
    this.questionsAttempted = 0;
    this.isCompleted = false;
  }

  getProgress() {
    this.progress = ((this.currentQuestion / this.questionsList.length) * 100).toString();
    return this.progress;
  }

}
