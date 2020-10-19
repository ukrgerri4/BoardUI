import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HubResult, isSuccesStatusCode } from '../../../common/models/hub-result';
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
    public bsModalRef: BsModalRef,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.onClose.next(this.gameId);
    this.onClose.complete();
  }

  createGame() {
    this.loading = true;

    this.signalRService.createGame()
      .subscribe(
        (result: HubResult) => {
          if (isSuccesStatusCode(result) && !!result.data) {
            this.gameId = result.data;
            this.bsModalRef.hide();
          } else {
            this.toastrService.error(result?.data ?? "Create game error");
            this.loading = false;
            this.cdr.markForCheck();
          }
        }
      );
  }
}
