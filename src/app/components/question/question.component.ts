import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionData, BUTTON_CLASS, AnswerStatus, BUTTON_TEXT } from 'src/app/models';
import { DataService } from 'src/app/services/data/data.service';
import { Observable, Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {

  counter: Observable<number>;
  question: Observable<QuestionData>;
  buttonClass: string = BUTTON_CLASS.OK;
  buttonSubscription: Subscription;
  buttonText: string = BUTTON_TEXT.OK;
  enableButton: boolean = false;

  constructor(private data: DataService, private gameService: GameService) { }

  ngOnInit() {
    this.question = this.data.activeQuestion;
    this.counter = this.gameService.counter;
    this.buttonSubscription = this.gameService.answerStatus.subscribe(
      answerStatus => {
        this.chooseButtonClassAndText(answerStatus);

      }
    )
  }

  ngOnDestroy() {
    this.buttonSubscription.unsubscribe();
  }

  chooseButtonClassAndText(answerStatus: AnswerStatus) {

    if (answerStatus.clicked) {
      this.buttonClass = BUTTON_CLASS.ACTIVE;
      this.enableButton = true;
    } else {
      this.buttonClass = BUTTON_CLASS.OK;
      this.enableButton = false;
    }

    if (answerStatus.checked) {
      this.buttonText = BUTTON_TEXT.CONTINUE;
    } else {
      this.buttonText = BUTTON_TEXT.OK;
    }
  }

  checkAnswer(index: number) {
    if (this.enableButton && this.buttonText === BUTTON_TEXT.OK) {
      this.gameService.changeAnswerStatus({ clicked: true, checked: true });
    } else if (this.buttonText === BUTTON_TEXT.CONTINUE) {
      this.updateGameField(index);
    } else if (this.buttonText === BUTTON_TEXT.LOAD_MORE) {
      this.gameService.restartTheGame();
    }
  }

  updateGameField(index: number) {
    if (index === 10) {
      this.buttonText = BUTTON_TEXT.LOAD_MORE;
      return;
    } else {
      this.gameService.updateGameCounter();
      this.data.changeActiveQuestion(index);
      this.gameService.changeAnswerStatus({ checked: false, clicked: false });
    }
  }
}
