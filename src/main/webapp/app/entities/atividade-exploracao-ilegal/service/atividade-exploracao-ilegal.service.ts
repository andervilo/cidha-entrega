import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAtividadeExploracaoIlegal, getAtividadeExploracaoIlegalIdentifier } from '../atividade-exploracao-ilegal.model';

export type EntityResponseType = HttpResponse<IAtividadeExploracaoIlegal>;
export type EntityArrayResponseType = HttpResponse<IAtividadeExploracaoIlegal[]>;

@Injectable({ providedIn: 'root' })
export class AtividadeExploracaoIlegalService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/atividade-exploracao-ilegals');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(atividadeExploracaoIlegal: IAtividadeExploracaoIlegal): Observable<EntityResponseType> {
    return this.http.post<IAtividadeExploracaoIlegal>(this.resourceUrl, atividadeExploracaoIlegal, { observe: 'response' });
  }

  update(atividadeExploracaoIlegal: IAtividadeExploracaoIlegal): Observable<EntityResponseType> {
    return this.http.put<IAtividadeExploracaoIlegal>(
      `${this.resourceUrl}/${getAtividadeExploracaoIlegalIdentifier(atividadeExploracaoIlegal) as number}`,
      atividadeExploracaoIlegal,
      { observe: 'response' }
    );
  }

  partialUpdate(atividadeExploracaoIlegal: IAtividadeExploracaoIlegal): Observable<EntityResponseType> {
    return this.http.patch<IAtividadeExploracaoIlegal>(
      `${this.resourceUrl}/${getAtividadeExploracaoIlegalIdentifier(atividadeExploracaoIlegal) as number}`,
      atividadeExploracaoIlegal,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAtividadeExploracaoIlegal>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAtividadeExploracaoIlegal[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAtividadeExploracaoIlegalToCollectionIfMissing(
    atividadeExploracaoIlegalCollection: IAtividadeExploracaoIlegal[],
    ...atividadeExploracaoIlegalsToCheck: (IAtividadeExploracaoIlegal | null | undefined)[]
  ): IAtividadeExploracaoIlegal[] {
    const atividadeExploracaoIlegals: IAtividadeExploracaoIlegal[] = atividadeExploracaoIlegalsToCheck.filter(isPresent);
    if (atividadeExploracaoIlegals.length > 0) {
      const atividadeExploracaoIlegalCollectionIdentifiers = atividadeExploracaoIlegalCollection.map(
        atividadeExploracaoIlegalItem => getAtividadeExploracaoIlegalIdentifier(atividadeExploracaoIlegalItem)!
      );
      const atividadeExploracaoIlegalsToAdd = atividadeExploracaoIlegals.filter(atividadeExploracaoIlegalItem => {
        const atividadeExploracaoIlegalIdentifier = getAtividadeExploracaoIlegalIdentifier(atividadeExploracaoIlegalItem);
        if (
          atividadeExploracaoIlegalIdentifier == null ||
          atividadeExploracaoIlegalCollectionIdentifiers.includes(atividadeExploracaoIlegalIdentifier)
        ) {
          return false;
        }
        atividadeExploracaoIlegalCollectionIdentifiers.push(atividadeExploracaoIlegalIdentifier);
        return true;
      });
      return [...atividadeExploracaoIlegalsToAdd, ...atividadeExploracaoIlegalCollection];
    }
    return atividadeExploracaoIlegalCollection;
  }
}
