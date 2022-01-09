import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Message, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

//Servicio
import { AuthService } from 'src/app/shared/service/auth.service';
import { CustomValidationService } from 'src/app/shared/service/custom-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formSumitted: boolean = false;
  userInvalid: boolean = false;
  userCreate: boolean = false;
  userExist: boolean = false;
  public msg: string = '';

  private emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Formulario de login
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', Validators.required],
    password: ['', Validators.required],
    remember: false,
  });

  //Formulario de registro
  public registerForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(this.emailPattern),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER_ROLE'],
      terms: [false, Validators.requiredTrue],
    },
    {
      validator: this.customValidationService.passwordMatchValidator(
        'password',
        'confirmPassword'
      ),
    }
  );

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private customValidationService: CustomValidationService,
    private router: Router
  ) {}

  //------------------LOGIN---------------------
  get emailLogin() {
    return this.loginForm.get('email');
  }
  get passwordLogin() {
    return this.loginForm.get('password');
  }

  //-----------------REGISTER------------------
  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get terms() {
    return this.registerForm.get('terms');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get password() {
    return this.registerForm.get('password');
  }

  owlcarousel = [
    {
      title: 'Welcome to Dasboard',
      desc: 'You can administrate all Storage ',
    },
  ];
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true,
  };

  login() {
    this.formSumitted = true;
    if (this.loginForm.valid) {
      this.authservice.login(this.loginForm.value).subscribe(
        (resp) => {
          //console.log('paso', resp);
          if (resp) {
            this.router.navigateByUrl('/dashboard/default');
            if (this.loginForm.get('remember').value) {
              localStorage.setItem('email', this.loginForm.get('email').value);
            } else {
              localStorage.removeItem('email');
            }
          } else {
            this.router.navigateByUrl('/auth/login');
            this.userInvalid = true;
          }
        },
        (err) => {
          this.userInvalid = true;
          console.log(err.error.msg, 'error');
          //alert(err.error.msg);
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  campoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSumitted) {
      return true;
    }

    return false;
  }

  acepTerms() {
    return !this.registerForm.get('terms').value && this.formSumitted;
  }

  ngOnInit() {}

  onSubmit() {}

  resetRegisterForm() {
    this.registerForm.reset();
  }
  resetLoginForm() {
    this.loginForm.reset();
  }
}
