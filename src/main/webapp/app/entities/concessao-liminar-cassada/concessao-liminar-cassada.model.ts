import { IProcesso } from 'app/entities/processo/processo.model';

export interface IConcessaoLiminarCassada {
  id?: number;
  descricao?: string | null;
  processo?: IProcesso | null;
}

export class ConcessaoLiminarCassada implements IConcessaoLiminarCassada {
  constructor(public id?: number, public descricao?: string | null, public processo?: IProcesso | null) {}
}

export function getConcessaoLiminarCassadaIdentifier(concessaoLiminarCassada: IConcessaoLiminarCassada): number | undefined {
  return concessaoLiminarCassada.id;
}
