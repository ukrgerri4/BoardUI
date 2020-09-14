import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ResistanceSignalRService } from '../../services/resistance-signalr.service';

@Component({
  selector: 'app-create-game-modal',
  templateUrl: './create-game-modal.component.html',
  styleUrls: ['./create-game-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateGameModalComponent implements OnInit, OnDestroy {

  public loading = false;
  public signalRService: ResistanceSignalRService = null;

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
