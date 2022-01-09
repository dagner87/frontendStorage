import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private rotuer: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    //console.log('pase por el canActivate AuthGuard');
    return this.authService.validarToken().pipe(
      tap((estaAutenticado) => {
        //console.log(estaAutenticado);

        if (!estaAutenticado) {
          this.rotuer.navigateByUrl('/auth/login');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    //console.log('canLoad');
    return this.authService.validarToken().pipe(
      tap((estaAutenticado) => {
        //console.log(estaAutenticado);

        if (!estaAutenticado) {
          this.rotuer.navigateByUrl('/auth/login');
        }
      })
    );
  }
}
