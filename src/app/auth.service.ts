import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from './user.service'; // Importa el servicio de usuario aquí si es necesario

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:5020/api";

  constructor(private http: HttpClient, private userService: UserService) { }

  login(credentials: { username: string, idUsername: string, userpassword: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SignIn`, credentials).pipe(
      map(response => {
        console.log('API response:', response);
        if (response && response.Success && response.Response && response.Response.data && response.Response.data.Token) {
          sessionStorage.setItem('Token', response.Response.data.Token);
          this.setIdUsername(response.Response.data.Usuario.Id.toString());
          this.setUsername(response.Response.data.Usuario.NombreUsuario);
          return response.Response.data;
        } else {
          throw new Error('Invalid API response');
        }
      }),
      catchError(error => {
        console.error('Error in login service:', error);
        return throwError(error);
      })
    );
  }
  
  logout() {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('Id');
    sessionStorage.removeItem('NombreUsuario');
  }

  getToken() {
    return sessionStorage.getItem('Token');
  }

  setIdUsername(id: string) {
    sessionStorage.setItem('Id', id);
    console.log('IdUsername set in sessionStorage:', id);
  }

  getUsername(): string {
    return sessionStorage.getItem('NombreUsuario') ?? ''; // Usa coalescencia nula para manejar el caso donde el valor es null
  }

  setUsername(username: string) {
    sessionStorage.setItem('NombreUsuario', username);
    console.log('Username set in sessionStorage:', username);
  }

  getIdUsername(): string {
    return sessionStorage.getItem('Id') ?? ''; // Usa coalescencia nula para manejar el caso donde el valor es null
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
