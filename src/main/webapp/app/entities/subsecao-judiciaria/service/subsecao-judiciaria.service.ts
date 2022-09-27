import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISubsecaoJudiciaria, getSubsecaoJudiciariaIdentifier } from '../subsecao-judiciaria.model';

export type EntityResponseType = HttpResponse<ISubsecaoJudiciaria>;
export type EntityArrayResponseType = HttpResponse<ISubsecaoJudiciaria[]>;

@Injectable({ providedIn: 'root' })
export class SubsecaoJudiciariaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/subsecao-judiciarias');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(subsecaoJudiciaria: ISubsecaoJudiciaria): Observable<EntityResponseType> {
    return this.http.post<ISubsecaoJudiciaria>(this.resourceUrl, subsecaoJudiciaria, { observe: 'response' });
  }

  update(subsecaoJudiciaria: ISubsecaoJudiciaria): Observable<EntityResponseType> {
    return this.http.put<ISubsecaoJudiciaria>(
      `${this.resourceUrl}/${getSubsecaoJudiciariaIdentifier(subsecaoJudiciaria) as number}`,
      subsecaoJudiciaria,
      { observe: 'response' }
    );
  }

  partialUpdate(subsecaoJudiciaria: ISubsecaoJudiciaria): Observable<EntityResponseType> {
    return this.http.patch<ISubsecaoJudiciaria>(
      `${this.resourceUrl}/${getSubsecaoJudiciariaIdentifier(subsecaoJudiciaria) as number}`,
      subsecaoJudiciaria,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubsecaoJudiciaria>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubsecaoJudiciaria[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSubsecaoJudiciariaToCollectionIfMissing(
    subsecaoJudiciariaCollection: ISubsecaoJudiciaria[],
    ...subsecaoJudiciariasToCheck: (ISubsecaoJudiciaria | null | undefined)[]
  ): ISubsecaoJudiciaria[] {
    const subsecaoJudiciarias: ISubsecaoJudiciaria[] = subsecaoJudiciariasToCheck.filter(isPresent);
    if (subsecaoJudiciarias.length > 0) {
      const subsecaoJudiciariaCollectionIdentifiers = subsecaoJudiciariaCollection.map(
        subsecaoJudiciariaItem => getSubsecaoJudiciariaIdentifier(subsecaoJudiciariaItem)!
      );
      const subsecaoJudiciariasToAdd = subsecaoJudiciarias.filter(subsecaoJudiciariaItem => {
        const subsecaoJudiciariaIdentifier = getSubsecaoJudiciariaIdentifier(subsecaoJudiciariaItem);
        if (subsecaoJudiciariaIdentifier == null || subsecaoJudiciariaCollectionIdentifiers.includes(subsecaoJudiciariaIdentifier)) {
          return false;
        }
        subsecaoJudiciariaCollectionIdentifiers.push(subsecaoJudiciariaIdentifier);
        return true;
      });
      return [...subsecaoJudiciariasToAdd, ...subsecaoJudiciariaCollection];
    }
    return subsecaoJudiciariaCollection;
  }
}
