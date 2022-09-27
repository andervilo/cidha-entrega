import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmbargoRespRe, getEmbargoRespReIdentifier } from '../embargo-resp-re.model';

export type EntityResponseType = HttpResponse<IEmbargoRespRe>;
export type EntityArrayResponseType = HttpResponse<IEmbargoRespRe[]>;

@Injectable({ providedIn: 'root' })
export class EmbargoRespReService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/embargo-resp-res');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(embargoRespRe: IEmbargoRespRe): Observable<EntityResponseType> {
    return this.http.post<IEmbargoRespRe>(this.resourceUrl, embargoRespRe, { observe: 'response' });
  }

  update(embargoRespRe: IEmbargoRespRe): Observable<EntityResponseType> {
    return this.http.put<IEmbargoRespRe>(`${this.resourceUrl}/${getEmbargoRespReIdentifier(embargoRespRe) as number}`, embargoRespRe, {
      observe: 'response',
    });
  }

  partialUpdate(embargoRespRe: IEmbargoRespRe): Observable<EntityResponseType> {
    return this.http.patch<IEmbargoRespRe>(`${this.resourceUrl}/${getEmbargoRespReIdentifier(embargoRespRe) as number}`, embargoRespRe, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEmbargoRespRe>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmbargoRespRe[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEmbargoRespReToCollectionIfMissing(
    embargoRespReCollection: IEmbargoRespRe[],
    ...embargoRespResToCheck: (IEmbargoRespRe | null | undefined)[]
  ): IEmbargoRespRe[] {
    const embargoRespRes: IEmbargoRespRe[] = embargoRespResToCheck.filter(isPresent);
    if (embargoRespRes.length > 0) {
      const embargoRespReCollectionIdentifiers = embargoRespReCollection.map(
        embargoRespReItem => getEmbargoRespReIdentifier(embargoRespReItem)!
      );
      const embargoRespResToAdd = embargoRespRes.filter(embargoRespReItem => {
        const embargoRespReIdentifier = getEmbargoRespReIdentifier(embargoRespReItem);
        if (embargoRespReIdentifier == null || embargoRespReCollectionIdentifiers.includes(embargoRespReIdentifier)) {
          return false;
        }
        embargoRespReCollectionIdentifiers.push(embargoRespReIdentifier);
        return true;
      });
      return [...embargoRespResToAdd, ...embargoRespReCollection];
    }
    return embargoRespReCollection;
  }
}
