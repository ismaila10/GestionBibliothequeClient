import { Component, OnChanges, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
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

  constructor(private authService: AuthService,
    private loginFormBuilder: FormBuilder,
    private router: Router) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.adminAccess = this.authService.haveAdminAccess()
  }

  loginForm : any;
  adminAccess : boolean = false;
  loginInfos: UserLoginRequest = new UserLoginRequest();
  loginReponse: UserLoginResponse = new UserLoginResponse();
  token: String | undefined = new String();
  isValidLogin: boolean = true;
  isValidInput: boolean = true;
  message: string = '';
  errorMessage: string = '';
  isNotif: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.initFormBuilder();
    this.adminAccess = this.authService.haveAdminAccess();
    console.log(this.loginForm)
  }

  public initFormBuilder() : FormGroup {
    return this.loginFormBuilder.group({
      email: [new String(), [Validators.required, Validators.email]],
      password: [new String(), [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  public async Login(){
    if (this.loginForm.invalid) {
      if(this.email.value == '' || this.password.value == ''){
        this.errorMessage = "Tous champs sont requis"
      }
      else if(this.email.errors) {
        this.errorMessage = "Le format du mail n'est pas bon"
      }else if(this.password.errors){
        this.errorMessage = "Le mot de passe doit comporter au minimum 8 caractères avec au moins un carac spé, un majus et un chiffre"
      }else {
        this.errorMessage = "Données saisies incorrectes"
      }
      this.isValidInput = false;
      setTimeout(() => {
        this.isValidInput = true;
      }, 5000);
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
        }else {
          this.message = "Erreur lors de la connexion";
            this.isValidLogin = false;
            this.isNotif = true;
            setTimeout(() => {
              this.isNotif = false;
              this.isValidLogin = true;
            }, 9000);
        }
      })
      .catch(x => {
        this.message = "Données saisies incorrectes";
          this.isValidLogin = false;
          this.isNotif = true;
          setTimeout(() => {
            this.isNotif = false;
            this.isValidLogin = true;
          }, 9000);
      });
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

}
