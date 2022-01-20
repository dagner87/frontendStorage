import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  uploadPhoto(id: string, tipo: string, photo: File): Observable<any> {
    console.log(photo);

    try {
      const fd = new FormData();
      fd.append('archivo', photo);
      const resp = this.http.put(
        `${environment.base_url}uploads/${tipo}/${id}`,
        fd
      );

      return resp;
    } catch (error) {
      console.log(error);
    }
  }
}
