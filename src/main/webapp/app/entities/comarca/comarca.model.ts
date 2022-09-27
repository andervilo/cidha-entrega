import { IProcesso } from 'app/entities/processo/processo.model';

export interface IComarca {
  id?: number;
  nome?: string | null;
  codigoCnj?: number | null;
  processos?: IProcesso[] | null;
}

export class Comarca implements IComarca {
  constructor(public id?: number, public nome?: string | null, public codigoCnj?: number | null, public processos?: IProcesso[] | null) {}
}

export function getComarcaIdentifier(comarca: IComarca): number | undefined {
  return comarca.id;
}
