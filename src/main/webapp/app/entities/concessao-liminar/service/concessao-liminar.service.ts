import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConcessaoLiminar, getConcessaoLiminarIdentifier } from '../concessao-liminar.model';

export type EntityResponseType = HttpResponse<IConcessaoLiminar>;
export type EntityArrayResponseType = HttpResponse<IConcessaoLiminar[]>;

@Injectable({ providedIn: 'root' })
export class ConcessaoLiminarService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/concessao-liminars');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(concessaoLiminar: IConcessaoLiminar): Observable<EntityResponseType> {
    return this.http.post<IConcessaoLiminar>(this.resourceUrl, concessaoLiminar, { observe: 'response' });
  }

  update(concessaoLiminar: IConcessaoLiminar): Observable<EntityResponseType> {
    return this.http.put<IConcessaoLiminar>(
      `${this.resourceUrl}/${getConcessaoLiminarIdentifier(concessaoLiminar) as number}`,
      concessaoLiminar,
      { observe: 'response' }
    );
  }

  partialUpdate(concessaoLiminar: IConcessaoLiminar): Observable<EntityResponseType> {
    return this.http.patch<IConcessaoLiminar>(
      `${this.resourceUrl}/${getConcessaoLiminarIdentifier(concessaoLiminar) as number}`,
      concessaoLiminar,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConcessaoLiminar>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConcessaoLiminar[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addConcessaoLiminarToCollectionIfMissing(
    concessaoLiminarCollection: IConcessaoLiminar[],
    ...concessaoLiminarsToCheck: (IConcessaoLiminar | null | undefined)[]
  ): IConcessaoLiminar[] {
    const concessaoLiminars: IConcessaoLiminar[] = concessaoLiminarsToCheck.filter(isPresent);
    if (concessaoLiminars.length > 0) {
      const concessaoLiminarCollectionIdentifiers = concessaoLiminarCollection.map(
        concessaoLiminarItem => getConcessaoLiminarIdentifier(concessaoLiminarItem)!
      );
      const concessaoLiminarsToAdd = concessaoLiminars.filter(concessaoLiminarItem => {
        const concessaoLiminarIdentifier = getConcessaoLiminarIdentifier(concessaoLiminarItem);
        if (concessaoLiminarIdentifier == null || concessaoLiminarCollectionIdentifiers.includes(concessaoLiminarIdentifier)) {
          return false;
        }
        concessaoLiminarCollectionIdentifiers.push(concessaoLiminarIdentifier);
        return true;
      });
      return [...concessaoLiminarsToAdd, ...concessaoLiminarCollection];
    }
    return concessaoLiminarCollection;
  }
}
