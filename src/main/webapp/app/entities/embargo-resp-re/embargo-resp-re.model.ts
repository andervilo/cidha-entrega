import { IProcesso } from 'app/entities/processo/processo.model';

export interface IEmbargoRespRe {
  id?: number;
  descricao?: string | null;
  processo?: IProcesso | null;
}

export class EmbargoRespRe implements IEmbargoRespRe {
  constructor(public id?: number, public descricao?: string | null, public processo?: IProcesso | null) {}
}

export function getEmbargoRespReIdentifier(embargoRespRe: IEmbargoRespRe): number | undefined {
  return embargoRespRe.id;
}
