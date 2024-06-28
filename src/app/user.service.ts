// user.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private idUsername: string = '';
  private username: string = '';

  constructor() { }

  setIdUsername(id: string) {
    this.idUsername = id;
    console.log('IdUsername set in UserService:', this.idUsername);
  }

  setUsername(username: string) {
    this.username = username;
    console.log('Username set in UserService:', this.username);
  }

  getUsername(): string {
    return this.username;
  }
  
  getIdUsername(): string {
    return this.idUsername; 
  }
}
