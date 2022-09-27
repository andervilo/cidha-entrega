import { IEtniaIndigena } from 'app/entities/etnia-indigena/etnia-indigena.model';
import { IProcesso } from 'app/entities/processo/processo.model';

export interface ITerraIndigena {
  id?: number;
  descricao?: string | null;
  etnias?: IEtniaIndigena[] | null;
  processos?: IProcesso[] | null;
}

export class TerraIndigena implements ITerraIndigena {
  constructor(
    public id?: number,
    public descricao?: string | null,
    public etnias?: IEtniaIndigena[] | null,
    public processos?: IProcesso[] | null
  ) {}
}

export function getTerraIndigenaIdentifier(terraIndigena: ITerraIndigena): number | undefined {
  return terraIndigena.id;
}
