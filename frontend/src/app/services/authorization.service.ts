import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { loginUrl, registerUrl, UserModel } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(public httpClient: HttpClient) { }

  private authorized: boolean;
  private currentUser: UserModel;
  public GetCurrentUser(): UserModel {

    return this.currentUser;
  }

  public isAuthorized() {
    return this.authorized;
  }
  public Login(login: string, password: string): Observable<boolean> {
    const user = {
      login: login,
      password: password 
    };

    return this.httpClient.post<boolean>(loginUrl,<UserModel> user).pipe(
      tap(isSuccess => {
        this.authorized = isSuccess
        this.currentUser = user
      })
    )
  }
  public Register(login: string, password: string): Observable<boolean> {
    const user = {
      login: login,
      password: password 
    };
    return this.httpClient.post<boolean>(registerUrl, { login: login, password: password }).pipe(
      tap(isSuccess => {
        this.authorized = isSuccess
        this.currentUser = user
      })
    )
  }
}
