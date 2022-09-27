import { IProcesso } from 'app/entities/processo/processo.model';

export interface IConcessaoLiminar {
  id?: number;
  descricao?: string | null;
  processo?: IProcesso | null;
}

export class ConcessaoLiminar implements IConcessaoLiminar {
  constructor(public id?: number, public descricao?: string | null, public processo?: IProcesso | null) {}
}

export function getConcessaoLiminarIdentifier(concessaoLiminar: IConcessaoLiminar): number | undefined {
  return concessaoLiminar.id;
}
