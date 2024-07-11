import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface currentUser {
  Id: string;
  NombreUsuario: string;
  Rol: string;
  IdRol: string;
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
      NombreUsuario: sessionStorage.getItem('NombreUsuario') ?? '',
      Rol: sessionStorage.getItem('Rol') ?? '',
      IdRol : sessionStorage.getItem('IdRol') ?? ''
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
          this.setRol(response.Response.data.Usuario.Rol);
          this.setIdRol(response.Response.data.Usuario.IdRol);
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
    sessionStorage.removeItem('Rol');
    sessionStorage.removeItem('IdRol')
    this.updateCurrentUser({ Id: '', NombreUsuario: '' ,Rol:'', IdRol:''});
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
  
  setRol(rol: string) {
    sessionStorage.setItem('Rol', rol);
    console.log('Rol set in sessionStorage:', rol);
  }
  setIdRol(Idrol: string) {
    sessionStorage.setItem('IdRol', Idrol);
    console.log('IdRol set in sessionStorage:', Idrol);
  }
  getIdUsername(): string {
    return sessionStorage.getItem('Id') ?? '';
  }

  getUsername(): string {
    return sessionStorage.getItem('NombreUsuario') ?? '';
  }

  getRol():string{
    return sessionStorage.getItem('Rol') ?? '';
  }
  getIdRol():string{
    return sessionStorage.getItem('IdRol') ?? '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private updateCurrentUser(user: currentUser) {
    this.currentUserSubject.next(user);
  }

  // Nuevo método para obtener el usuario actual
  getCurrentUser(): currentUser {
    return this.currentUserSubject.value;
  }
}
