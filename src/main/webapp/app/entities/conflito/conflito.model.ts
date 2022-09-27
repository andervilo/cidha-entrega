import { IProcessoConflito } from 'app/entities/processo-conflito/processo-conflito.model';

export interface IConflito {
  id?: number;
  descricao?: string | null;
  processoConflito?: IProcessoConflito | null;
}

export class Conflito implements IConflito {
  constructor(public id?: number, public descricao?: string | null, public processoConflito?: IProcessoConflito | null) {}
}

export function getConflitoIdentifier(conflito: IConflito): number | undefined {
  return conflito.id;
}
