import { Component, OnDestroy, OnInit } from '@angular/core';
import { currentUser } from '../auth.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy{
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
}
