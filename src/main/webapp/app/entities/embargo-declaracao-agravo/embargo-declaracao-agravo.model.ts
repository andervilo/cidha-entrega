import { IProcesso } from 'app/entities/processo/processo.model';

export interface IEmbargoDeclaracaoAgravo {
  id?: number;
  descricao?: string | null;
  processo?: IProcesso | null;
}

export class EmbargoDeclaracaoAgravo implements IEmbargoDeclaracaoAgravo {
  constructor(public id?: number, public descricao?: string | null, public processo?: IProcesso | null) {}
}

export function getEmbargoDeclaracaoAgravoIdentifier(embargoDeclaracaoAgravo: IEmbargoDeclaracaoAgravo): number | undefined {
  return embargoDeclaracaoAgravo.id;
}
