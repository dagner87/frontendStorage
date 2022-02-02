import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListStorage } from '../interfaces/storage.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private http: HttpClient) {}

  obtenerStorage(): Observable<ListStorage> {
    return this.http.get<ListStorage>(`${environment.base_url}Storage`);
  }
  /*
  obtenerStoragePaginadas(): Observable<CategoriaItems> {
    return this.http.get<CategoriaItems>(`${environment.base_url}Storage`);
  }

  createCategoria(categoria: Categoria): Observable<any> {
    return this.http.post(`${environment.base_url}Storage`, categoria);
  }

  eliminarCategoria(id: any): Observable<any> {
    return this.http.delete(`${environment.base_url}Storage/${id}`);
  }
  editarCategoria(id: any, data): Observable<any> {
    return this.http.put(`${environment.base_url}Storage/${id}`, data);
  } */
}
