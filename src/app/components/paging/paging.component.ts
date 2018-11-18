import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit, OnDestroy {

  page: number;
  subscription: Subscription;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.subscription = this.gameService.counter.subscribe(
      num => {
        this.page = num;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
