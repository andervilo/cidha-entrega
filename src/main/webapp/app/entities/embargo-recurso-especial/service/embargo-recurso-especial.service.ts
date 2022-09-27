import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmbargoRecursoEspecial, getEmbargoRecursoEspecialIdentifier } from '../embargo-recurso-especial.model';

export type EntityResponseType = HttpResponse<IEmbargoRecursoEspecial>;
export type EntityArrayResponseType = HttpResponse<IEmbargoRecursoEspecial[]>;

@Injectable({ providedIn: 'root' })
export class EmbargoRecursoEspecialService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/embargo-recurso-especials');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(embargoRecursoEspecial: IEmbargoRecursoEspecial): Observable<EntityResponseType> {
    return this.http.post<IEmbargoRecursoEspecial>(this.resourceUrl, embargoRecursoEspecial, { observe: 'response' });
  }

  update(embargoRecursoEspecial: IEmbargoRecursoEspecial): Observable<EntityResponseType> {
    return this.http.put<IEmbargoRecursoEspecial>(
      `${this.resourceUrl}/${getEmbargoRecursoEspecialIdentifier(embargoRecursoEspecial) as number}`,
      embargoRecursoEspecial,
      { observe: 'response' }
    );
  }

  partialUpdate(embargoRecursoEspecial: IEmbargoRecursoEspecial): Observable<EntityResponseType> {
    return this.http.patch<IEmbargoRecursoEspecial>(
      `${this.resourceUrl}/${getEmbargoRecursoEspecialIdentifier(embargoRecursoEspecial) as number}`,
      embargoRecursoEspecial,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEmbargoRecursoEspecial>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmbargoRecursoEspecial[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEmbargoRecursoEspecialToCollectionIfMissing(
    embargoRecursoEspecialCollection: IEmbargoRecursoEspecial[],
    ...embargoRecursoEspecialsToCheck: (IEmbargoRecursoEspecial | null | undefined)[]
  ): IEmbargoRecursoEspecial[] {
    const embargoRecursoEspecials: IEmbargoRecursoEspecial[] = embargoRecursoEspecialsToCheck.filter(isPresent);
    if (embargoRecursoEspecials.length > 0) {
      const embargoRecursoEspecialCollectionIdentifiers = embargoRecursoEspecialCollection.map(
        embargoRecursoEspecialItem => getEmbargoRecursoEspecialIdentifier(embargoRecursoEspecialItem)!
      );
      const embargoRecursoEspecialsToAdd = embargoRecursoEspecials.filter(embargoRecursoEspecialItem => {
        const embargoRecursoEspecialIdentifier = getEmbargoRecursoEspecialIdentifier(embargoRecursoEspecialItem);
        if (
          embargoRecursoEspecialIdentifier == null ||
          embargoRecursoEspecialCollectionIdentifiers.includes(embargoRecursoEspecialIdentifier)
        ) {
          return false;
        }
        embargoRecursoEspecialCollectionIdentifiers.push(embargoRecursoEspecialIdentifier);
        return true;
      });
      return [...embargoRecursoEspecialsToAdd, ...embargoRecursoEspecialCollection];
    }
    return embargoRecursoEspecialCollection;
  }
}
