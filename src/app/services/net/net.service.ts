import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { APIResponse } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class NetService {

  dataApiUrl = 'https://opentdb.com/api.php?amount=10&type=multiple'
  constructor(private http: HttpClient) { }

  getAllData(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.dataApiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error happened:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'No data to display, please try again later');
  };
}
