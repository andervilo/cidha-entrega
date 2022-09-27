import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFundamentacaoDoutrinaria, getFundamentacaoDoutrinariaIdentifier } from '../fundamentacao-doutrinaria.model';

export type EntityResponseType = HttpResponse<IFundamentacaoDoutrinaria>;
export type EntityArrayResponseType = HttpResponse<IFundamentacaoDoutrinaria[]>;

@Injectable({ providedIn: 'root' })
export class FundamentacaoDoutrinariaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fundamentacao-doutrinarias');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fundamentacaoDoutrinaria: IFundamentacaoDoutrinaria): Observable<EntityResponseType> {
    return this.http.post<IFundamentacaoDoutrinaria>(this.resourceUrl, fundamentacaoDoutrinaria, { observe: 'response' });
  }

  update(fundamentacaoDoutrinaria: IFundamentacaoDoutrinaria): Observable<EntityResponseType> {
    return this.http.put<IFundamentacaoDoutrinaria>(
      `${this.resourceUrl}/${getFundamentacaoDoutrinariaIdentifier(fundamentacaoDoutrinaria) as number}`,
      fundamentacaoDoutrinaria,
      { observe: 'response' }
    );
  }

  partialUpdate(fundamentacaoDoutrinaria: IFundamentacaoDoutrinaria): Observable<EntityResponseType> {
    return this.http.patch<IFundamentacaoDoutrinaria>(
      `${this.resourceUrl}/${getFundamentacaoDoutrinariaIdentifier(fundamentacaoDoutrinaria) as number}`,
      fundamentacaoDoutrinaria,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFundamentacaoDoutrinaria>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFundamentacaoDoutrinaria[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addFundamentacaoDoutrinariaToCollectionIfMissing(
    fundamentacaoDoutrinariaCollection: IFundamentacaoDoutrinaria[],
    ...fundamentacaoDoutrinariasToCheck: (IFundamentacaoDoutrinaria | null | undefined)[]
  ): IFundamentacaoDoutrinaria[] {
    const fundamentacaoDoutrinarias: IFundamentacaoDoutrinaria[] = fundamentacaoDoutrinariasToCheck.filter(isPresent);
    if (fundamentacaoDoutrinarias.length > 0) {
      const fundamentacaoDoutrinariaCollectionIdentifiers = fundamentacaoDoutrinariaCollection.map(
        fundamentacaoDoutrinariaItem => getFundamentacaoDoutrinariaIdentifier(fundamentacaoDoutrinariaItem)!
      );
      const fundamentacaoDoutrinariasToAdd = fundamentacaoDoutrinarias.filter(fundamentacaoDoutrinariaItem => {
        const fundamentacaoDoutrinariaIdentifier = getFundamentacaoDoutrinariaIdentifier(fundamentacaoDoutrinariaItem);
        if (
          fundamentacaoDoutrinariaIdentifier == null ||
          fundamentacaoDoutrinariaCollectionIdentifiers.includes(fundamentacaoDoutrinariaIdentifier)
        ) {
          return false;
        }
        fundamentacaoDoutrinariaCollectionIdentifiers.push(fundamentacaoDoutrinariaIdentifier);
        return true;
      });
      return [...fundamentacaoDoutrinariasToAdd, ...fundamentacaoDoutrinariaCollection];
    }
    return fundamentacaoDoutrinariaCollection;
  }
}
