import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { delay, first, tap } from 'rxjs';
import { Curso } from '../model/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly api = 'http://localhost:8080/api/v1/cursos';

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Curso[]>(this.api)
      .pipe(
        first(),
        delay(800),
        tap(cursos => console.log(cursos))
      );
  }

  save(data: Partial<Curso>) {
    return this.http.post<Curso>(this.api, data);
  }

  getById(id: String) {
    return this.http.get<Curso>(`this.api/${id}`);
  }

}
