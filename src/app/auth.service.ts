import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface currentUser {
  Id: number;
  NombreUsuario: string;
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
      Id: parseInt(sessionStorage.getItem('Id') ?? '0', 10),
      NombreUsuario: sessionStorage.getItem('NombreUsuario') ?? ''
    };
  }

  login(credentials: { username: string, idUsername: string, userpassword: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SignIn`, credentials).pipe(
      map(response => {
        console.log('API response:', response);
        if (response && response.Success && response.Response && response.Response.data && response.Response.data.Token) {
          sessionStorage.setItem('Token', response.Response.data.Token);
          this.setIdUsername(response.Response.data.Usuario.Id);
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
    this.updateCurrentUser({ Id: 0, NombreUsuario: '' });
  }

  getToken() {
    return sessionStorage.getItem('Token');
  }

  setIdUsername(id: number) {
    sessionStorage.setItem('Id', id.toString());
    console.log('IdUsername set in sessionStorage:', id);
  }

  setUsername(username: string) {
    sessionStorage.setItem('NombreUsuario', username);
    console.log('Username set in sessionStorage:', username);
  }

  getIdUsername(): number {
    return parseInt(sessionStorage.getItem('Id') ?? '0', 10);
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
