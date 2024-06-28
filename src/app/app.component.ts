import { Component, OnInit } from '@angular/core';
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
    this.idUsername = this.authService.getIdUsername();
    this.username = this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
  }
}
