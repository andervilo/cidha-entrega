import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProblemaJuridico, getProblemaJuridicoIdentifier } from '../problema-juridico.model';

export type EntityResponseType = HttpResponse<IProblemaJuridico>;
export type EntityArrayResponseType = HttpResponse<IProblemaJuridico[]>;

@Injectable({ providedIn: 'root' })
export class ProblemaJuridicoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/problema-juridicos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(problemaJuridico: IProblemaJuridico): Observable<EntityResponseType> {
    return this.http.post<IProblemaJuridico>(this.resourceUrl, problemaJuridico, { observe: 'response' });
  }

  update(problemaJuridico: IProblemaJuridico): Observable<EntityResponseType> {
    return this.http.put<IProblemaJuridico>(
      `${this.resourceUrl}/${getProblemaJuridicoIdentifier(problemaJuridico) as number}`,
      problemaJuridico,
      { observe: 'response' }
    );
  }

  partialUpdate(problemaJuridico: IProblemaJuridico): Observable<EntityResponseType> {
    return this.http.patch<IProblemaJuridico>(
      `${this.resourceUrl}/${getProblemaJuridicoIdentifier(problemaJuridico) as number}`,
      problemaJuridico,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProblemaJuridico>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProblemaJuridico[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProblemaJuridicoToCollectionIfMissing(
    problemaJuridicoCollection: IProblemaJuridico[],
    ...problemaJuridicosToCheck: (IProblemaJuridico | null | undefined)[]
  ): IProblemaJuridico[] {
    const problemaJuridicos: IProblemaJuridico[] = problemaJuridicosToCheck.filter(isPresent);
    if (problemaJuridicos.length > 0) {
      const problemaJuridicoCollectionIdentifiers = problemaJuridicoCollection.map(
        problemaJuridicoItem => getProblemaJuridicoIdentifier(problemaJuridicoItem)!
      );
      const problemaJuridicosToAdd = problemaJuridicos.filter(problemaJuridicoItem => {
        const problemaJuridicoIdentifier = getProblemaJuridicoIdentifier(problemaJuridicoItem);
        if (problemaJuridicoIdentifier == null || problemaJuridicoCollectionIdentifiers.includes(problemaJuridicoIdentifier)) {
          return false;
        }
        problemaJuridicoCollectionIdentifiers.push(problemaJuridicoIdentifier);
        return true;
      });
      return [...problemaJuridicosToAdd, ...problemaJuridicoCollection];
    }
    return problemaJuridicoCollection;
  }
}
