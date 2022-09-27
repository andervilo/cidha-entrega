import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IParteInteresssada, getParteInteresssadaIdentifier } from '../parte-interesssada.model';

export type EntityResponseType = HttpResponse<IParteInteresssada>;
export type EntityArrayResponseType = HttpResponse<IParteInteresssada[]>;

@Injectable({ providedIn: 'root' })
export class ParteInteresssadaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/parte-interesssadas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(parteInteresssada: IParteInteresssada): Observable<EntityResponseType> {
    return this.http.post<IParteInteresssada>(this.resourceUrl, parteInteresssada, { observe: 'response' });
  }

  update(parteInteresssada: IParteInteresssada): Observable<EntityResponseType> {
    return this.http.put<IParteInteresssada>(
      `${this.resourceUrl}/${getParteInteresssadaIdentifier(parteInteresssada) as number}`,
      parteInteresssada,
      { observe: 'response' }
    );
  }

  partialUpdate(parteInteresssada: IParteInteresssada): Observable<EntityResponseType> {
    return this.http.patch<IParteInteresssada>(
      `${this.resourceUrl}/${getParteInteresssadaIdentifier(parteInteresssada) as number}`,
      parteInteresssada,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParteInteresssada>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParteInteresssada[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addParteInteresssadaToCollectionIfMissing(
    parteInteresssadaCollection: IParteInteresssada[],
    ...parteInteresssadasToCheck: (IParteInteresssada | null | undefined)[]
  ): IParteInteresssada[] {
    const parteInteresssadas: IParteInteresssada[] = parteInteresssadasToCheck.filter(isPresent);
    if (parteInteresssadas.length > 0) {
      const parteInteresssadaCollectionIdentifiers = parteInteresssadaCollection.map(
        parteInteresssadaItem => getParteInteresssadaIdentifier(parteInteresssadaItem)!
      );
      const parteInteresssadasToAdd = parteInteresssadas.filter(parteInteresssadaItem => {
        const parteInteresssadaIdentifier = getParteInteresssadaIdentifier(parteInteresssadaItem);
        if (parteInteresssadaIdentifier == null || parteInteresssadaCollectionIdentifiers.includes(parteInteresssadaIdentifier)) {
          return false;
        }
        parteInteresssadaCollectionIdentifiers.push(parteInteresssadaIdentifier);
        return true;
      });
      return [...parteInteresssadasToAdd, ...parteInteresssadaCollection];
    }
    return parteInteresssadaCollection;
  }
}
