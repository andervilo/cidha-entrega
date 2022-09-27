import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProcessoConflito, getProcessoConflitoIdentifier } from '../processo-conflito.model';

export type EntityResponseType = HttpResponse<IProcessoConflito>;
export type EntityArrayResponseType = HttpResponse<IProcessoConflito[]>;

@Injectable({ providedIn: 'root' })
export class ProcessoConflitoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/processo-conflitos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(processoConflito: IProcessoConflito): Observable<EntityResponseType> {
    return this.http.post<IProcessoConflito>(this.resourceUrl, processoConflito, { observe: 'response' });
  }

  update(processoConflito: IProcessoConflito): Observable<EntityResponseType> {
    return this.http.put<IProcessoConflito>(
      `${this.resourceUrl}/${getProcessoConflitoIdentifier(processoConflito) as number}`,
      processoConflito,
      { observe: 'response' }
    );
  }

  partialUpdate(processoConflito: IProcessoConflito): Observable<EntityResponseType> {
    return this.http.patch<IProcessoConflito>(
      `${this.resourceUrl}/${getProcessoConflitoIdentifier(processoConflito) as number}`,
      processoConflito,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProcessoConflito>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProcessoConflito[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProcessoConflitoToCollectionIfMissing(
    processoConflitoCollection: IProcessoConflito[],
    ...processoConflitosToCheck: (IProcessoConflito | null | undefined)[]
  ): IProcessoConflito[] {
    const processoConflitos: IProcessoConflito[] = processoConflitosToCheck.filter(isPresent);
    if (processoConflitos.length > 0) {
      const processoConflitoCollectionIdentifiers = processoConflitoCollection.map(
        processoConflitoItem => getProcessoConflitoIdentifier(processoConflitoItem)!
      );
      const processoConflitosToAdd = processoConflitos.filter(processoConflitoItem => {
        const processoConflitoIdentifier = getProcessoConflitoIdentifier(processoConflitoItem);
        if (processoConflitoIdentifier == null || processoConflitoCollectionIdentifiers.includes(processoConflitoIdentifier)) {
          return false;
        }
        processoConflitoCollectionIdentifiers.push(processoConflitoIdentifier);
        return true;
      });
      return [...processoConflitosToAdd, ...processoConflitoCollection];
    }
    return processoConflitoCollection;
  }
}
