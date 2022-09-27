import { IRepresentanteLegal } from 'app/entities/representante-legal/representante-legal.model';
import { IProcesso } from 'app/entities/processo/processo.model';

export interface IParteInteresssada {
  id?: number;
  nome?: string | null;
  classificacao?: string | null;
  representanteLegals?: IRepresentanteLegal[] | null;
  processos?: IProcesso[] | null;
}

export class ParteInteresssada implements IParteInteresssada {
  constructor(
    public id?: number,
    public nome?: string | null,
    public classificacao?: string | null,
    public representanteLegals?: IRepresentanteLegal[] | null,
    public processos?: IProcesso[] | null
  ) {}
}

export function getParteInteresssadaIdentifier(parteInteresssada: IParteInteresssada): number | undefined {
  return parteInteresssada.id;
}
