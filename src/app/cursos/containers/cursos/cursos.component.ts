import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Curso } from '../../model/curso';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  cursos$: Observable<Curso[]> | null = null;
  displayedColumns = ['nome', 'categoria', 'acoes'];

  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
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
    const id = curso.id;
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  onRemove(curso: Curso) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Deseja excluir o curso do sistema?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {
        const id = curso.id;
        this.cursosService.remove(id).subscribe(() => {
          this.refresh();
          this.snackBar.open("Curso removimo com sucesso!", "X", { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' })
        },
          () => this.onError("Erro ao tentar remover um curso")
        );
      }

    });

  }

}
