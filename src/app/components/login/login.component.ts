import { Component, OnChanges, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginRequest, UserLoginResponse } from '../shared/clientSwagger/onlineLibrary.client';
import { AuthService } from '../shared/security/services/auth.service';
import { OnlineLibraryService } from '../shared/services/online-library.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges {

  constructor(private onlineLibraryService: OnlineLibraryService,
    private authService: AuthService,
    private loginFormBuilder: FormBuilder,
    private router: Router) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.adminAccess = this.authService.haveAdminAccess();
  }

  loginForm : any;
  adminAccess : boolean = false;
  loginInfos: UserLoginRequest = new UserLoginRequest();
  loginReponse: UserLoginResponse = new UserLoginResponse();
  token: String | undefined = new String();
  invalidLogin: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.initFormBuilder();
    this.adminAccess = this.authService.haveAdminAccess();
    console.log(this.loginForm)
  }

  public initFormBuilder() : FormGroup {
    return this.loginFormBuilder.group({
      email: [new String(), [Validators.required]],
      password: [new String(), [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  public async Login(){
    if (this.loginForm.invalid) {
			console.log("Form invalid");
      return;
		}
    this.loginInfos.email = this.loginForm.value.email;
    this.loginInfos.password = this.loginForm.value.password;

    await this.authService.login(this.loginInfos)
      .then(x => {
        this.loginReponse = x;
        if(this.loginReponse.success){
          this.authService.saveTokens(this.loginReponse)
          this.adminAccess = this.authService.haveAdminAccess();
          if(this.adminAccess){
            this.router.navigate(['/dashboard'])
            .then(() => {
              window.location.reload();
            });
          }else{
            this.router.navigate([''])
            .then(() => {
              window.location.reload();
            });
          }
        }
      })
      .catch(x => {
        this.invalidLogin = true;
      });
  }

  get email() {
    return this.loginForm.get("email");
  }

}
