// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../data.service';
import { AuthInfo } from '../models/login.model';
import { ApiResponse2 } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authInfo: AuthInfo = { username: '', password: '' };

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    this.loginService.SignIn(this.authInfo).subscribe(response => {
      if (response.success) {
        const token = response.data.Token;
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['../inicio']);
        } else {
          alert('Error: Token no disponible.');
        }
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
