import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Subscription, zip } from 'rxjs';
import { GameService } from 'src/app/services/game/game.service';
import { AnswerStatus, ANSWER_CLASS } from 'src/app/models';

@Component({
  selector: 'answer-box',
  templateUrl: './answer-box.component.html',
  styleUrls: ['./answer-box.component.scss']
})
export class AnswerBoxComponent implements OnInit, OnDestroy {

  @Input() text: string;
  subscriber: Subscription;
  class: string = ANSWER_CLASS.ANSWER;
  answerStatus: AnswerStatus;
  boxClicked: boolean = false;

  constructor(private data: DataService, private gameService: GameService) { }

  ngOnInit() {
    this.subscriber = this.gameService.answerStatus.subscribe((
      (answerStatus: AnswerStatus) => {
        this.answerStatus = answerStatus;
        this.checkWinLose(answerStatus);
      }
    ));
  }

  chooseAnswer() {
    if (!this.answerStatus.clicked && !this.answerStatus.checked) {
      this.boxClicked = true;
      this.class = ANSWER_CLASS.ANSWER_CLICKED;
      this.gameService.changeAnswerStatus({ clicked: true, checked: this.answerStatus.checked });
      this.gameService.changeChosenAnswer(this.text);
    } else if (this.answerStatus.clicked && this.boxClicked && !this.answerStatus.checked) {
      this.boxClicked = false;
      this.class = ANSWER_CLASS.ANSWER;
      this.gameService.changeAnswerStatus({ clicked: false, checked: this.answerStatus.checked });
      this.gameService.changeChosenAnswer("");
    }
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  checkWinLose(answerStatus: AnswerStatus) {
    if (answerStatus.checked && answerStatus.clicked && this.boxClicked) {
      let win = this.checkCorrectAnswer();
      if (win) {
        this.class = ANSWER_CLASS.ANSWER_RIGHT;
      } else {
        this.class = ANSWER_CLASS.ANSWER_WRONG;
      }
      return;
    } else if (!answerStatus.clicked) {
      this.class = ANSWER_CLASS.ANSWER;
      this.boxClicked = false;
    }
  }

  checkCorrectAnswer(): boolean {
    let correct: boolean = false;
    let first = this.data.activeQuestion;
    let second = this.gameService.chosenAnswer;
    const zipped = zip(first, second);
    const subscription = zipped.subscribe(data => {
      if (data[0].correct_answer.toLowerCase() === data[1].toLowerCase()) {
        correct = true;
      }
    });
    subscription.unsubscribe();
    return correct;
  }
}
