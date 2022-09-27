import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmbargoDeclaracao, getEmbargoDeclaracaoIdentifier } from '../embargo-declaracao.model';

export type EntityResponseType = HttpResponse<IEmbargoDeclaracao>;
export type EntityArrayResponseType = HttpResponse<IEmbargoDeclaracao[]>;

@Injectable({ providedIn: 'root' })
export class EmbargoDeclaracaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/embargo-declaracaos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(embargoDeclaracao: IEmbargoDeclaracao): Observable<EntityResponseType> {
    return this.http.post<IEmbargoDeclaracao>(this.resourceUrl, embargoDeclaracao, { observe: 'response' });
  }

  update(embargoDeclaracao: IEmbargoDeclaracao): Observable<EntityResponseType> {
    return this.http.put<IEmbargoDeclaracao>(
      `${this.resourceUrl}/${getEmbargoDeclaracaoIdentifier(embargoDeclaracao) as number}`,
      embargoDeclaracao,
      { observe: 'response' }
    );
  }

  partialUpdate(embargoDeclaracao: IEmbargoDeclaracao): Observable<EntityResponseType> {
    return this.http.patch<IEmbargoDeclaracao>(
      `${this.resourceUrl}/${getEmbargoDeclaracaoIdentifier(embargoDeclaracao) as number}`,
      embargoDeclaracao,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEmbargoDeclaracao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmbargoDeclaracao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEmbargoDeclaracaoToCollectionIfMissing(
    embargoDeclaracaoCollection: IEmbargoDeclaracao[],
    ...embargoDeclaracaosToCheck: (IEmbargoDeclaracao | null | undefined)[]
  ): IEmbargoDeclaracao[] {
    const embargoDeclaracaos: IEmbargoDeclaracao[] = embargoDeclaracaosToCheck.filter(isPresent);
    if (embargoDeclaracaos.length > 0) {
      const embargoDeclaracaoCollectionIdentifiers = embargoDeclaracaoCollection.map(
        embargoDeclaracaoItem => getEmbargoDeclaracaoIdentifier(embargoDeclaracaoItem)!
      );
      const embargoDeclaracaosToAdd = embargoDeclaracaos.filter(embargoDeclaracaoItem => {
        const embargoDeclaracaoIdentifier = getEmbargoDeclaracaoIdentifier(embargoDeclaracaoItem);
        if (embargoDeclaracaoIdentifier == null || embargoDeclaracaoCollectionIdentifiers.includes(embargoDeclaracaoIdentifier)) {
          return false;
        }
        embargoDeclaracaoCollectionIdentifiers.push(embargoDeclaracaoIdentifier);
        return true;
      });
      return [...embargoDeclaracaosToAdd, ...embargoDeclaracaoCollection];
    }
    return embargoDeclaracaoCollection;
  }
}
