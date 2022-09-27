import { IConflito } from 'app/entities/conflito/conflito.model';
import { IDireito } from 'app/entities/direito/direito.model';
import { IProcesso } from 'app/entities/processo/processo.model';

export interface IProcessoConflito {
  id?: number;
  inicioConflitoObservacoes?: string | null;
  historicoConlito?: string | null;
  nomeCasoComuidade?: string | null;
  consultaPrevia?: boolean | null;
  conflitos?: IConflito[] | null;
  direitos?: IDireito[] | null;
  processos?: IProcesso[] | null;
}

export class ProcessoConflito implements IProcessoConflito {
  constructor(
    public id?: number,
    public inicioConflitoObservacoes?: string | null,
    public historicoConlito?: string | null,
    public nomeCasoComuidade?: string | null,
    public consultaPrevia?: boolean | null,
    public conflitos?: IConflito[] | null,
    public direitos?: IDireito[] | null,
    public processos?: IProcesso[] | null
  ) {
    this.consultaPrevia = this.consultaPrevia ?? false;
  }
}

export function getProcessoConflitoIdentifier(processoConflito: IProcessoConflito): number | undefined {
  return processoConflito.id;
}
