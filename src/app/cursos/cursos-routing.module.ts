import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CursoFormComponent } from './containers/curso-form/curso-form.component';
import { CursosComponent } from './containers/cursos/cursos.component';
import { CursoResolver } from './guards/curso.resolver';

const routes: Routes = [
  { path: '', component: CursosComponent },
  { path: 'new', component: CursoFormComponent, resolve: { curso: CursoResolver } },
  { path: 'edit/:id', component: CursoFormComponent, resolve: { curso: CursoResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
