import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUnidadeConservacao, getUnidadeConservacaoIdentifier } from '../unidade-conservacao.model';

export type EntityResponseType = HttpResponse<IUnidadeConservacao>;
export type EntityArrayResponseType = HttpResponse<IUnidadeConservacao[]>;

@Injectable({ providedIn: 'root' })
export class UnidadeConservacaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/unidade-conservacaos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(unidadeConservacao: IUnidadeConservacao): Observable<EntityResponseType> {
    return this.http.post<IUnidadeConservacao>(this.resourceUrl, unidadeConservacao, { observe: 'response' });
  }

  update(unidadeConservacao: IUnidadeConservacao): Observable<EntityResponseType> {
    return this.http.put<IUnidadeConservacao>(
      `${this.resourceUrl}/${getUnidadeConservacaoIdentifier(unidadeConservacao) as number}`,
      unidadeConservacao,
      { observe: 'response' }
    );
  }

  partialUpdate(unidadeConservacao: IUnidadeConservacao): Observable<EntityResponseType> {
    return this.http.patch<IUnidadeConservacao>(
      `${this.resourceUrl}/${getUnidadeConservacaoIdentifier(unidadeConservacao) as number}`,
      unidadeConservacao,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUnidadeConservacao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUnidadeConservacao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addUnidadeConservacaoToCollectionIfMissing(
    unidadeConservacaoCollection: IUnidadeConservacao[],
    ...unidadeConservacaosToCheck: (IUnidadeConservacao | null | undefined)[]
  ): IUnidadeConservacao[] {
    const unidadeConservacaos: IUnidadeConservacao[] = unidadeConservacaosToCheck.filter(isPresent);
    if (unidadeConservacaos.length > 0) {
      const unidadeConservacaoCollectionIdentifiers = unidadeConservacaoCollection.map(
        unidadeConservacaoItem => getUnidadeConservacaoIdentifier(unidadeConservacaoItem)!
      );
      const unidadeConservacaosToAdd = unidadeConservacaos.filter(unidadeConservacaoItem => {
        const unidadeConservacaoIdentifier = getUnidadeConservacaoIdentifier(unidadeConservacaoItem);
        if (unidadeConservacaoIdentifier == null || unidadeConservacaoCollectionIdentifiers.includes(unidadeConservacaoIdentifier)) {
          return false;
        }
        unidadeConservacaoCollectionIdentifiers.push(unidadeConservacaoIdentifier);
        return true;
      });
      return [...unidadeConservacaosToAdd, ...unidadeConservacaoCollection];
    }
    return unidadeConservacaoCollection;
  }
}
