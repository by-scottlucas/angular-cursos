import { Curso } from "./curso";

export interface CursoPage {
  cursos: Curso[];
  totalElementos: number;
  totalPaginas: number;
}
