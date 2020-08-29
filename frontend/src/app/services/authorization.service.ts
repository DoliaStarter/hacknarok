import { Injectable, Host } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginUrl, registerUrl, UserModel } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(public httpClient: HttpClient) { }

  private authorized: boolean;
  private currentUser: number;
  public GetCurrentUser() {

    return {
      login: "John"
    }

  }

  public isAuthorized() {
    return this.authorized;
  }
  public Login(login: string, password: string) {

    this.httpClient.post<UserModel>(loginUrl, { login: login, password: password }).toPromise().then((response) => {
      this.authorized = true;
    });


  }
  public Register(login: string, password: string) {
    this.httpClient.post<UserModel>(registerUrl, { login: login, password: password }).toPromise().then((response) => {
      this.authorized = true;
    });
  }




}