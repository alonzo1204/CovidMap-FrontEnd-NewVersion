import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { DataCountryService } from '../_services/dataCountry.service';
import { NbThemeService } from '@nebular/theme';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor( private themeService: NbThemeService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    public dataCountryService: DataCountryService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isSuccessful=true;
      this.router.navigateByUrl('/pages/dashboard');
    }else {
    this.getDataCountries()}
  }
  getDataCountries(){
    this.dataCountryService.getDataCountries().subscribe(
      data => {
        console.log("getDataCountries",data)
        this.dataCountryService.dataCountries = data as any[];
      },
      err => {
        console.log(err)
      }
    );
  }
  toDashBoard() {
    this.router.navigateByUrl('/pages/home');
  }
  toLogin(){
    this.router.navigateByUrl('/auth/login')
  }

  onSubmit() {
    this.form.idDataCountry = Number(this.form.idDataCountry)

    this.authService.register(this.form).subscribe(
      data => {
        console.log("data",data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
   }
}
