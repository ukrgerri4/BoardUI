import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HubConnectionState } from '@aspnet/signalr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { interval, Subject } from 'rxjs';
import { debounce, filter, finalize, take, takeUntil, tap } from 'rxjs/operators';
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
  // public activeGamesExpanded = true;
  // public avalibleGamesExpanded = true;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private mafiaSignalRService: MafiaSignalRService
  ) { }

  ngOnInit(): void {
    var interval = setInterval(() => {
      if (this.mafiaSignalRService.state === HubConnectionState.Connected) {
        clearInterval(interval);
        this.getGames();
      }
    }, 500);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getGames() {
    this.mafiaSignalRService.games()
      .pipe(
        take(1),
        finalize(() => this.cdr.markForCheck()),
        tap(x => console.log(x))
      )
      .subscribe(
        result => {
          this.createdGames = result?.data ?? [];
        },
        error => console.log(error)
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

  reconnect(gameId: string) {

  }

  join(gameId: string) {

  }
  // createGame() {
  //   this.mafiaSignalRService.createGame();
  // }
  // getExpandIcon() {
  //   return this.activeGamesExpanded ? 'expand_more' : 'expand_less'
  // }
}
