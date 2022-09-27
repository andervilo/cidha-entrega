export interface ITipoEmpreendimento {
  id?: number;
  descricao?: string | null;
}

export class TipoEmpreendimento implements ITipoEmpreendimento {
  constructor(public id?: number, public descricao?: string | null) {}
}

export function getTipoEmpreendimentoIdentifier(tipoEmpreendimento: ITipoEmpreendimento): number | undefined {
  return tipoEmpreendimento.id;
}
