import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../interfaces/user';
import { error } from 'console';
import { BlobOptions } from 'buffer';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private loginservice: LoginService) {}

  private user: User | null = null;

  login(): void {
    if (this.user) {
      this.loginservice.login(this.user.username, this.user.passwd);
    }
  }

  checkLogin(): boolean {
    if (this.loginservice.isLogged()) {
      return this.loginservice.isLogged();
    } else {
      window.alert(
        'The user: ' + this.user?.username + 'could not be logged in. Wrong password or username'
      );
      return false;
    }
  }
}
