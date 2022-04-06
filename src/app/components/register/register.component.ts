import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserRegistrationRequest } from '../shared/clientSwagger/onlineLibrary.client';
import { OnlineLibraryService } from '../shared/services/online-library.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private onlineLibraryService: OnlineLibraryService,
    private registerFormBuilder: FormBuilder) { }

  registerForm : any;
  registerInfos: UserRegistrationRequest = new UserRegistrationRequest();

  ngOnInit(): void {
    this.registerForm = this.initFormBuilder();
  }

  public initFormBuilder() : FormGroup {
    return this.registerFormBuilder.group({
      firstName: [new String(), [Validators.required]],
      lastName: [new String(), [Validators.required]],
      email: [new String(), [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: [new String(), [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      passwordConfirm: [new String(), [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }

  public async register(){}
}
