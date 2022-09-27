import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRepresentanteLegal, getRepresentanteLegalIdentifier } from '../representante-legal.model';

export type EntityResponseType = HttpResponse<IRepresentanteLegal>;
export type EntityArrayResponseType = HttpResponse<IRepresentanteLegal[]>;

@Injectable({ providedIn: 'root' })
export class RepresentanteLegalService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/representante-legals');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(representanteLegal: IRepresentanteLegal): Observable<EntityResponseType> {
    return this.http.post<IRepresentanteLegal>(this.resourceUrl, representanteLegal, { observe: 'response' });
  }

  update(representanteLegal: IRepresentanteLegal): Observable<EntityResponseType> {
    return this.http.put<IRepresentanteLegal>(
      `${this.resourceUrl}/${getRepresentanteLegalIdentifier(representanteLegal) as number}`,
      representanteLegal,
      { observe: 'response' }
    );
  }

  partialUpdate(representanteLegal: IRepresentanteLegal): Observable<EntityResponseType> {
    return this.http.patch<IRepresentanteLegal>(
      `${this.resourceUrl}/${getRepresentanteLegalIdentifier(representanteLegal) as number}`,
      representanteLegal,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRepresentanteLegal>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRepresentanteLegal[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRepresentanteLegalToCollectionIfMissing(
    representanteLegalCollection: IRepresentanteLegal[],
    ...representanteLegalsToCheck: (IRepresentanteLegal | null | undefined)[]
  ): IRepresentanteLegal[] {
    const representanteLegals: IRepresentanteLegal[] = representanteLegalsToCheck.filter(isPresent);
    if (representanteLegals.length > 0) {
      const representanteLegalCollectionIdentifiers = representanteLegalCollection.map(
        representanteLegalItem => getRepresentanteLegalIdentifier(representanteLegalItem)!
      );
      const representanteLegalsToAdd = representanteLegals.filter(representanteLegalItem => {
        const representanteLegalIdentifier = getRepresentanteLegalIdentifier(representanteLegalItem);
        if (representanteLegalIdentifier == null || representanteLegalCollectionIdentifiers.includes(representanteLegalIdentifier)) {
          return false;
        }
        representanteLegalCollectionIdentifiers.push(representanteLegalIdentifier);
        return true;
      });
      return [...representanteLegalsToAdd, ...representanteLegalCollection];
    }
    return representanteLegalCollection;
  }
}
