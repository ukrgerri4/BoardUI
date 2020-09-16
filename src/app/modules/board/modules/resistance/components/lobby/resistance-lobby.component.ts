import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { ResistanceMessage, ResistanceSignalRService } from '../../services/resistance-signalr.service';
import { CreateGameModalComponent } from '../create-game-modal/create-game-modal.component';

@Component({
  selector: 'app-resistance-lobby',
  templateUrl: './resistance-lobby.component.html',
  styleUrls: ['./resistance-lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResistanceLobbyComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private resistanceSignalRService: ResistanceSignalRService
  ) { }

  ngOnInit(): void {
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

  createGameModal() {
    const modalRef = this.modalService.show(
      CreateGameModalComponent,
      { 
        initialState: {
          signalRService: this.resistanceSignalRService
        },
        animated: false,
        keyboard: true,
        backdrop: true,
        class: 'modal-fullscreen'
      }
    );

    (modalRef.content as CreateGameModalComponent).onClose
      .pipe(
        take(1),
        filter(id => !!id)
      )
      .subscribe(id => this.router.navigate([id], { relativeTo: this.route }))
  }
}
