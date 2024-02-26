import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, first } from 'rxjs';
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
        // delay(800),
        // tap(cursos => console.log(cursos))
      );
  }

  save(data: Partial<Curso>) {
    console.log(data);
    if (data.id) {
      console.log('update');
      return this.update(data);
    }
    console.log('create');
    return this.create(data);
  }

  getById(id: string): Observable<Curso> {
    return this.http.get<Curso>(`${this.api}/${id}`);
  }

  remove(id: String) {
    const url = `${this.api}/${id}`
    return this.http.delete(url);
  }

  private create(data: Partial<Curso>) {
    return this.http.post<Curso>(this.api, data);
  }

  private update(data: Partial<Curso>) {
    const url = `${this.api}/${data.id}`
    return this.http.put<Curso>(url, data);
  }
}
