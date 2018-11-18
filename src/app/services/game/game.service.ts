import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnswerStatus } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _counter: BehaviorSubject<number> = <BehaviorSubject<number>>new BehaviorSubject<number>(1);
  private _answerStatus: BehaviorSubject<AnswerStatus> =
    <BehaviorSubject<AnswerStatus>>new BehaviorSubject<AnswerStatus>({ clicked: false, checked: false });
  private _chosenAnswer: BehaviorSubject<string> = <BehaviorSubject<string>>new BehaviorSubject<string>("");

  constructor() { }

  get counter() {
    return this._counter.asObservable();
  }

  get answerStatus() {
    return this._answerStatus.asObservable();
  }

  get chosenAnswer() {
    return this._chosenAnswer.asObservable();
  }

  changeAnswerStatus(value: AnswerStatus) {
    this._answerStatus.next(value);
  }

  changeChosenAnswer(value: string) {
    this._chosenAnswer.next(value);
  }

  updateGameCounter() {
    let counter = this._counter.getValue();
    console.log(counter);
    this._counter.next(counter + 1);
  }

  restartTheGame() {
    location.reload();
  }
}
