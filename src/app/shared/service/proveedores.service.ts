import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListProveedores } from '../interfaces/proveedores.interface';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  constructor(private http: HttpClient) {}

  obtenerProveedores(): Observable<ListProveedores> {
    return this.http.get<ListProveedores>(`${environment.base_url}proveedores`);
  }
}
