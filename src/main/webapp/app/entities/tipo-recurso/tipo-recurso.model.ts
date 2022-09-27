export interface ITipoRecurso {
  id?: number;
  descricao?: string | null;
}

export class TipoRecurso implements ITipoRecurso {
  constructor(public id?: number, public descricao?: string | null) {}
}

export function getTipoRecursoIdentifier(tipoRecurso: ITipoRecurso): number | undefined {
  return tipoRecurso.id;
}
