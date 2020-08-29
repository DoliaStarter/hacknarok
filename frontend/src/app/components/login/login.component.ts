import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthorizationService) { }

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
  }
  OnCancelClicked() {

  }

}
