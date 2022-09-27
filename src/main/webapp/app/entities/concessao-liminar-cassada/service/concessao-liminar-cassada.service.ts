import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConcessaoLiminarCassada, getConcessaoLiminarCassadaIdentifier } from '../concessao-liminar-cassada.model';

export type EntityResponseType = HttpResponse<IConcessaoLiminarCassada>;
export type EntityArrayResponseType = HttpResponse<IConcessaoLiminarCassada[]>;

@Injectable({ providedIn: 'root' })
export class ConcessaoLiminarCassadaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/concessao-liminar-cassadas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(concessaoLiminarCassada: IConcessaoLiminarCassada): Observable<EntityResponseType> {
    return this.http.post<IConcessaoLiminarCassada>(this.resourceUrl, concessaoLiminarCassada, { observe: 'response' });
  }

  update(concessaoLiminarCassada: IConcessaoLiminarCassada): Observable<EntityResponseType> {
    return this.http.put<IConcessaoLiminarCassada>(
      `${this.resourceUrl}/${getConcessaoLiminarCassadaIdentifier(concessaoLiminarCassada) as number}`,
      concessaoLiminarCassada,
      { observe: 'response' }
    );
  }

  partialUpdate(concessaoLiminarCassada: IConcessaoLiminarCassada): Observable<EntityResponseType> {
    return this.http.patch<IConcessaoLiminarCassada>(
      `${this.resourceUrl}/${getConcessaoLiminarCassadaIdentifier(concessaoLiminarCassada) as number}`,
      concessaoLiminarCassada,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConcessaoLiminarCassada>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConcessaoLiminarCassada[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addConcessaoLiminarCassadaToCollectionIfMissing(
    concessaoLiminarCassadaCollection: IConcessaoLiminarCassada[],
    ...concessaoLiminarCassadasToCheck: (IConcessaoLiminarCassada | null | undefined)[]
  ): IConcessaoLiminarCassada[] {
    const concessaoLiminarCassadas: IConcessaoLiminarCassada[] = concessaoLiminarCassadasToCheck.filter(isPresent);
    if (concessaoLiminarCassadas.length > 0) {
      const concessaoLiminarCassadaCollectionIdentifiers = concessaoLiminarCassadaCollection.map(
        concessaoLiminarCassadaItem => getConcessaoLiminarCassadaIdentifier(concessaoLiminarCassadaItem)!
      );
      const concessaoLiminarCassadasToAdd = concessaoLiminarCassadas.filter(concessaoLiminarCassadaItem => {
        const concessaoLiminarCassadaIdentifier = getConcessaoLiminarCassadaIdentifier(concessaoLiminarCassadaItem);
        if (
          concessaoLiminarCassadaIdentifier == null ||
          concessaoLiminarCassadaCollectionIdentifiers.includes(concessaoLiminarCassadaIdentifier)
        ) {
          return false;
        }
        concessaoLiminarCassadaCollectionIdentifiers.push(concessaoLiminarCassadaIdentifier);
        return true;
      });
      return [...concessaoLiminarCassadasToAdd, ...concessaoLiminarCassadaCollection];
    }
    return concessaoLiminarCassadaCollection;
  }
}
