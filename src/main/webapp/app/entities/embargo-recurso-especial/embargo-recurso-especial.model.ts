import { IProcesso } from 'app/entities/processo/processo.model';

export interface IEmbargoRecursoEspecial {
  id?: number;
  descricao?: string | null;
  processo?: IProcesso | null;
}

export class EmbargoRecursoEspecial implements IEmbargoRecursoEspecial {
  constructor(public id?: number, public descricao?: string | null, public processo?: IProcesso | null) {}
}

export function getEmbargoRecursoEspecialIdentifier(embargoRecursoEspecial: IEmbargoRecursoEspecial): number | undefined {
  return embargoRecursoEspecial.id;
}
