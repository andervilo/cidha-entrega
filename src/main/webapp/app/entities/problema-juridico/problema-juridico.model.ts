import { IFundamentacaoDoutrinaria } from 'app/entities/fundamentacao-doutrinaria/fundamentacao-doutrinaria.model';
import { IJurisprudencia } from 'app/entities/jurisprudencia/jurisprudencia.model';
import { IFundamentacaoLegal } from 'app/entities/fundamentacao-legal/fundamentacao-legal.model';
import { IInstrumentoInternacional } from 'app/entities/instrumento-internacional/instrumento-internacional.model';
import { IProcesso } from 'app/entities/processo/processo.model';

export interface IProblemaJuridico {
  id?: number;
  prolemaJuridicoRespondido?: string | null;
  folhasProblemaJuridico?: string | null;
  fundamentacaoDoutrinarias?: IFundamentacaoDoutrinaria[] | null;
  jurisprudencias?: IJurisprudencia[] | null;
  fundamentacaoLegals?: IFundamentacaoLegal[] | null;
  instrumentoInternacionals?: IInstrumentoInternacional[] | null;
  processos?: IProcesso[] | null;
}

export class ProblemaJuridico implements IProblemaJuridico {
  constructor(
    public id?: number,
    public prolemaJuridicoRespondido?: string | null,
    public folhasProblemaJuridico?: string | null,
    public fundamentacaoDoutrinarias?: IFundamentacaoDoutrinaria[] | null,
    public jurisprudencias?: IJurisprudencia[] | null,
    public fundamentacaoLegals?: IFundamentacaoLegal[] | null,
    public instrumentoInternacionals?: IInstrumentoInternacional[] | null,
    public processos?: IProcesso[] | null
  ) {}
}

export function getProblemaJuridicoIdentifier(problemaJuridico: IProblemaJuridico): number | undefined {
  return problemaJuridico.id;
}
