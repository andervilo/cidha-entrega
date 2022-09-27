import { ISubsecaoJudiciaria } from 'app/entities/subsecao-judiciaria/subsecao-judiciaria.model';

export interface ISecaoJudiciaria {
  id?: number;
  sigla?: string | null;
  nome?: string | null;
  subsecaoJudiciaria?: ISubsecaoJudiciaria | null;
}

export class SecaoJudiciaria implements ISecaoJudiciaria {
  constructor(
    public id?: number,
    public sigla?: string | null,
    public nome?: string | null,
    public subsecaoJudiciaria?: ISubsecaoJudiciaria | null
  ) {}
}

export function getSecaoJudiciariaIdentifier(secaoJudiciaria: ISecaoJudiciaria): number | undefined {
  return secaoJudiciaria.id;
}
