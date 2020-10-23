import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { HubResult, isSuccesStatusCode } from '../../../common/models/hub-result';
import { MafiaSignalRService } from '../../services/mafia-signalr.service';

@Component({
  selector: 'app-mafia-create',
  templateUrl: './mafia-create.component.html',
  styleUrls: ['./mafia-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MafiaCreateComponent implements OnInit, OnDestroy {
  public signalRService: MafiaSignalRService = null;
  public onClose = new Subject<string>();

  public loading = false;
  public submitted = false;

  private gameId: string = null;

  private createGameSubject = new Subject<any>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public form: FormGroup = new FormGroup({});
  get name() { return this.form?.controls?.name; }
  get maxPlayers() { return this.form?.controls?.maxPlayers; }

  constructor(
    private cdr: ChangeDetectorRef,
    public bsModalRef: BsModalRef,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initCreateGameSubscription();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.onClose.next(this.gameId);
    this.onClose.complete();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      name: [ 'bum-bum', Validators.required ],
      maxPlayers: [ 8, Validators.required ]
    });
  }

  private initCreateGameSubscription() {
    this.createGameSubject.asObservable()
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.submitted = true),
        // tap(() => this.cdr.markForCheck()),
        filter(() => this.form.valid),
        tap(() => this.loading = true),
        map(() => this.form.getRawValue()),
        tap(queryModel => console.log(queryModel)),
        switchMap(queryModel =>
          this.signalRService.createGame(queryModel)
            .pipe(catchError(() => of(null)))
        )
      )
      .subscribe(
        (result: HubResult) => {
          if (result && isSuccesStatusCode(result) && !!result.data) {
            this.gameId = result.data;
            this.bsModalRef.hide();
          } else {
            this.toastrService.error(result?.data ?? 'Create game error');
          }

          this.loading = false;
          this.cdr.markForCheck();
        }
      );
  }

  onSubmit() {
    this.createGameSubject.next();
  }
}
