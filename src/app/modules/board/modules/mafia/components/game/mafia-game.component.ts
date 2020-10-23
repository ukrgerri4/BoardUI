import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { catchError, filter, finalize, take, takeUntil, tap } from 'rxjs/operators';
import { HubResult, isSuccesStatusCode } from '../../../common/models/hub-result';
import { MafiaMessage, MafiaSignalRService } from '../../services/mafia-signalr.service';

@Component({
  selector: 'app-mafia-game',
  templateUrl: './mafia-game.component.html',
  styleUrls: ['./mafia-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MafiaGameComponent implements OnInit, OnDestroy {

  public data: any = {};
  public showRoles = false;

  private gameId: string = null;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private mafiaSignalRService: MafiaSignalRService,
    private toastrService: ToastrService
  ) {
    // get Id from route
    this.gameId = this.activatedRoute.snapshot.params.id;
    console.log(this.gameId);
  }

  ngOnInit(): void {
    this.initMessagesSubscription();
    this.initGameState();
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
        filter(event => event.messageType === MafiaMessage.UpdateState),
        tap(e => console.log(e.data))
      )
      .subscribe(
        event => {
          this.data = event?.data ?? {};
          this.cdr.markForCheck();
        }
      );
  }

  initGameState() {
    this.mafiaSignalRService.getState(this.gameId)
      .pipe(
        take(1),
        finalize(() => this.cdr.markForCheck())
      )
      .subscribe((result: HubResult) => {
        if (!isSuccesStatusCode(result)) {
          this.toastrService.error(result?.data ?? 'Update state game error.');
        }
      });
  }

  show() {
    this.showRoles = !this.showRoles;
  }

}
