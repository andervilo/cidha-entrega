import { IProcesso } from 'app/entities/processo/processo.model';

export interface IRelator {
  id?: number;
  nome?: string | null;
  processos?: IProcesso[] | null;
}

export class Relator implements IRelator {
  constructor(public id?: number, public nome?: string | null, public processos?: IProcesso[] | null) {}
}

export function getRelatorIdentifier(relator: IRelator): number | undefined {
  return relator.id;
}
