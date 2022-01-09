import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import {
  Categoria,
  ListadoCategorias,
} from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  obtenerCategorias(): Observable<ListadoCategorias> {
    return this.http.get<ListadoCategorias>(
      `${environment.base_url}categorias?limit=20`
    );
  }

  createCategoria(categoria: Categoria): Observable<any> {
    return this.http.post(`${environment.base_url}categorias`, categoria);
  }

  eliminarCategoria(id: any): Observable<any> {
    return this.http.delete(`${environment.base_url}categorias/${id}`);
  }
  editarCategoria(id: any, data): Observable<any> {
    return this.http.put(`${environment.base_url}categorias/${id}`, data);
  }
}
