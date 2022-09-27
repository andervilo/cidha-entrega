import { IProblemaJuridico } from 'app/entities/problema-juridico/problema-juridico.model';

export interface IJurisprudencia {
  id?: number;
  jurisprudenciaCitadaDescricao?: string | null;
  folhasJurisprudenciaCitada?: string | null;
  jurisprudenciaSugerida?: string | null;
  problemaJuridicos?: IProblemaJuridico[] | null;
}

export class Jurisprudencia implements IJurisprudencia {
  constructor(
    public id?: number,
    public jurisprudenciaCitadaDescricao?: string | null,
    public folhasJurisprudenciaCitada?: string | null,
    public jurisprudenciaSugerida?: string | null,
    public problemaJuridicos?: IProblemaJuridico[] | null
  ) {}
}

export function getJurisprudenciaIdentifier(jurisprudencia: IJurisprudencia): number | undefined {
  return jurisprudencia.id;
}
