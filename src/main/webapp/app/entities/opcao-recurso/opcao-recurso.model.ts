export interface IOpcaoRecurso {
  id?: number;
  descricao?: string | null;
}

export class OpcaoRecurso implements IOpcaoRecurso {
  constructor(public id?: number, public descricao?: string | null) {}
}

export function getOpcaoRecursoIdentifier(opcaoRecurso: IOpcaoRecurso): number | undefined {
  return opcaoRecurso.id;
}
