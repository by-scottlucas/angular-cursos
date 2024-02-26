import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
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
    id: [''],
    nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    categoria: ['', [Validators.required]],
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

    this.form.setValue({
      id: curso.id,
      nome: curso.nome,
      categoria: curso.categoria
    })

  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo inválido';
  }

  onSubmit() {
    const data = this.form.value;
    this.cursoService.save(data).subscribe(result => this.onSucess(), error => this.onError());
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }

  private onSucess() {
    this.snackBar.open("Curso salvo com sucesso!", "", { duration: 5000 })
  }

  private onError() {
    this.snackBar.open("Erro ao salvar o curso!", "", { duration: 5000 })
  }

}
