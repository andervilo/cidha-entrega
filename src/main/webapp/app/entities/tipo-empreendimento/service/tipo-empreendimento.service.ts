import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoEmpreendimento, getTipoEmpreendimentoIdentifier } from '../tipo-empreendimento.model';

export type EntityResponseType = HttpResponse<ITipoEmpreendimento>;
export type EntityArrayResponseType = HttpResponse<ITipoEmpreendimento[]>;

@Injectable({ providedIn: 'root' })
export class TipoEmpreendimentoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-empreendimentos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tipoEmpreendimento: ITipoEmpreendimento): Observable<EntityResponseType> {
    return this.http.post<ITipoEmpreendimento>(this.resourceUrl, tipoEmpreendimento, { observe: 'response' });
  }

  update(tipoEmpreendimento: ITipoEmpreendimento): Observable<EntityResponseType> {
    return this.http.put<ITipoEmpreendimento>(
      `${this.resourceUrl}/${getTipoEmpreendimentoIdentifier(tipoEmpreendimento) as number}`,
      tipoEmpreendimento,
      { observe: 'response' }
    );
  }

  partialUpdate(tipoEmpreendimento: ITipoEmpreendimento): Observable<EntityResponseType> {
    return this.http.patch<ITipoEmpreendimento>(
      `${this.resourceUrl}/${getTipoEmpreendimentoIdentifier(tipoEmpreendimento) as number}`,
      tipoEmpreendimento,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoEmpreendimento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoEmpreendimento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTipoEmpreendimentoToCollectionIfMissing(
    tipoEmpreendimentoCollection: ITipoEmpreendimento[],
    ...tipoEmpreendimentosToCheck: (ITipoEmpreendimento | null | undefined)[]
  ): ITipoEmpreendimento[] {
    const tipoEmpreendimentos: ITipoEmpreendimento[] = tipoEmpreendimentosToCheck.filter(isPresent);
    if (tipoEmpreendimentos.length > 0) {
      const tipoEmpreendimentoCollectionIdentifiers = tipoEmpreendimentoCollection.map(
        tipoEmpreendimentoItem => getTipoEmpreendimentoIdentifier(tipoEmpreendimentoItem)!
      );
      const tipoEmpreendimentosToAdd = tipoEmpreendimentos.filter(tipoEmpreendimentoItem => {
        const tipoEmpreendimentoIdentifier = getTipoEmpreendimentoIdentifier(tipoEmpreendimentoItem);
        if (tipoEmpreendimentoIdentifier == null || tipoEmpreendimentoCollectionIdentifiers.includes(tipoEmpreendimentoIdentifier)) {
          return false;
        }
        tipoEmpreendimentoCollectionIdentifiers.push(tipoEmpreendimentoIdentifier);
        return true;
      });
      return [...tipoEmpreendimentosToAdd, ...tipoEmpreendimentoCollection];
    }
    return tipoEmpreendimentoCollection;
  }
}
