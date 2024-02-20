import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Curso } from '../model/curso';
import { Observable, delay, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly api = '../../../assets/cursos.json';

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Curso[]>(this.api)
      .pipe(
        first(),
        delay(2000),
        tap(cursos => console.log(cursos))
      );
  }
}
