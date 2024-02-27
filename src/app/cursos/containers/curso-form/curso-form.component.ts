import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { Aula } from '../../model/aula';
import { Curso } from '../../model/curso';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private cursoService: CursosService,
    private location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public formUtils: FormUtilsService
  ) { }

  ngOnInit(): void {
    const curso: Curso = this.route.snapshot.data['curso'];
    this.form = this.formBuilder.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      categoria: [curso.categoria, [Validators.required]],
      aulas: this.formBuilder.array(this.obterAulas(curso), [Validators.required])
    });
  }

  private obterAulas(curso: Curso) {
    const aulas = [];
    if (curso?.aulas) {
      curso.aulas.forEach(aula => aulas.push(this.criarAula(aula)));
    } else {
      aulas.push(this.criarAula());
    }
    return aulas;
  }

  private criarAula(aula: Aula = { id: '', nome: '', url: '' }) {
    return this.formBuilder.group({
      id: [aula.id],
      nome: [aula.nome, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      url: [aula.url, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
    })
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get("aulas")).controls;
  }

  addNewLesson() {
    const aulas = this.form.get("aulas") as UntypedFormArray;
    aulas.push(this.criarAula());
  }

  removeLesson(index: number) {
    const aulas = this.form.get("aulas") as UntypedFormArray;
    aulas.removeAt(index);
  }

  onSubmit() {

    if (this.form.valid) {
      const data = this.form.value;
      this.cursoService.save(data).subscribe(result => this.onSucess(), error => this.onError());
      this.location.back();
    } else {
      this.formUtils.validateAllFormField(this.form);
    }

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
