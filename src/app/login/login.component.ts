import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.error = '';
    const credentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe(
      response => {
        if (response && response.success) {
          this.router.navigate(['/inicio']);
        } else {
          this.error = 'Usuario o contraseña incorrecto.';
        }
      },
      err => {
        this.error = 'Error en el servidor. Por favor, inténtelo más tarde.';
        console.error('Detalles del error:', err);
      }
    );
  }
  
}
