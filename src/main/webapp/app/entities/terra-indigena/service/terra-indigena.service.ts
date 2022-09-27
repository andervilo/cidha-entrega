import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITerraIndigena, getTerraIndigenaIdentifier } from '../terra-indigena.model';

export type EntityResponseType = HttpResponse<ITerraIndigena>;
export type EntityArrayResponseType = HttpResponse<ITerraIndigena[]>;

@Injectable({ providedIn: 'root' })
export class TerraIndigenaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/terra-indigenas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(terraIndigena: ITerraIndigena): Observable<EntityResponseType> {
    return this.http.post<ITerraIndigena>(this.resourceUrl, terraIndigena, { observe: 'response' });
  }

  update(terraIndigena: ITerraIndigena): Observable<EntityResponseType> {
    return this.http.put<ITerraIndigena>(`${this.resourceUrl}/${getTerraIndigenaIdentifier(terraIndigena) as number}`, terraIndigena, {
      observe: 'response',
    });
  }

  partialUpdate(terraIndigena: ITerraIndigena): Observable<EntityResponseType> {
    return this.http.patch<ITerraIndigena>(`${this.resourceUrl}/${getTerraIndigenaIdentifier(terraIndigena) as number}`, terraIndigena, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITerraIndigena>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITerraIndigena[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTerraIndigenaToCollectionIfMissing(
    terraIndigenaCollection: ITerraIndigena[],
    ...terraIndigenasToCheck: (ITerraIndigena | null | undefined)[]
  ): ITerraIndigena[] {
    const terraIndigenas: ITerraIndigena[] = terraIndigenasToCheck.filter(isPresent);
    if (terraIndigenas.length > 0) {
      const terraIndigenaCollectionIdentifiers = terraIndigenaCollection.map(
        terraIndigenaItem => getTerraIndigenaIdentifier(terraIndigenaItem)!
      );
      const terraIndigenasToAdd = terraIndigenas.filter(terraIndigenaItem => {
        const terraIndigenaIdentifier = getTerraIndigenaIdentifier(terraIndigenaItem);
        if (terraIndigenaIdentifier == null || terraIndigenaCollectionIdentifiers.includes(terraIndigenaIdentifier)) {
          return false;
        }
        terraIndigenaCollectionIdentifiers.push(terraIndigenaIdentifier);
        return true;
      });
      return [...terraIndigenasToAdd, ...terraIndigenaCollection];
    }
    return terraIndigenaCollection;
  }
}
