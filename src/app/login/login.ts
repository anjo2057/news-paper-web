import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../interfaces/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import { BlobOptions } from 'buffer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})

export class Login {
  // Formfält – separat från User (User kommer från serverns svar efter login)
  username = '';
  password = '';
  error: string | null = null;

  constructor(public loginservice: LoginService) {}
  //constructor(private loginservice: LoginService) {}
  // private user: User | null = null;

  login(): void {
    this.error = null;
    this.loginservice.login(this.username, this.password).subscribe({
      next: () => {
        // Inloggningen lyckades. (NewsService har nu personlig API-key.)
        // Valfritt: visa snackbar/toast här.
      },
      error: () => {
        this.error = 'Wrong username or password.';
      },
    });
  }

  logout(): void {
    this.loginservice.logout();
  }

  isLogged(): boolean {
    return this.loginservice.isLogged();
  }

  currentUsername(): string {
    return this.loginservice.getUser()?.username ?? '';
  }

  //checkLogin(): boolean {
    //if (this.loginservice.isLogged()) {
      //return this.loginservice.isLogged();
    //} else {
      //window.alert(
        //'The user: ' + this.user?.username + 'could not be logged in. Wrong password or username'
      //);
      //return false;
    //}
  //}
}
