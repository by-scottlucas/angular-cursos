import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, delay, first } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Curso } from '../model/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly baseApiUrl = environment.baseApiUrl;
  private readonly api = `${this.baseApiUrl}/api/v1/cursos`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Curso[]>(this.api)
      .pipe(
        first(),
        delay(800),
        // tap(cursos => console.log(cursos))
      );
  }

  save(data: Partial<Curso>) {
    return this.http.post<Curso>(this.api, data);
  }

  getById(id: string): Observable<Curso> {
    // const url = `${this.api}/${id}`;
    const url = this.api + id;
    return this.http.get<Curso>(url);
  }

}
