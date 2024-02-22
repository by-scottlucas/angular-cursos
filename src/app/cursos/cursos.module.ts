import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { CursosListaComponent } from './components/cursos-lista/cursos-lista.component';
import { CursoFormComponent } from './containers/curso-form/curso-form.component';
import { CursosComponent } from './containers/cursos/cursos.component';
import { CursosRoutingModule } from './cursos-routing.module';


@NgModule({
  declarations: [
    CursosComponent,
    CursoFormComponent,
    CursosListaComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CursosModule { }
