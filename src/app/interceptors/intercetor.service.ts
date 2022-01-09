import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IntercetorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token') || '',
    });
    const reqClone = req.clone({
      headers,
    });
    //console.log('implementando Interceptors', headers);

    return next.handle(reqClone).pipe(catchError(this.manejarErrores));
  }

  manejarErrores(error: HttpErrorResponse) {
    console.warn(error);
    return throwError('Error Personalizado');
  }
}
