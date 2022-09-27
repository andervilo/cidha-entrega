import { ITipoRepresentante } from 'app/entities/tipo-representante/tipo-representante.model';
import { IParteInteresssada } from 'app/entities/parte-interesssada/parte-interesssada.model';

export interface IRepresentanteLegal {
  id?: number;
  nome?: string | null;
  tipoRepresentante?: ITipoRepresentante | null;
  processoConflitos?: IParteInteresssada[] | null;
}

export class RepresentanteLegal implements IRepresentanteLegal {
  constructor(
    public id?: number,
    public nome?: string | null,
    public tipoRepresentante?: ITipoRepresentante | null,
    public processoConflitos?: IParteInteresssada[] | null
  ) {}
}

export function getRepresentanteLegalIdentifier(representanteLegal: IRepresentanteLegal): number | undefined {
  return representanteLegal.id;
}
