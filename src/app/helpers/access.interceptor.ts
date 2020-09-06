import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AccessInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    if (authService.accesToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.accesToken}`
        }
      });
    }

    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            const router = this.injector.get(Router);
            router.navigateByUrl('/auth/sign-in', { state: { returnUrl: router.url } })
          }
          return throwError(error);
        })
      );
  }

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  //   const log = this.injector.get(LogService);
  //   const authService = this.injector.get(AuthService);
  //   const authDataService = this.injector.get(AuthDataService);

  //   if (!this.isRefreshing) {
  //     log.warn('try refreshToken');

  //     this.isRefreshing = true;
  //     authService.emitTokenValue(null);

  //     return authService.refreshToken()
  //       .pipe(
  //         finalize(() => this.isRefreshing = false),
  //         switchMap((result: any) => {
  //           const token = authDataService.getAccessToken();
  //           log.warn('continue previous request after refresh');
  //           return next.handle(this.addToken(request, token));
  //         })
  //       );
  //   } else {
  //     log.warn('wait refresh');
  //     return authService.tokenSubjectObservable
  //       .pipe(
  //         filter(result => !!result),
  //         take(1),
  //         switchMap(result => {
  //           const token = authDataService.getAccessToken();
  //           log.warn('continue request after refresh subscribe');
  //           return next.handle(this.addToken(request, token));
  //         })
  //       );
  //   }
  // }
}