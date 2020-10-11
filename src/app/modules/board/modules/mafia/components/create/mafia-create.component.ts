import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MafiaSignalRService } from '../../services/mafia-signalr.service';

@Component({
  selector: 'app-mafia-create',
  templateUrl: './mafia-create.component.html',
  styleUrls: ['./mafia-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MafiaCreateComponent implements OnInit, OnDestroy {

  public loading = false;
  public signalRService: MafiaSignalRService = null;

  private gameId: string = null;

  public onClose = new Subject<string>();

  constructor(
    private cdr: ChangeDetectorRef,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.onClose.next(this.gameId);
    this.onClose.complete();
  }

  createGame() {
    this.loading = true;

    this.signalRService?.createGame()
      .pipe(
        catchError(error => of(null))
      )
      .subscribe(
        id => {
          if (!!id) {
            this.gameId = id;
            this.bsModalRef.hide();
          } else {
            this.loading = false;
            this.cdr.markForCheck();
          }
        }
      );
  }

}
