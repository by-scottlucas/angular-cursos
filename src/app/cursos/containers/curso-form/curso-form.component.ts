import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../../model/curso';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent implements OnInit {

  form = this.formBuilder.group({
    nome: [''],
    categoria: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private cursoService: CursosService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    const curso: Curso = this.route.snapshot.data['curso'];
    console.log(curso._id);

    // this.form.setValue({
    //   nome: curso.nome,
    //   categoria: curso.categoria
    // })

  }

  onSubmit() {

    const data = this.form.value;

    this.cursoService.save(data).subscribe(result => this.onSucess(), error => this.onError());
    // this.router.navigate(["/"]);
    this.location.back();
  }

  onCancel() {
    this.router.navigate(["/"]);
    this.location.back();
  }

  private onSucess() {
    this.snackBar.open("Curso salvo com sucesso!", "", { duration: 5000 })
  }

  private onError() {
    this.snackBar.open("Erro ao salvar o curso!", "", { duration: 5000 })
  }

}
