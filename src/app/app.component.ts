// app.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username: string = '';
  idUsername: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.username = this.userService.getUsername();
    this.idUsername = this.userService.getIdUsername();
  }

  logout() {
    localStorage.removeItem('Token');
    // Aquí podrías también limpiar los valores de username e idUsername en UserService si es necesario
    this.userService.setUsername('');
    this.userService.setIdUsername('');
  }
}
