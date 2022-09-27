import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQuilombo, getQuilomboIdentifier } from '../quilombo.model';

export type EntityResponseType = HttpResponse<IQuilombo>;
export type EntityArrayResponseType = HttpResponse<IQuilombo[]>;

@Injectable({ providedIn: 'root' })
export class QuilomboService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/quilombos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(quilombo: IQuilombo): Observable<EntityResponseType> {
    return this.http.post<IQuilombo>(this.resourceUrl, quilombo, { observe: 'response' });
  }

  update(quilombo: IQuilombo): Observable<EntityResponseType> {
    return this.http.put<IQuilombo>(`${this.resourceUrl}/${getQuilomboIdentifier(quilombo) as number}`, quilombo, { observe: 'response' });
  }

  partialUpdate(quilombo: IQuilombo): Observable<EntityResponseType> {
    return this.http.patch<IQuilombo>(`${this.resourceUrl}/${getQuilomboIdentifier(quilombo) as number}`, quilombo, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuilombo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuilombo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addQuilomboToCollectionIfMissing(quilomboCollection: IQuilombo[], ...quilombosToCheck: (IQuilombo | null | undefined)[]): IQuilombo[] {
    const quilombos: IQuilombo[] = quilombosToCheck.filter(isPresent);
    if (quilombos.length > 0) {
      const quilomboCollectionIdentifiers = quilomboCollection.map(quilomboItem => getQuilomboIdentifier(quilomboItem)!);
      const quilombosToAdd = quilombos.filter(quilomboItem => {
        const quilomboIdentifier = getQuilomboIdentifier(quilomboItem);
        if (quilomboIdentifier == null || quilomboCollectionIdentifiers.includes(quilomboIdentifier)) {
          return false;
        }
        quilomboCollectionIdentifiers.push(quilomboIdentifier);
        return true;
      });
      return [...quilombosToAdd, ...quilomboCollection];
    }
    return quilomboCollection;
  }
}
