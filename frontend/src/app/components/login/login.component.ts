import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {


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

    if (this.type.toLowerCase() == "login")
      this.authService.Login(this.login, this.password);
    else
      this.authService.Register(this.login, this.password);
    this.dialogRef.close()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}