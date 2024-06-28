import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { currentUser } from './models/usuario.model';
import { getMatInputUnsupportedTypeError } from '@angular/material/input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  actualUser: currentUser;

  constructor(private authService: AuthService) {
    this.actualUser = {
      Id: "",
      Nombre: ""
    };
  }

  ngOnInit() {
    this.getUser()
  }

  getUser(){
    this.actualUser.Id = this.authService.getIdUsername();
    this.actualUser.Nombre = this.authService.getUsername();
    console.log(this.actualUser)
  }

  logout() {
    this.authService.logout();
  }
}
