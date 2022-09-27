import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmbargoDeclaracaoAgravo, getEmbargoDeclaracaoAgravoIdentifier } from '../embargo-declaracao-agravo.model';

export type EntityResponseType = HttpResponse<IEmbargoDeclaracaoAgravo>;
export type EntityArrayResponseType = HttpResponse<IEmbargoDeclaracaoAgravo[]>;

@Injectable({ providedIn: 'root' })
export class EmbargoDeclaracaoAgravoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/embargo-declaracao-agravos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(embargoDeclaracaoAgravo: IEmbargoDeclaracaoAgravo): Observable<EntityResponseType> {
    return this.http.post<IEmbargoDeclaracaoAgravo>(this.resourceUrl, embargoDeclaracaoAgravo, { observe: 'response' });
  }

  update(embargoDeclaracaoAgravo: IEmbargoDeclaracaoAgravo): Observable<EntityResponseType> {
    return this.http.put<IEmbargoDeclaracaoAgravo>(
      `${this.resourceUrl}/${getEmbargoDeclaracaoAgravoIdentifier(embargoDeclaracaoAgravo) as number}`,
      embargoDeclaracaoAgravo,
      { observe: 'response' }
    );
  }

  partialUpdate(embargoDeclaracaoAgravo: IEmbargoDeclaracaoAgravo): Observable<EntityResponseType> {
    return this.http.patch<IEmbargoDeclaracaoAgravo>(
      `${this.resourceUrl}/${getEmbargoDeclaracaoAgravoIdentifier(embargoDeclaracaoAgravo) as number}`,
      embargoDeclaracaoAgravo,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEmbargoDeclaracaoAgravo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmbargoDeclaracaoAgravo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEmbargoDeclaracaoAgravoToCollectionIfMissing(
    embargoDeclaracaoAgravoCollection: IEmbargoDeclaracaoAgravo[],
    ...embargoDeclaracaoAgravosToCheck: (IEmbargoDeclaracaoAgravo | null | undefined)[]
  ): IEmbargoDeclaracaoAgravo[] {
    const embargoDeclaracaoAgravos: IEmbargoDeclaracaoAgravo[] = embargoDeclaracaoAgravosToCheck.filter(isPresent);
    if (embargoDeclaracaoAgravos.length > 0) {
      const embargoDeclaracaoAgravoCollectionIdentifiers = embargoDeclaracaoAgravoCollection.map(
        embargoDeclaracaoAgravoItem => getEmbargoDeclaracaoAgravoIdentifier(embargoDeclaracaoAgravoItem)!
      );
      const embargoDeclaracaoAgravosToAdd = embargoDeclaracaoAgravos.filter(embargoDeclaracaoAgravoItem => {
        const embargoDeclaracaoAgravoIdentifier = getEmbargoDeclaracaoAgravoIdentifier(embargoDeclaracaoAgravoItem);
        if (
          embargoDeclaracaoAgravoIdentifier == null ||
          embargoDeclaracaoAgravoCollectionIdentifiers.includes(embargoDeclaracaoAgravoIdentifier)
        ) {
          return false;
        }
        embargoDeclaracaoAgravoCollectionIdentifiers.push(embargoDeclaracaoAgravoIdentifier);
        return true;
      });
      return [...embargoDeclaracaoAgravosToAdd, ...embargoDeclaracaoAgravoCollection];
    }
    return embargoDeclaracaoAgravoCollection;
  }
}
