import { IProblemaJuridico } from 'app/entities/problema-juridico/problema-juridico.model';

export interface IFundamentacaoDoutrinaria {
  id?: number;
  fundamentacaoDoutrinariaCitada?: string | null;
  folhasFundamentacaoDoutrinaria?: string | null;
  fundamentacaoDoutrinariaSugerida?: string | null;
  problemaJuridicos?: IProblemaJuridico[] | null;
}

export class FundamentacaoDoutrinaria implements IFundamentacaoDoutrinaria {
  constructor(
    public id?: number,
    public fundamentacaoDoutrinariaCitada?: string | null,
    public folhasFundamentacaoDoutrinaria?: string | null,
    public fundamentacaoDoutrinariaSugerida?: string | null,
    public problemaJuridicos?: IProblemaJuridico[] | null
  ) {}
}

export function getFundamentacaoDoutrinariaIdentifier(fundamentacaoDoutrinaria: IFundamentacaoDoutrinaria): number | undefined {
  return fundamentacaoDoutrinaria.id;
}
