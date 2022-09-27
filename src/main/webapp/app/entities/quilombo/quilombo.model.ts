import { IProcesso } from 'app/entities/processo/processo.model';
import { TipoQuilombo } from 'app/entities/enumerations/tipo-quilombo.model';

export interface IQuilombo {
  id?: number;
  nome?: string | null;
  tipoQuilombo?: TipoQuilombo | null;
  processos?: IProcesso[] | null;
}

export class Quilombo implements IQuilombo {
  constructor(
    public id?: number,
    public nome?: string | null,
    public tipoQuilombo?: TipoQuilombo | null,
    public processos?: IProcesso[] | null
  ) {}
}

export function getQuilomboIdentifier(quilombo: IQuilombo): number | undefined {
  return quilombo.id;
}
