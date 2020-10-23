import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseHttpService } from './common/base-http.service';
import { API } from '../constants/api-urls';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {

  private ACCESS_TOKEN_KEY = 'access_token';

  get accesToken() {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  get isAuthorized() {
    const accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    return !!accessToken;
  }

  constructor(protected http: HttpClient) {
    super(http, API.AUTH.ROOT);
  }

  signIn(model: { userName: string, password: string }): Observable<any> {
    // if (!environment.production){
    //   return of({accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MGRlZmUzNi02YTYyLTQyNWUtYmM1Yy02NGY4MGM0OWQ5M2QiLCJpZCI6ImU0NjVjNGExLWZjZjYtNDM1ZS1iZmIyLTRkNjk3MzhlZjU5OSIsImV4cCI6MTYzMTYxMzczMn0.r_ekz8gLNmBL4J8X_U1tQMMa7Ts3V_uVPHgHfyh0-d4'})
    //   .pipe(
    //     tap(response => {
    //       if (!!response?.accessToken){
    //         localStorage.setItem(this.ACCESS_TOKEN_KEY, response?.accessToken);
    //       }
    //     })
    //   );
    // }

    return this.http.post<any>(this.buildApiUrl(API.AUTH.LOGIN), model)
      .pipe(
        tap(response => {
          if (!!response?.accessToken){
            localStorage.setItem(this.ACCESS_TOKEN_KEY, response?.accessToken);
          }
        })
      );
  }

  logOut() {
    localStorage.clear();
  }
}
