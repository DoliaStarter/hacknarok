import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  private logSubscription: Subscription;
  private regSubscription: Subscription;

  constructor(
    private authService: AuthorizationService,
    public dialogRef: MatDialogRef<LoginComponent>) {

  }

  isLogin: boolean = true;
  login: string;
  password: string;
  ngOnInit(): void {
  }

  OnLoginClicked() {
    if (this.isLogin)
      this.authService.Login(this.login, this.password);
    else
      this.authService.Register(this.login, this.password);
    this.dialogRef.close()

    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.regSubscription && this.regSubscription.unsubscribe();
    this.logSubscription && this.logSubscription.unsubscribe();

  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
