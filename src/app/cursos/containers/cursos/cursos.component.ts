import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Curso } from '../../model/curso';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {

  cursos$: Observable<Curso[]>;
  displayedColumns = ['nome', 'categoria', 'acoes'];

  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
    this.cursos$ = this.cursosService.list()
      .pipe(catchError(error => {
        this.onError("Erro ao carregar os cursos");
        return of([]);
      }));
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }

  onAdd() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  onEdit(curso: Curso) {

    // const id = curso._id;

    this.router.navigate(["edit", curso._id], { relativeTo: this.route });
  }

}
