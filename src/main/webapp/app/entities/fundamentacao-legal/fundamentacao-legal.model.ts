import { IProblemaJuridico } from 'app/entities/problema-juridico/problema-juridico.model';

export interface IFundamentacaoLegal {
  id?: number;
  fundamentacaoLegal?: string | null;
  folhasFundamentacaoLegal?: string | null;
  fundamentacaoLegalSugerida?: string | null;
  problemaJuridicos?: IProblemaJuridico[] | null;
}

export class FundamentacaoLegal implements IFundamentacaoLegal {
  constructor(
    public id?: number,
    public fundamentacaoLegal?: string | null,
    public folhasFundamentacaoLegal?: string | null,
    public fundamentacaoLegalSugerida?: string | null,
    public problemaJuridicos?: IProblemaJuridico[] | null
  ) {}
}

export function getFundamentacaoLegalIdentifier(fundamentacaoLegal: IFundamentacaoLegal): number | undefined {
  return fundamentacaoLegal.id;
}
