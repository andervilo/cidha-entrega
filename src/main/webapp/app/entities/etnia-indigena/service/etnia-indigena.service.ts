import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEtniaIndigena, getEtniaIndigenaIdentifier } from '../etnia-indigena.model';

export type EntityResponseType = HttpResponse<IEtniaIndigena>;
export type EntityArrayResponseType = HttpResponse<IEtniaIndigena[]>;

@Injectable({ providedIn: 'root' })
export class EtniaIndigenaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/etnia-indigenas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(etniaIndigena: IEtniaIndigena): Observable<EntityResponseType> {
    return this.http.post<IEtniaIndigena>(this.resourceUrl, etniaIndigena, { observe: 'response' });
  }

  update(etniaIndigena: IEtniaIndigena): Observable<EntityResponseType> {
    return this.http.put<IEtniaIndigena>(`${this.resourceUrl}/${getEtniaIndigenaIdentifier(etniaIndigena) as number}`, etniaIndigena, {
      observe: 'response',
    });
  }

  partialUpdate(etniaIndigena: IEtniaIndigena): Observable<EntityResponseType> {
    return this.http.patch<IEtniaIndigena>(`${this.resourceUrl}/${getEtniaIndigenaIdentifier(etniaIndigena) as number}`, etniaIndigena, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEtniaIndigena>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEtniaIndigena[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEtniaIndigenaToCollectionIfMissing(
    etniaIndigenaCollection: IEtniaIndigena[],
    ...etniaIndigenasToCheck: (IEtniaIndigena | null | undefined)[]
  ): IEtniaIndigena[] {
    const etniaIndigenas: IEtniaIndigena[] = etniaIndigenasToCheck.filter(isPresent);
    if (etniaIndigenas.length > 0) {
      const etniaIndigenaCollectionIdentifiers = etniaIndigenaCollection.map(
        etniaIndigenaItem => getEtniaIndigenaIdentifier(etniaIndigenaItem)!
      );
      const etniaIndigenasToAdd = etniaIndigenas.filter(etniaIndigenaItem => {
        const etniaIndigenaIdentifier = getEtniaIndigenaIdentifier(etniaIndigenaItem);
        if (etniaIndigenaIdentifier == null || etniaIndigenaCollectionIdentifiers.includes(etniaIndigenaIdentifier)) {
          return false;
        }
        etniaIndigenaCollectionIdentifiers.push(etniaIndigenaIdentifier);
        return true;
      });
      return [...etniaIndigenasToAdd, ...etniaIndigenaCollection];
    }
    return etniaIndigenaCollection;
  }
}
