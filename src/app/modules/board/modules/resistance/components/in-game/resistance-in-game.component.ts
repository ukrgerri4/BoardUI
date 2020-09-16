import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { ResistanceMessage, ResistanceSignalRService } from '../../services/resistance-signalr.service';

@Component({
  selector: 'app-resistance-in-game',
  templateUrl: './resistance-in-game.component.html',
  styleUrls: ['./resistance-in-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResistanceInGameComponent implements OnInit, OnDestroy {

  private gameId: string = null;

  public gameGrid: number[];
  public gameState = {
    state: 1,
    players: [
      { id: 1, name: 'Igor'},
      { id: 2, name: 'Zepsen', isBoss: true},
      { id: 3, name: 'Murina'},
      { id: 4, name: 'Yulia'},
      { id: 5, name: 'Stas'}
    ]
  };

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private resistanceSignalRService: ResistanceSignalRService
  ) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    this.initMessagesSubscription();

    this.createGrid(5);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  initMessagesSubscription() {
    this.resistanceSignalRService.onMessage
      .pipe(
        takeUntil(this.destroy$),
        filter(event => event?.messageType === ResistanceMessage.GameState)
      )
      .subscribe(
        event => {
          console.log(event);
        }
      );
  }

  createGrid(length: number) {
    switch (length) {
      case 5:
        this.gameGrid = [
          1, 0, 2,
          5, 0, 3,
          0, 4, 0
        ];
        break;
      case 6:
        this.gameGrid = [
          0, 1, 0,
          6, 0, 2,
          5, 0, 3,
          0, 4, 0
        ];
        break;
      case 7:
        this.gameGrid = [
          1, 0, 2,
          7, 0, 3,
          6, 0, 4,
          0, 5, 0
        ];
        break;
      case 8:
        this.gameGrid = [
          0, 1, 0,
          8, 0, 2,
          7, 0, 3,
          6, 0, 4,
          0, 5, 0
        ];
        break;
      case 9:
        this.gameGrid = [
          1, 0, 2,
          9, 0, 3,
          8, 0, 4,
          7, 0, 5,
          0, 6, 0
        ];
        break;
      case 10:
        this.gameGrid = [
           0, 1, 0,
          10, 0, 2,
           9, 0, 3,
           8, 0, 4,
           7, 0, 5,
           0, 6, 0
        ];
        break;
    }
  }

  // trackBy(index: number, item: any) {}
}
