import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HubConnectionState } from '@aspnet/signalr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { interval, Subject } from 'rxjs';
import { debounce, filter, finalize, take, takeUntil, tap } from 'rxjs/operators';
import { HubResult, isSuccesStatusCode } from '../../../common/models/hub-result';
import { MafiaMessage, MafiaSignalRService } from '../../services/mafia-signalr.service';
import { MafiaCreateComponent } from '../create/mafia-create.component';

@Component({
  selector: 'app-mafia-lobby',
  templateUrl: './mafia-lobby.component.html',
  styleUrls: ['./mafia-lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MafiaLobbyComponent implements OnInit, OnDestroy {

  public createdGames: any = {};
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
    const intervalRef = setInterval(() => {
      if (this.mafiaSignalRService.state === HubConnectionState.Connected) {
        clearInterval(intervalRef);
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
        backdrop: true,
        class: 'modal-xl'
        // class: 'modal-fullscreen'
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
    //check if game exist??
    this.router.navigate([gameId], { relativeTo: this.route });
  }

  join(gameId: string) {
    this.mafiaSignalRService.joinGame(gameId)
      .pipe(
        take(1),
        finalize(() => this.cdr.markForCheck())
      )
      .subscribe(
        (result: HubResult) => {
          if (isSuccesStatusCode(result) && result.data) {
            this.router.navigate([result.data], { relativeTo: this.route });
          }
        }
      );
  }
  // createGame() {
  //   this.mafiaSignalRService.createGame();
  // }
  // getExpandIcon() {
  //   return this.activeGamesExpanded ? 'expand_more' : 'expand_less'
  // }
}
