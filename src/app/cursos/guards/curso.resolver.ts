import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Curso } from '../model/curso';
import { CursosService } from '../services/cursos.service';

@Injectable({
  providedIn: 'root'
})
export class CursoResolver {

  constructor(private cursoService: CursosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso> {
    if (route.params && route.params['id']) {
      return this.cursoService.getById(route.params['id']);
    }
    return of({ _id: '', nome: '', categoria: '' });
  }

};
