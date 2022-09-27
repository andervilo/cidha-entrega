import dayjs from 'dayjs/esm';
import { ITipoData } from 'app/entities/tipo-data/tipo-data.model';
import { IProcesso } from 'app/entities/processo/processo.model';

export interface IData {
  id?: number;
  data?: dayjs.Dayjs | null;
  tipoData?: ITipoData | null;
  processo?: IProcesso | null;
}

export class Data implements IData {
  constructor(
    public id?: number,
    public data?: dayjs.Dayjs | null,
    public tipoData?: ITipoData | null,
    public processo?: IProcesso | null
  ) {}
}

export function getDataIdentifier(data: IData): number | undefined {
  return data.id;
}
