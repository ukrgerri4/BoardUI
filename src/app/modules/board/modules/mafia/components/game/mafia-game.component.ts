import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, take, takeUntil } from 'rxjs/operators';
import { HubResult } from '../../../common/models/hub-result';
import { MafiaSignalRService } from '../../services/mafia-signalr.service';

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
    // this.mafiaSignalRService.updateState()
    //   .pipe(
    //     take(1),
    //     catchError(_ => of(null))
    //   )
    //   .subscribe((result: HubResult) => {

    //   });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
