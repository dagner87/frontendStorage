import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import {
  LoginInterfase,
  Usuario,
  UsuarioData,
  UsuarioLogueado,
} from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario!: UsuarioLogueado;

  get usuario() {
    return { ...this._usuario };
  }

  get imagenUrl() {
    console.log('Recibiendo img ', this._usuario.img);
    if (this._usuario.img == undefined) {
      this._usuario.img = 'assets/images/dashboard/user5.jpg';
    }

    return this._usuario.img;
  }

  constructor(private http: HttpClient) {}

  login(user: LoginInterfase): Observable<any> {
    //console.log(user);

    return this.http
      .post<Usuario>(`${environment.base_url}auth/login`, user)
      .pipe(
        tap((resp: any) => {
          console.log('Resp', resp);
          const { name, email, role, img } = resp.usuario;
          if (resp.ok) {
            this._usuario = {
              name,
              email,
              role,
              img,
            };
          }
          localStorage.setItem('token', resp.token!);
        }),
        map((resp) => resp.ok),
        catchError((err) => of(err.msg))
      );
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('x-token', token!);
    return this.http
      .get(`${environment.base_url}auth/renew`, {
        headers,
      })
      .pipe(
        tap((resp: any) => {
          const { name, email, role, img } = resp.usuario;
          if (resp.ok) {
            this._usuario = {
              name,
              email,
              role,
              img,
            };
          }
          localStorage.setItem('token', resp.token!);
        }),
        map((resp) => true),
        catchError((error) => of(false))
      );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
