import { ITipoRecurso } from 'app/entities/tipo-recurso/tipo-recurso.model';
import { IOpcaoRecurso } from 'app/entities/opcao-recurso/opcao-recurso.model';
import { IProcesso } from 'app/entities/processo/processo.model';

export interface IRecurso {
  id?: number;
  observacoes?: string | null;
  tipoRecurso?: ITipoRecurso | null;
  opcaoRecurso?: IOpcaoRecurso | null;
  processo?: IProcesso | null;
}

export class Recurso implements IRecurso {
  constructor(
    public id?: number,
    public observacoes?: string | null,
    public tipoRecurso?: ITipoRecurso | null,
    public opcaoRecurso?: IOpcaoRecurso | null,
    public processo?: IProcesso | null
  ) {}
}

export function getRecursoIdentifier(recurso: IRecurso): number | undefined {
  return recurso.id;
}
