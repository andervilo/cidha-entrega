import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoData, getTipoDataIdentifier } from '../tipo-data.model';

export type EntityResponseType = HttpResponse<ITipoData>;
export type EntityArrayResponseType = HttpResponse<ITipoData[]>;

@Injectable({ providedIn: 'root' })
export class TipoDataService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-data');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tipoData: ITipoData): Observable<EntityResponseType> {
    return this.http.post<ITipoData>(this.resourceUrl, tipoData, { observe: 'response' });
  }

  update(tipoData: ITipoData): Observable<EntityResponseType> {
    return this.http.put<ITipoData>(`${this.resourceUrl}/${getTipoDataIdentifier(tipoData) as number}`, tipoData, { observe: 'response' });
  }

  partialUpdate(tipoData: ITipoData): Observable<EntityResponseType> {
    return this.http.patch<ITipoData>(`${this.resourceUrl}/${getTipoDataIdentifier(tipoData) as number}`, tipoData, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoData[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTipoDataToCollectionIfMissing(tipoDataCollection: ITipoData[], ...tipoDataToCheck: (ITipoData | null | undefined)[]): ITipoData[] {
    const tipoData: ITipoData[] = tipoDataToCheck.filter(isPresent);
    if (tipoData.length > 0) {
      const tipoDataCollectionIdentifiers = tipoDataCollection.map(tipoDataItem => getTipoDataIdentifier(tipoDataItem)!);
      const tipoDataToAdd = tipoData.filter(tipoDataItem => {
        const tipoDataIdentifier = getTipoDataIdentifier(tipoDataItem);
        if (tipoDataIdentifier == null || tipoDataCollectionIdentifiers.includes(tipoDataIdentifier)) {
          return false;
        }
        tipoDataCollectionIdentifiers.push(tipoDataIdentifier);
        return true;
      });
      return [...tipoDataToAdd, ...tipoDataCollection];
    }
    return tipoDataCollection;
  }
}
