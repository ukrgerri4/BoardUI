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
  public form: FormGroup = new FormGroup({});
  private submitSubject$: Subject<any> = new Subject<any>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

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
  ) { }

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
        filter(() => this.form.valid),
        map(() => this.form.getRawValue()),
        switchMap(query => this.authService.signIn(query)
          .pipe(
            catchError(error => {
              console.log(error);
              return of(null);
            })
          )
        ),
      )
      .subscribe(
        response => {
          this.submitted = false;
          this.router.navigateByUrl('/playroom', { replaceUrl: true });
        },
        error => console.log(error)
      );
  }

  onSubmit() {
    this.submitSubject$.next();
  }
}
