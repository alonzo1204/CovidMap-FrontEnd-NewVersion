import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';


@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
   
 
  constructor(private tokenStorageService: TokenStorageService) { }
 
  ngOnInit() {
    console.log("tok",this.isLoggedIn)
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      console.log("inicio de sesion exitoso",this.tokenStorageService.getToken)
      this.roles = user.roles;
      //this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
      
    }
    console.log("inicio de sesion exitoso",this.tokenStorageService.getToken)
  }
   logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
