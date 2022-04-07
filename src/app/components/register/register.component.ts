import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserRegistrationRequest, UserRegistrationResponse } from '../shared/clientSwagger/onlineLibrary.client';
import { AuthService } from '../shared/security/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
    private registerFormBuilder: FormBuilder) { }

  registerForm : any;
  isNotif: boolean = false;
  registerInfos: UserRegistrationRequest = new UserRegistrationRequest();
  registerReponse: UserRegistrationResponse = new UserRegistrationResponse();
  isValidInput: boolean = true;
  isPasswordConforme: boolean = true;
  isValidRegister: boolean = false;
  errorMessage: string = '';
  message: string = '';

  ngOnInit(): void {
    this.registerForm = this.initFormBuilder();
  }

  public initFormBuilder() : FormGroup {
    return this.registerFormBuilder.group({
      firstName: [new String(), [Validators.required]],
      lastName: [new String(), [Validators.required]],
      email: [new String(), [Validators.required, Validators.email]],
      password: [new String(), [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      passwordConfirm: [new String(), [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
  }

  get email() {
    return this.registerForm.get("email");
  }
  get firstName() {
    return this.registerForm.get("firstName");
  }
  get lastName() {
    return this.registerForm.get("lastName");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get passwordConfirm() {
    return this.registerForm.get("passwordConfirm");
  }

  public async register(){
    if (this.registerForm.invalid) {
      if(this.email.value == '' || this.password.value == '' || this.firstName.value == '' || this.lastName.value == '' || this.passwordConfirm.value == ''){
        this.errorMessage = "Tous champs sont requis"
      }
      else if(this.email.errors) {
        this.errorMessage = "Le format du mail n'est pas bon"
      }else if(this.password.errors || this.passwordConfirm.errors){
        this.errorMessage = "Le mot de passe doit comporter au minimum 8 caractères avec au moins un carac spé, un majus et un chiffre"
      }else{
        this.errorMessage = "Données saisies incorrectes"
      }
      this.isValidInput = false;
      setTimeout(() => {
        this.isValidInput = true;
      }, 5000);
      return;
		}else if(this.password.value != this.passwordConfirm.value) {
      this.errorMessage = "Les deux mots de passes doivent être identiques";
      this.isPasswordConforme = false;
      setTimeout(() => {
        this.isPasswordConforme = true;
      }, 5000);
    }else{
      this.registerInfos.firstName = this.firstName.value;
      this.registerInfos.lastName = this.lastName.value;
      this.registerInfos.email = this.email.value;
      this.registerInfos.password = this.password.value;

      await this.authService.register(this.registerInfos)
        .then(x => {
          this.registerReponse = x;
          if(this.registerReponse.success){
            this.message = "Inscription réussie avec succes";
            this.isValidRegister = true;
            this.isNotif = true;
            setTimeout(() => {
              this.isNotif = false;
            }, 9000);
            this.registerForm.reset();
          }else {
            this.message = "Erreur lors de l'inscription";
            this.isValidRegister = false;
            this.isNotif = true;
            setTimeout(() => {
              this.isNotif = false;
              this.isValidRegister = true;
            }, 9000);
          }
        })
        .catch(x => {
          this.message = "Email déjà utilisé"
          this.isValidRegister = false;
          this.isNotif = true;
          setTimeout(() => {
            this.isNotif = false;
            this.isValidRegister = true;
          }, 9000);
        });
    }
  }
}
