import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConflito, getConflitoIdentifier } from '../conflito.model';

export type EntityResponseType = HttpResponse<IConflito>;
export type EntityArrayResponseType = HttpResponse<IConflito[]>;

@Injectable({ providedIn: 'root' })
export class ConflitoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/conflitos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(conflito: IConflito): Observable<EntityResponseType> {
    return this.http.post<IConflito>(this.resourceUrl, conflito, { observe: 'response' });
  }

  update(conflito: IConflito): Observable<EntityResponseType> {
    return this.http.put<IConflito>(`${this.resourceUrl}/${getConflitoIdentifier(conflito) as number}`, conflito, { observe: 'response' });
  }

  partialUpdate(conflito: IConflito): Observable<EntityResponseType> {
    return this.http.patch<IConflito>(`${this.resourceUrl}/${getConflitoIdentifier(conflito) as number}`, conflito, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConflito>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConflito[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addConflitoToCollectionIfMissing(conflitoCollection: IConflito[], ...conflitosToCheck: (IConflito | null | undefined)[]): IConflito[] {
    const conflitos: IConflito[] = conflitosToCheck.filter(isPresent);
    if (conflitos.length > 0) {
      const conflitoCollectionIdentifiers = conflitoCollection.map(conflitoItem => getConflitoIdentifier(conflitoItem)!);
      const conflitosToAdd = conflitos.filter(conflitoItem => {
        const conflitoIdentifier = getConflitoIdentifier(conflitoItem);
        if (conflitoIdentifier == null || conflitoCollectionIdentifiers.includes(conflitoIdentifier)) {
          return false;
        }
        conflitoCollectionIdentifiers.push(conflitoIdentifier);
        return true;
      });
      return [...conflitosToAdd, ...conflitoCollection];
    }
    return conflitoCollection;
  }
}
