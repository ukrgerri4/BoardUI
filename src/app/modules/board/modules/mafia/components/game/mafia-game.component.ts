import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, filter, take, takeUntil, tap } from 'rxjs/operators';
import { HubResult } from '../../../common/models/hub-result';
import { MafiaMessage, MafiaSignalRService } from '../../services/mafia-signalr.service';

@Component({
  selector: 'app-mafia-game',
  templateUrl: './mafia-game.component.html',
  styleUrls: ['./mafia-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MafiaGameComponent implements OnInit, OnDestroy {

  private gameId: string = null;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private mafiaSignalRService: MafiaSignalRService
  ) {
    // get Id from route
    this.gameId = this.activatedRoute.snapshot.params.id;
    console.log(this.gameId);
  }

  ngOnInit(): void {
    this.initMessagesSubscription();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  initMessagesSubscription() {
    this.mafiaSignalRService.onMessage
      .pipe(
        takeUntil(this.destroy$),
        filter(event => !!event?.messageType),
        tap(e => console.log(e.data))
      )
      .subscribe(
        event => {
          switch (event.messageType) {
            case MafiaMessage.AvailableGames:
              break;
            case MafiaMessage.UpdateState:
              break;
          }
        }
      );
  }

}
