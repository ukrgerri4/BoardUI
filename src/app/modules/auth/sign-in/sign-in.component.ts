import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { switchMap, takeUntil, filter, tap, map, catchError } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit, OnDestroy {

  public submitted = false;
  public isServerError = false;
  public form: FormGroup = new FormGroup({});
  private submitSubject$: Subject<any> = new Subject<any>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  private redirectAfterLoginUrl: null;

  get userName() {
    return this.form?.controls?.userName;
  }

  get password() {
    return this.form?.controls?.password;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.redirectAfterLoginUrl = this.router?.getCurrentNavigation()?.extras?.state?.redirectUrl;
  }

  ngOnInit(): void {
    this.initForm();
    this.initSubmitSubscription();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      userName: [ null, Validators.required ],
      password: [ null, Validators.required ]
    });
  }

  private initSubmitSubscription() {
    this.submitSubject$.asObservable()
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.submitted = true),
        tap(() => this.isServerError = false),
        filter(() => this.form.valid),
        map(() => this.form.getRawValue()),
        switchMap(query => this.authService.signIn(query)
          .pipe(
            catchError(error => {
              this.isServerError  = true;
              return of(null);
            })
          )
        ),
      )
      .subscribe(
        response => {
          this.submitted = false;
          const url = this.redirectAfterLoginUrl ?? '/playroom';
          this.router.navigateByUrl(url, { replaceUrl: true });
          this.cdr.markForCheck();
        },
        error => {
          console.log(error);
          this.cdr.markForCheck();
        }
      );
  }

  onSubmit() {
    this.submitSubject$.next();
  }
}
