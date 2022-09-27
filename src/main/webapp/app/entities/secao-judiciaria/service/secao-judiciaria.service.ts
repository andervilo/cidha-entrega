import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISecaoJudiciaria, getSecaoJudiciariaIdentifier } from '../secao-judiciaria.model';

export type EntityResponseType = HttpResponse<ISecaoJudiciaria>;
export type EntityArrayResponseType = HttpResponse<ISecaoJudiciaria[]>;

@Injectable({ providedIn: 'root' })
export class SecaoJudiciariaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/secao-judiciarias');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(secaoJudiciaria: ISecaoJudiciaria): Observable<EntityResponseType> {
    return this.http.post<ISecaoJudiciaria>(this.resourceUrl, secaoJudiciaria, { observe: 'response' });
  }

  update(secaoJudiciaria: ISecaoJudiciaria): Observable<EntityResponseType> {
    return this.http.put<ISecaoJudiciaria>(
      `${this.resourceUrl}/${getSecaoJudiciariaIdentifier(secaoJudiciaria) as number}`,
      secaoJudiciaria,
      { observe: 'response' }
    );
  }

  partialUpdate(secaoJudiciaria: ISecaoJudiciaria): Observable<EntityResponseType> {
    return this.http.patch<ISecaoJudiciaria>(
      `${this.resourceUrl}/${getSecaoJudiciariaIdentifier(secaoJudiciaria) as number}`,
      secaoJudiciaria,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISecaoJudiciaria>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISecaoJudiciaria[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSecaoJudiciariaToCollectionIfMissing(
    secaoJudiciariaCollection: ISecaoJudiciaria[],
    ...secaoJudiciariasToCheck: (ISecaoJudiciaria | null | undefined)[]
  ): ISecaoJudiciaria[] {
    const secaoJudiciarias: ISecaoJudiciaria[] = secaoJudiciariasToCheck.filter(isPresent);
    if (secaoJudiciarias.length > 0) {
      const secaoJudiciariaCollectionIdentifiers = secaoJudiciariaCollection.map(
        secaoJudiciariaItem => getSecaoJudiciariaIdentifier(secaoJudiciariaItem)!
      );
      const secaoJudiciariasToAdd = secaoJudiciarias.filter(secaoJudiciariaItem => {
        const secaoJudiciariaIdentifier = getSecaoJudiciariaIdentifier(secaoJudiciariaItem);
        if (secaoJudiciariaIdentifier == null || secaoJudiciariaCollectionIdentifiers.includes(secaoJudiciariaIdentifier)) {
          return false;
        }
        secaoJudiciariaCollectionIdentifiers.push(secaoJudiciariaIdentifier);
        return true;
      });
      return [...secaoJudiciariasToAdd, ...secaoJudiciariaCollection];
    }
    return secaoJudiciariaCollection;
  }
}
