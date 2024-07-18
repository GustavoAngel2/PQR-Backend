import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  idUsername: string = '';
  userpassword: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  login() {
    this.error = '';
    const credentials = { username: this.username, idUsername: this.idUsername, userpassword: this.userpassword };
    console.log(credentials);
    this.authService.login(credentials).subscribe(
      response => {
        if (response) {
          this.toastr.info(`Bienvenido ${credentials.username}!`)
          this.router.navigate(['/inicio']);
        } else {
          this.error = 'Usuario o contraseña incorrecto.';
          console.log(this.error)
        }
      },
      err => {
        this.error = 'Error en el servidor. Por favor, inténtelo más tarde.';
        this.toastr.error(`Usuario o contraseña incorrectos`)
      }
    );
  }
}
