import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface currentUser {
  Id: string;
  Nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:5020/api";
  private currentUserSubject: BehaviorSubject<currentUser>;
  public currentUser: Observable<currentUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<currentUser>(this.getStoredUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getStoredUser(): currentUser {
    return {
      Id: sessionStorage.getItem('Id') ?? '',
      Nombre: sessionStorage.getItem('NombreUsuario') ?? ''
    };
  }

  login(credentials: { username: string, idUsername: string, userpassword: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SignIn`, credentials).pipe(
      map(response => {
        console.log('API response:', response);
        if (response && response.Success && response.Response && response.Response.data && response.Response.data.Token) {
          sessionStorage.setItem('Token', response.Response.data.Token);
          this.setIdUsername(response.Response.data.Usuario.Id.toString());
          this.setUsername(response.Response.data.Usuario.NombreUsuario);
          this.updateCurrentUser(response.Response.data.Usuario);
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
    this.updateCurrentUser({ Id: '', Nombre: '' });
  }

  getToken() {
    return sessionStorage.getItem('Token');
  }

  setIdUsername(id: string) {
    sessionStorage.setItem('Id', id);
    console.log('IdUsername set in sessionStorage:', id);
  }

  setUsername(username: string) {
    sessionStorage.setItem('NombreUsuario', username);
    console.log('Username set in sessionStorage:', username);
  }

  getIdUsername(): string {
    return sessionStorage.getItem('Id') ?? '';
  }

  getUsername(): string {
    return sessionStorage.getItem('NombreUsuario') ?? '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private updateCurrentUser(user: currentUser) {
    this.currentUserSubject.next(user);
  }
}
