import { CanActivate, Router, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable()
export class AuthService implements CanActivate {
  constructor(public route: Router) {}
  canActivate(): boolean | UrlTree {
   
    const token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(USER_KEY);
console.log(this.route.url)
    if (token && user) {
        
      return true;
    } else {
      return this.route.parseUrl("/auth/login");
      //return true;
    }
  }
}
