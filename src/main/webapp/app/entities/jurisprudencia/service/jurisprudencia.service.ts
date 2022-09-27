import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IJurisprudencia, getJurisprudenciaIdentifier } from '../jurisprudencia.model';

export type EntityResponseType = HttpResponse<IJurisprudencia>;
export type EntityArrayResponseType = HttpResponse<IJurisprudencia[]>;

@Injectable({ providedIn: 'root' })
export class JurisprudenciaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/jurisprudencias');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(jurisprudencia: IJurisprudencia): Observable<EntityResponseType> {
    return this.http.post<IJurisprudencia>(this.resourceUrl, jurisprudencia, { observe: 'response' });
  }

  update(jurisprudencia: IJurisprudencia): Observable<EntityResponseType> {
    return this.http.put<IJurisprudencia>(`${this.resourceUrl}/${getJurisprudenciaIdentifier(jurisprudencia) as number}`, jurisprudencia, {
      observe: 'response',
    });
  }

  partialUpdate(jurisprudencia: IJurisprudencia): Observable<EntityResponseType> {
    return this.http.patch<IJurisprudencia>(
      `${this.resourceUrl}/${getJurisprudenciaIdentifier(jurisprudencia) as number}`,
      jurisprudencia,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IJurisprudencia>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJurisprudencia[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addJurisprudenciaToCollectionIfMissing(
    jurisprudenciaCollection: IJurisprudencia[],
    ...jurisprudenciasToCheck: (IJurisprudencia | null | undefined)[]
  ): IJurisprudencia[] {
    const jurisprudencias: IJurisprudencia[] = jurisprudenciasToCheck.filter(isPresent);
    if (jurisprudencias.length > 0) {
      const jurisprudenciaCollectionIdentifiers = jurisprudenciaCollection.map(
        jurisprudenciaItem => getJurisprudenciaIdentifier(jurisprudenciaItem)!
      );
      const jurisprudenciasToAdd = jurisprudencias.filter(jurisprudenciaItem => {
        const jurisprudenciaIdentifier = getJurisprudenciaIdentifier(jurisprudenciaItem);
        if (jurisprudenciaIdentifier == null || jurisprudenciaCollectionIdentifiers.includes(jurisprudenciaIdentifier)) {
          return false;
        }
        jurisprudenciaCollectionIdentifiers.push(jurisprudenciaIdentifier);
        return true;
      });
      return [...jurisprudenciasToAdd, ...jurisprudenciaCollection];
    }
    return jurisprudenciaCollection;
  }
}
