import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { Registration } from '../model/registration';
import jwt_decode from 'jwt-decode';


const AUTH_API = 'http://localhost:8080/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private loggedIn = false;
  public tokenKey = 'access_token';
  static this: any;
  public user = '';


  constructor(private http: HttpClient, private router: Router) { }

  public getToken() {
    return sessionStorage.getItem(this.tokenKey);
  }

  login(email: string, password: string): Observable<any> {
    return this.http
    .post<any>(`${AUTH_API}/login`,
      { "email": email, "password": password })
    .pipe(map(token => {
      if (token) {
        sessionStorage.setItem(this.tokenKey, token.access_token);
      }
      return token;
    }))
  }

  register(email: string, password: string): Observable<Registration> {
    return this.http.post<Registration>(`${AUTH_API}/register`,
    { "email": email, "password": password })
  }

  logout() {
    return this.http.get<any>(`${AUTH_API}/logout`, { observe: 'response' })
    .subscribe((res) => {
          if (res.status == 200) {
            sessionStorage.removeItem(this.tokenKey);
          }}) 
        }
          
  LoggedIn(): boolean {
    const token = sessionStorage.getItem(this.tokenKey);
    if (token) {
      this.loggedIn = true
      return true;
    }
    return false;
  }

  currentUser(token: string | any): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}

