import { IProcesso } from 'app/entities/processo/processo.model';

export interface IMunicipio {
  id?: number;
  amazoniaLegal?: boolean | null;
  codigoIbge?: number | null;
  estado?: string | null;
  nome?: string | null;
  processos?: IProcesso[] | null;
}

export class Municipio implements IMunicipio {
  constructor(
    public id?: number,
    public amazoniaLegal?: boolean | null,
    public codigoIbge?: number | null,
    public estado?: string | null,
    public nome?: string | null,
    public processos?: IProcesso[] | null
  ) {
    this.amazoniaLegal = this.amazoniaLegal ?? false;
  }
}

export function getMunicipioIdentifier(municipio: IMunicipio): number | undefined {
  return municipio.id;
}
