import { IProcesso } from 'app/entities/processo/processo.model';

export interface IAtividadeExploracaoIlegal {
  id?: number;
  descricao?: string | null;
  processos?: IProcesso[] | null;
}

export class AtividadeExploracaoIlegal implements IAtividadeExploracaoIlegal {
  constructor(public id?: number, public descricao?: string | null, public processos?: IProcesso[] | null) {}
}

export function getAtividadeExploracaoIlegalIdentifier(atividadeExploracaoIlegal: IAtividadeExploracaoIlegal): number | undefined {
  return atividadeExploracaoIlegal.id;
}
