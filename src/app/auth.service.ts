import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:5020/api";

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, idUsername: string, userpassword: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SignIn`, credentials).pipe(
      map(response => {
        console.log('API response:', response);
        if (response && response.Response && response.Response.data && response.Response.data.Token) {
          localStorage.setItem('Token', response.Response.data.Token); 
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
  }

  getToken() {
    return localStorage.getItem('Token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
