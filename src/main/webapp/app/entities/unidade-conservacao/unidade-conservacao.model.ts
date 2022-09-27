import { IProcesso } from 'app/entities/processo/processo.model';

export interface IUnidadeConservacao {
  id?: number;
  descricao?: string | null;
  processos?: IProcesso[] | null;
}

export class UnidadeConservacao implements IUnidadeConservacao {
  constructor(public id?: number, public descricao?: string | null, public processos?: IProcesso[] | null) {}
}

export function getUnidadeConservacaoIdentifier(unidadeConservacao: IUnidadeConservacao): number | undefined {
  return unidadeConservacao.id;
}
