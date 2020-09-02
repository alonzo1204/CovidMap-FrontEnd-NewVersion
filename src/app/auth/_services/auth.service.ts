import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//const AUTH_API = 'http://covid-map-2020-back-end.herokuapp.com/api/auth/';
//const AUTH_API = 'https://covid-map-2020-back-end.herokuapp.com/api/auth/';
const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      name: user.name,
      lastname: user.lastname,
      idDataCountry: user.idDataCountry,
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
}
