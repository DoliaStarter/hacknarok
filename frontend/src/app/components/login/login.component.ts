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



  @Input() type: string = "Login"; //register or login
  login: string;
  password: string;
  ngOnInit(): void {
  }

  OnLoginClicked() {

    if (this.type.toLowerCase() == "login") {
      this.logSubscription = this.authService.Login(this.login, this.password).subscribe();
    } else {
      this.regSubscription = this.authService.Register(this.login, this.password).subscribe();
    }
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
