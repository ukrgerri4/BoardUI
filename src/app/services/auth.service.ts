import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseHttpService } from './common/base-http.service';
import { API } from '../constants/api-urls';
import { tap } from 'rxjs/operators';

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
    return this.http.post<any>(this.buildApiUrl(API.AUTH.LOGIN), model)
      .pipe(
        tap(response => {
          if (!!response?.accessToken){
            localStorage.setItem(this.ACCESS_TOKEN_KEY, response?.accessToken);
          }
        })
      );
  }
}
