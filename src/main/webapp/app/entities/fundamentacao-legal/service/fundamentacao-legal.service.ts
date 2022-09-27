import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFundamentacaoLegal, getFundamentacaoLegalIdentifier } from '../fundamentacao-legal.model';

export type EntityResponseType = HttpResponse<IFundamentacaoLegal>;
export type EntityArrayResponseType = HttpResponse<IFundamentacaoLegal[]>;

@Injectable({ providedIn: 'root' })
export class FundamentacaoLegalService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fundamentacao-legals');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fundamentacaoLegal: IFundamentacaoLegal): Observable<EntityResponseType> {
    return this.http.post<IFundamentacaoLegal>(this.resourceUrl, fundamentacaoLegal, { observe: 'response' });
  }

  update(fundamentacaoLegal: IFundamentacaoLegal): Observable<EntityResponseType> {
    return this.http.put<IFundamentacaoLegal>(
      `${this.resourceUrl}/${getFundamentacaoLegalIdentifier(fundamentacaoLegal) as number}`,
      fundamentacaoLegal,
      { observe: 'response' }
    );
  }

  partialUpdate(fundamentacaoLegal: IFundamentacaoLegal): Observable<EntityResponseType> {
    return this.http.patch<IFundamentacaoLegal>(
      `${this.resourceUrl}/${getFundamentacaoLegalIdentifier(fundamentacaoLegal) as number}`,
      fundamentacaoLegal,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFundamentacaoLegal>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFundamentacaoLegal[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addFundamentacaoLegalToCollectionIfMissing(
    fundamentacaoLegalCollection: IFundamentacaoLegal[],
    ...fundamentacaoLegalsToCheck: (IFundamentacaoLegal | null | undefined)[]
  ): IFundamentacaoLegal[] {
    const fundamentacaoLegals: IFundamentacaoLegal[] = fundamentacaoLegalsToCheck.filter(isPresent);
    if (fundamentacaoLegals.length > 0) {
      const fundamentacaoLegalCollectionIdentifiers = fundamentacaoLegalCollection.map(
        fundamentacaoLegalItem => getFundamentacaoLegalIdentifier(fundamentacaoLegalItem)!
      );
      const fundamentacaoLegalsToAdd = fundamentacaoLegals.filter(fundamentacaoLegalItem => {
        const fundamentacaoLegalIdentifier = getFundamentacaoLegalIdentifier(fundamentacaoLegalItem);
        if (fundamentacaoLegalIdentifier == null || fundamentacaoLegalCollectionIdentifiers.includes(fundamentacaoLegalIdentifier)) {
          return false;
        }
        fundamentacaoLegalCollectionIdentifiers.push(fundamentacaoLegalIdentifier);
        return true;
      });
      return [...fundamentacaoLegalsToAdd, ...fundamentacaoLegalCollection];
    }
    return fundamentacaoLegalCollection;
  }
}
