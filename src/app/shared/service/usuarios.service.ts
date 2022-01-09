import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ListaUsuarios, UsuarioData } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<ListaUsuarios> {
    return this.http.get<ListaUsuarios>(
      `${environment.base_url}usuarios?limit=20`
    );
  }

  createUser(user: UsuarioData): Observable<any> {
    return this.http.post(`${environment.base_url}usuarios`, user);
  }
}
