import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEnvolvidosConflitoLitigio, getEnvolvidosConflitoLitigioIdentifier } from '../envolvidos-conflito-litigio.model';

export type EntityResponseType = HttpResponse<IEnvolvidosConflitoLitigio>;
export type EntityArrayResponseType = HttpResponse<IEnvolvidosConflitoLitigio[]>;

@Injectable({ providedIn: 'root' })
export class EnvolvidosConflitoLitigioService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/envolvidos-conflito-litigios');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(envolvidosConflitoLitigio: IEnvolvidosConflitoLitigio): Observable<EntityResponseType> {
    return this.http.post<IEnvolvidosConflitoLitigio>(this.resourceUrl, envolvidosConflitoLitigio, { observe: 'response' });
  }

  update(envolvidosConflitoLitigio: IEnvolvidosConflitoLitigio): Observable<EntityResponseType> {
    return this.http.put<IEnvolvidosConflitoLitigio>(
      `${this.resourceUrl}/${getEnvolvidosConflitoLitigioIdentifier(envolvidosConflitoLitigio) as number}`,
      envolvidosConflitoLitigio,
      { observe: 'response' }
    );
  }

  partialUpdate(envolvidosConflitoLitigio: IEnvolvidosConflitoLitigio): Observable<EntityResponseType> {
    return this.http.patch<IEnvolvidosConflitoLitigio>(
      `${this.resourceUrl}/${getEnvolvidosConflitoLitigioIdentifier(envolvidosConflitoLitigio) as number}`,
      envolvidosConflitoLitigio,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEnvolvidosConflitoLitigio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEnvolvidosConflitoLitigio[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEnvolvidosConflitoLitigioToCollectionIfMissing(
    envolvidosConflitoLitigioCollection: IEnvolvidosConflitoLitigio[],
    ...envolvidosConflitoLitigiosToCheck: (IEnvolvidosConflitoLitigio | null | undefined)[]
  ): IEnvolvidosConflitoLitigio[] {
    const envolvidosConflitoLitigios: IEnvolvidosConflitoLitigio[] = envolvidosConflitoLitigiosToCheck.filter(isPresent);
    if (envolvidosConflitoLitigios.length > 0) {
      const envolvidosConflitoLitigioCollectionIdentifiers = envolvidosConflitoLitigioCollection.map(
        envolvidosConflitoLitigioItem => getEnvolvidosConflitoLitigioIdentifier(envolvidosConflitoLitigioItem)!
      );
      const envolvidosConflitoLitigiosToAdd = envolvidosConflitoLitigios.filter(envolvidosConflitoLitigioItem => {
        const envolvidosConflitoLitigioIdentifier = getEnvolvidosConflitoLitigioIdentifier(envolvidosConflitoLitigioItem);
        if (
          envolvidosConflitoLitigioIdentifier == null ||
          envolvidosConflitoLitigioCollectionIdentifiers.includes(envolvidosConflitoLitigioIdentifier)
        ) {
          return false;
        }
        envolvidosConflitoLitigioCollectionIdentifiers.push(envolvidosConflitoLitigioIdentifier);
        return true;
      });
      return [...envolvidosConflitoLitigiosToAdd, ...envolvidosConflitoLitigioCollection];
    }
    return envolvidosConflitoLitigioCollection;
  }
}
