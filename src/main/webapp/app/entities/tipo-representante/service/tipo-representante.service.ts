import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoRepresentante, getTipoRepresentanteIdentifier } from '../tipo-representante.model';

export type EntityResponseType = HttpResponse<ITipoRepresentante>;
export type EntityArrayResponseType = HttpResponse<ITipoRepresentante[]>;

@Injectable({ providedIn: 'root' })
export class TipoRepresentanteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-representantes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tipoRepresentante: ITipoRepresentante): Observable<EntityResponseType> {
    return this.http.post<ITipoRepresentante>(this.resourceUrl, tipoRepresentante, { observe: 'response' });
  }

  update(tipoRepresentante: ITipoRepresentante): Observable<EntityResponseType> {
    return this.http.put<ITipoRepresentante>(
      `${this.resourceUrl}/${getTipoRepresentanteIdentifier(tipoRepresentante) as number}`,
      tipoRepresentante,
      { observe: 'response' }
    );
  }

  partialUpdate(tipoRepresentante: ITipoRepresentante): Observable<EntityResponseType> {
    return this.http.patch<ITipoRepresentante>(
      `${this.resourceUrl}/${getTipoRepresentanteIdentifier(tipoRepresentante) as number}`,
      tipoRepresentante,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoRepresentante>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoRepresentante[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTipoRepresentanteToCollectionIfMissing(
    tipoRepresentanteCollection: ITipoRepresentante[],
    ...tipoRepresentantesToCheck: (ITipoRepresentante | null | undefined)[]
  ): ITipoRepresentante[] {
    const tipoRepresentantes: ITipoRepresentante[] = tipoRepresentantesToCheck.filter(isPresent);
    if (tipoRepresentantes.length > 0) {
      const tipoRepresentanteCollectionIdentifiers = tipoRepresentanteCollection.map(
        tipoRepresentanteItem => getTipoRepresentanteIdentifier(tipoRepresentanteItem)!
      );
      const tipoRepresentantesToAdd = tipoRepresentantes.filter(tipoRepresentanteItem => {
        const tipoRepresentanteIdentifier = getTipoRepresentanteIdentifier(tipoRepresentanteItem);
        if (tipoRepresentanteIdentifier == null || tipoRepresentanteCollectionIdentifiers.includes(tipoRepresentanteIdentifier)) {
          return false;
        }
        tipoRepresentanteCollectionIdentifiers.push(tipoRepresentanteIdentifier);
        return true;
      });
      return [...tipoRepresentantesToAdd, ...tipoRepresentanteCollection];
    }
    return tipoRepresentanteCollection;
  }
}
