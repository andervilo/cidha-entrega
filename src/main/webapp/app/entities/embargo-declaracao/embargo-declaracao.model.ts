import { IProcesso } from 'app/entities/processo/processo.model';

export interface IEmbargoDeclaracao {
  id?: number;
  descricao?: string | null;
  processo?: IProcesso | null;
}

export class EmbargoDeclaracao implements IEmbargoDeclaracao {
  constructor(public id?: number, public descricao?: string | null, public processo?: IProcesso | null) {}
}

export function getEmbargoDeclaracaoIdentifier(embargoDeclaracao: IEmbargoDeclaracao): number | undefined {
  return embargoDeclaracao.id;
}
