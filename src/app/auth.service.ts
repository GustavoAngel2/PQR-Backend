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
          localStorage.setItem('Token', response.Response.data.Token);
          this.userService.setIdUsername(response.Response.data.Usuario.Id.toString()); // Setear el Id en UserService (asegúrate de convertir a string si es necesario)
          this.userService.setUsername(response.Response.data.Usuario.NombreUsuario); // Setear el NombreUsuario en UserService
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
    localStorage.removeItem('Token');
    this.userService.setIdUsername(''); // Limpiar el Id en UserService al cerrar sesión
    this.userService.setUsername(''); // Limpiar el NombreUsuario en UserService al cerrar sesión
  }

  getToken() {
    return localStorage.getItem('Token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
