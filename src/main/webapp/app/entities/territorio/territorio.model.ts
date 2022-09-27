import { IProcesso } from 'app/entities/processo/processo.model';

export interface ITerritorio {
  id?: number;
  nome?: string | null;
  processos?: IProcesso[] | null;
}

export class Territorio implements ITerritorio {
  constructor(public id?: number, public nome?: string | null, public processos?: IProcesso[] | null) {}
}

export function getTerritorioIdentifier(territorio: ITerritorio): number | undefined {
  return territorio.id;
}
