// app.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username: string = '';
  idUsername: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const idUsername = this.authService.getIdUsername();
    const username = this.authService.getUsername();

  }

  logout() {
    sessionStorage.removeItem('Token');

  }
}
