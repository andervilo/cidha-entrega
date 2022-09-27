export interface ISubsecaoJudiciaria {
  id?: number;
  sigla?: string | null;
  nome?: string | null;
}

export class SubsecaoJudiciaria implements ISubsecaoJudiciaria {
  constructor(public id?: number, public sigla?: string | null, public nome?: string | null) {}
}

export function getSubsecaoJudiciariaIdentifier(subsecaoJudiciaria: ISubsecaoJudiciaria): number | undefined {
  return subsecaoJudiciaria.id;
}
