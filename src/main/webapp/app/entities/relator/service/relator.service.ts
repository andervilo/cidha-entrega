import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRelator, getRelatorIdentifier } from '../relator.model';

export type EntityResponseType = HttpResponse<IRelator>;
export type EntityArrayResponseType = HttpResponse<IRelator[]>;

@Injectable({ providedIn: 'root' })
export class RelatorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/relators');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(relator: IRelator): Observable<EntityResponseType> {
    return this.http.post<IRelator>(this.resourceUrl, relator, { observe: 'response' });
  }

  update(relator: IRelator): Observable<EntityResponseType> {
    return this.http.put<IRelator>(`${this.resourceUrl}/${getRelatorIdentifier(relator) as number}`, relator, { observe: 'response' });
  }

  partialUpdate(relator: IRelator): Observable<EntityResponseType> {
    return this.http.patch<IRelator>(`${this.resourceUrl}/${getRelatorIdentifier(relator) as number}`, relator, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRelator>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRelator[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRelatorToCollectionIfMissing(relatorCollection: IRelator[], ...relatorsToCheck: (IRelator | null | undefined)[]): IRelator[] {
    const relators: IRelator[] = relatorsToCheck.filter(isPresent);
    if (relators.length > 0) {
      const relatorCollectionIdentifiers = relatorCollection.map(relatorItem => getRelatorIdentifier(relatorItem)!);
      const relatorsToAdd = relators.filter(relatorItem => {
        const relatorIdentifier = getRelatorIdentifier(relatorItem);
        if (relatorIdentifier == null || relatorCollectionIdentifiers.includes(relatorIdentifier)) {
          return false;
        }
        relatorCollectionIdentifiers.push(relatorIdentifier);
        return true;
      });
      return [...relatorsToAdd, ...relatorCollection];
    }
    return relatorCollection;
  }
}
