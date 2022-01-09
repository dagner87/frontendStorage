import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from 'src/app/shared/service/custom-validation.service';
import { UsuariosService } from 'src/app/shared/service/usuarios.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  //public accountForm: FormGroup;
  public permissionForm: FormGroup;
  msg: string = '';
  private emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public accountForm = this.formBuilder.group(
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
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private customValidationService: CustomValidationService,
    private toastr: ToastrService
  ) {
    this.createPermissionForm();
  }

  get name() {
    return this.accountForm.get('name');
  }
  get email() {
    return this.accountForm.get('email');
  }

  get password() {
    return this.accountForm.get('password');
  }
  get confirmPassword() {
    return this.accountForm.get('confirmPassword');
  }

  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({});
  }

  ngOnInit() {}

  crearUsuario() {
    //console.log('obteniendo datos', this.accountForm.value);
    if (this.accountForm.valid) {
      this.usuariosService.createUser(this.accountForm.value).subscribe(
        (resp) => {
          if (resp.ok) {
            this.toastr.success('Usuario', resp.msg);
            /** TODO : REDIRECCIONAR A LA LISTA DE USUARIOS */
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.accountForm.markAllAsTouched();
      console.log(this.accountForm.errors);
    }
  }
}
