export interface Exercise {
  nome: string;
  series: number;
  repeticoes: number | string;
  link?: string;
  image?: string;
  instructions?: string[];
  variations?: string[];
  muscle_group?: string;
  id?: number;
  completed?: boolean;
}
