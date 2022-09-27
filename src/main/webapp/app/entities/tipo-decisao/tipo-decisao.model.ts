export interface ITipoDecisao {
  id?: number;
  descricao?: string | null;
}

export class TipoDecisao implements ITipoDecisao {
  constructor(public id?: number, public descricao?: string | null) {}
}

export function getTipoDecisaoIdentifier(tipoDecisao: ITipoDecisao): number | undefined {
  return tipoDecisao.id;
}
