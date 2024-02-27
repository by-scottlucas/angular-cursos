import { Aula } from "./aula";

export interface Curso {
  id: string;
  nome: string;
  categoria: string;
  aulas: Aula[];
}
