import { IProblemaJuridico } from 'app/entities/problema-juridico/problema-juridico.model';

export interface IInstrumentoInternacional {
  id?: number;
  instrumentoInternacionalCitadoDescricao?: string | null;
  folhasInstrumentoInternacional?: string | null;
  instrumentoInternacionalSugerido?: string | null;
  problemaJuridicos?: IProblemaJuridico[] | null;
}

export class InstrumentoInternacional implements IInstrumentoInternacional {
  constructor(
    public id?: number,
    public instrumentoInternacionalCitadoDescricao?: string | null,
    public folhasInstrumentoInternacional?: string | null,
    public instrumentoInternacionalSugerido?: string | null,
    public problemaJuridicos?: IProblemaJuridico[] | null
  ) {}
}

export function getInstrumentoInternacionalIdentifier(instrumentoInternacional: IInstrumentoInternacional): number | undefined {
  return instrumentoInternacional.id;
}
