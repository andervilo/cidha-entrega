export interface ITipoData {
  id?: number;
  descricao?: string | null;
}

export class TipoData implements ITipoData {
  constructor(public id?: number, public descricao?: string | null) {}
}

export function getTipoDataIdentifier(tipoData: ITipoData): number | undefined {
  return tipoData.id;
}
