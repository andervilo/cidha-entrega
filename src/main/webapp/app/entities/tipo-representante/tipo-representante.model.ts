export interface ITipoRepresentante {
  id?: number;
  descricao?: string | null;
}

export class TipoRepresentante implements ITipoRepresentante {
  constructor(public id?: number, public descricao?: string | null) {}
}

export function getTipoRepresentanteIdentifier(tipoRepresentante: ITipoRepresentante): number | undefined {
  return tipoRepresentante.id;
}
