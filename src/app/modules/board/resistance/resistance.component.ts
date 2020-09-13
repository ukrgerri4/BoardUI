import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { ResistanceMessage, ResistanceSignalRService } from 'src/app/modules/board/resistance/services/resistance-signalr.service';
import { CreateGameModalComponent } from './components/create-game-modal/create-game-modal.component';

@Component({
  selector: 'app-resistance',
  templateUrl: './resistance.component.html',
  styleUrls: ['./resistance.component.scss'],
  providers: [ResistanceSignalRService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResistanceComponent implements OnInit, OnDestroy {

  private currentGameId: string = null;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private resistanceSignalRService: ResistanceSignalRService
  ) { }

  ngOnInit(): void {
    this.resistanceSignalRService.connect();

    this.initMessagesSubscription();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  initMessagesSubscription() {
    this.resistanceSignalRService.onMessage
      .pipe(
        takeUntil(this.destroy$),
        filter(event => !!event?.messageType)
      )
      .subscribe(
        event => {
          switch (event.messageType) {
            case ResistanceMessage.AvailableGames:
              break;
            case ResistanceMessage.GameState:
              break;
          }
        }
      );
  }

  openModal() {
    const modalRef = this.modalService.open(CreateGameModalComponent, { windowClass: 'fullscreen' });
  }

  createGame() {
    this.resistanceSignalRService.createGame()
      .pipe(
        tap(id => alert(`new game id - [${id}]`))
      )
      .subscribe(id => this.currentGameId = id ?? null);
  }

  // joinGame() {
  //   this.resistanceSignalRService.joinGame()
  //     .subscribe(id => this.currentGameId = id ?? null);
  // }

  // leaveGame() {
  //   this.resistanceSignalRService.leaveGame()
  //     .subscribe(id => this.currentGameId = id ?? null);
  // }
}
