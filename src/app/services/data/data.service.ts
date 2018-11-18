import { Injectable } from '@angular/core';
import { NetService } from '../net/net.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuestionData, APIResponse } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _questionData: BehaviorSubject<QuestionData[]> = <BehaviorSubject<QuestionData[]>>new BehaviorSubject<QuestionData[]>([]);
  private dataStorage: { results: QuestionData[] } = { results: [] };
  private _activeQuestion: BehaviorSubject<QuestionData> = <BehaviorSubject<QuestionData>>new BehaviorSubject<QuestionData>(<any>{});

  constructor(private net: NetService) {
    this.loadAllData();
  }

  get questionData(): Observable<QuestionData[]> {
    return this._questionData.asObservable();
  }

  get activeQuestion(): Observable<QuestionData> {
    return this._activeQuestion.asObservable();
  }

  loadAllData() {
    this.net.getAllData()
      .subscribe(data => {
        this.dataStorage.results = this.randomizeAnswers(data);
        this._activeQuestion.next({ ...this.dataStorage }.results[0]);
        this._questionData.next({ ...this.dataStorage }.results);
      },
        err => {
          console.error(err);
        });
  }

  changeActiveQuestion(index: number) {
    this._activeQuestion.next({ ...this.dataStorage }.results[index]);
  }

  randomizeAnswers(data: APIResponse): QuestionData[] {
    let randomizedArray: QuestionData[] = [];
    let results = { ...data }.results;
    let min = 0;
    let max: number;
    results.forEach(item => {
      max = item.incorrect_answers.length;
      let randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;

      let arr1 = item.incorrect_answers.slice(min, randomIndex);
      let arr2 = item.incorrect_answers.slice(randomIndex);
      arr1.push(item.correct_answer);
      item.incorrect_answers = [, ...arr1, ...arr2];
      randomizedArray.push(item);
    })
    return randomizedArray;
  }
}



