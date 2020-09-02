import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { validUser, blankUser } from './userTest';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);

const testUserData = { id: 1, name: 'TekLoon'};
const loginErrorMsg = 'Invalid Login';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ HttpClientTestingModule , RouterTestingModule,FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    // expect(component.submitted).toBeFalsy();
    // expect(component.loginForm).toBeDefined();
    // expect(component.form.Invalid).toBeTruthy();

    expect(component.isLoggedIn).toBeFalsy();
    expect(component.form).toBeDefined();
    expect(component.form).toBeTruthy();
    expect(component.isLoginFailed).toBeFalsy();
   // expect(component.errorMessage).toBeUndefined();

  });

  // it('submitted should be true when onSubmit()', () => {
  //   //component.onSubmit();
  //   expect(component.isLoggedIn).toBeTruthy();
  //   expect(component.isLoginFailed).toBeFalsy();
  // });
});
