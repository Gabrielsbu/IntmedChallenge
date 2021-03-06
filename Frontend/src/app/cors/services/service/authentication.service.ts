import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IToken } from '../model/token';

import { environment } from './../../../../environments/environment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiUrlAuth = `${environment.API}/auth`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  public criarUsuario(user: User): Observable<User> {
    return this.http.post<User>(
      this.apiUrlAuth + '/registration/',
      user,
      this.httpOptions
    );
  }

  public logarUsuario(login: any): Observable<IToken> {
    return this.http.post<IToken>(
      this.apiUrlAuth + '/login/',
      login,
      this.httpOptions
    );
  }

  public buscarUsuario(): Observable<any> {
    return this.http.get<any>(this.apiUrlAuth + '/user/');
  }
}
