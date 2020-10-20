import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { filter, take, takeUntil, tap } from 'rxjs/operators';
import { MafiaMessage, MafiaSignalRService } from '../../services/mafia-signalr.service';
import { MafiaCreateComponent } from '../create/mafia-create.component';

const testData = {
  active: [
    {
      id: 1,
      name: 'running-game',
      capacity: '4/6'
    }
  ],
  avalible: [
    {
      id: 2,
      name: 'huba-buba',
      capacity: '3/5'
    },
    {
      id: 3,
      name: 'test-game',
      capacity: '1/7'
    }
  ]
};

@Component({
  selector: 'app-mafia-lobby',
  templateUrl: './mafia-lobby.component.html',
  styleUrls: ['./mafia-lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MafiaLobbyComponent implements OnInit, OnDestroy {

  public createdGames: any = testData;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private mafiaSignalRService: MafiaSignalRService
  ) { }

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

  createGame() {
    const modalRef = this.modalService.show(
      MafiaCreateComponent,
      {
        initialState: {
          signalRService: this.mafiaSignalRService
        },
        animated: true,
        keyboard: false,
        backdrop: false,
        class: 'modal-fullscreen'
      }
    );

    (modalRef.content as MafiaCreateComponent).onClose
      .pipe(
        take(1),
        filter(id => !!id)
      )
      .subscribe(id => this.router.navigate([id], { relativeTo: this.route }));
  }

  // createGame() {
  //   this.mafiaSignalRService.createGame();
  // }
}
