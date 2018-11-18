import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainViewComponent } from './components/main-view/main-view.component';
import { QuotePipe } from './pipes/quote.pipe';
import { QuestionComponent } from './components/question/question.component';
import { PagingComponent } from './components/paging/paging.component';
import { PagesPipe } from './pipes/pages.pipe';
import { AnswerBoxComponent } from './components/answer-box/answer-box.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    QuotePipe,
    QuestionComponent,
    PagingComponent,
    PagesPipe,
    AnswerBoxComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
