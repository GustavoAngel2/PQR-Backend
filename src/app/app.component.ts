import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, currentUser } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  actualUser: currentUser = { Id: "", NombreUsuario: "",Rol:"", IdRol:""};
  userSubscription!: Subscription;

  constructor(private authService: AuthService,) {}

  ngOnInit() {
    
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.actualUser = user;
      console.log('User updated:', this.actualUser);
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
  }
}
