import { IProcesso } from 'app/entities/processo/processo.model';

export interface IEnvolvidosConflitoLitigio {
  id?: number;
  numeroIndividuos?: number | null;
  fonteInformacaoQtde?: string | null;
  observacoes?: string | null;
  processos?: IProcesso[] | null;
}

export class EnvolvidosConflitoLitigio implements IEnvolvidosConflitoLitigio {
  constructor(
    public id?: number,
    public numeroIndividuos?: number | null,
    public fonteInformacaoQtde?: string | null,
    public observacoes?: string | null,
    public processos?: IProcesso[] | null
  ) {}
}

export function getEnvolvidosConflitoLitigioIdentifier(envolvidosConflitoLitigio: IEnvolvidosConflitoLitigio): number | undefined {
  return envolvidosConflitoLitigio.id;
}
