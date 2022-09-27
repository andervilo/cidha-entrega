import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITerritorio, getTerritorioIdentifier } from '../territorio.model';

export type EntityResponseType = HttpResponse<ITerritorio>;
export type EntityArrayResponseType = HttpResponse<ITerritorio[]>;

@Injectable({ providedIn: 'root' })
export class TerritorioService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/territorios');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(territorio: ITerritorio): Observable<EntityResponseType> {
    return this.http.post<ITerritorio>(this.resourceUrl, territorio, { observe: 'response' });
  }

  update(territorio: ITerritorio): Observable<EntityResponseType> {
    return this.http.put<ITerritorio>(`${this.resourceUrl}/${getTerritorioIdentifier(territorio) as number}`, territorio, {
      observe: 'response',
    });
  }

  partialUpdate(territorio: ITerritorio): Observable<EntityResponseType> {
    return this.http.patch<ITerritorio>(`${this.resourceUrl}/${getTerritorioIdentifier(territorio) as number}`, territorio, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITerritorio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITerritorio[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTerritorioToCollectionIfMissing(
    territorioCollection: ITerritorio[],
    ...territoriosToCheck: (ITerritorio | null | undefined)[]
  ): ITerritorio[] {
    const territorios: ITerritorio[] = territoriosToCheck.filter(isPresent);
    if (territorios.length > 0) {
      const territorioCollectionIdentifiers = territorioCollection.map(territorioItem => getTerritorioIdentifier(territorioItem)!);
      const territoriosToAdd = territorios.filter(territorioItem => {
        const territorioIdentifier = getTerritorioIdentifier(territorioItem);
        if (territorioIdentifier == null || territorioCollectionIdentifiers.includes(territorioIdentifier)) {
          return false;
        }
        territorioCollectionIdentifiers.push(territorioIdentifier);
        return true;
      });
      return [...territoriosToAdd, ...territorioCollection];
    }
    return territorioCollection;
  }
}
