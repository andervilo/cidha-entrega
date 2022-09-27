import { IProcessoConflito } from 'app/entities/processo-conflito/processo-conflito.model';

export interface IDireito {
  id?: number;
  descricao?: string | null;
  processoConflitos?: IProcessoConflito[] | null;
}

export class Direito implements IDireito {
  constructor(public id?: number, public descricao?: string | null, public processoConflitos?: IProcessoConflito[] | null) {}
}

export function getDireitoIdentifier(direito: IDireito): number | undefined {
  return direito.id;
}
