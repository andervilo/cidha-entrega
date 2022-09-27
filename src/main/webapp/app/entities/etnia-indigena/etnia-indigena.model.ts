import { ITerraIndigena } from 'app/entities/terra-indigena/terra-indigena.model';

export interface IEtniaIndigena {
  id?: number;
  nome?: string | null;
  terraIndigenas?: ITerraIndigena[] | null;
}

export class EtniaIndigena implements IEtniaIndigena {
  constructor(public id?: number, public nome?: string | null, public terraIndigenas?: ITerraIndigena[] | null) {}
}

export function getEtniaIndigenaIdentifier(etniaIndigena: IEtniaIndigena): number | undefined {
  return etniaIndigena.id;
}
