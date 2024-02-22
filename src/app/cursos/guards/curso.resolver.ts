import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { CursosService } from '../services/cursos.service';

@Injectable({
  providedIn: 'root'
})
export class CursoResolver {

  constructor(private cursoService: CursosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.params && route.params['id']) {
      return this.cursoService.getById(route.params['id']);
    }
    return of({ id: '', nome: '', categoria: '' });
  }

};
