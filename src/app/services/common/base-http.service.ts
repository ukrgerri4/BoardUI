import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

export abstract class BaseHttpService {

  constructor(protected http: HttpClient, protected controller: string) { }

  buildApiUrl(path: string): string { return `${environment.baseApiUrl}/api/${this.controller}/${path}`; }
}
