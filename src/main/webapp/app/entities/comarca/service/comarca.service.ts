import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IComarca, getComarcaIdentifier } from '../comarca.model';

export type EntityResponseType = HttpResponse<IComarca>;
export type EntityArrayResponseType = HttpResponse<IComarca[]>;

@Injectable({ providedIn: 'root' })
export class ComarcaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/comarcas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(comarca: IComarca): Observable<EntityResponseType> {
    return this.http.post<IComarca>(this.resourceUrl, comarca, { observe: 'response' });
  }

  update(comarca: IComarca): Observable<EntityResponseType> {
    return this.http.put<IComarca>(`${this.resourceUrl}/${getComarcaIdentifier(comarca) as number}`, comarca, { observe: 'response' });
  }

  partialUpdate(comarca: IComarca): Observable<EntityResponseType> {
    return this.http.patch<IComarca>(`${this.resourceUrl}/${getComarcaIdentifier(comarca) as number}`, comarca, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IComarca>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IComarca[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addComarcaToCollectionIfMissing(comarcaCollection: IComarca[], ...comarcasToCheck: (IComarca | null | undefined)[]): IComarca[] {
    const comarcas: IComarca[] = comarcasToCheck.filter(isPresent);
    if (comarcas.length > 0) {
      const comarcaCollectionIdentifiers = comarcaCollection.map(comarcaItem => getComarcaIdentifier(comarcaItem)!);
      const comarcasToAdd = comarcas.filter(comarcaItem => {
        const comarcaIdentifier = getComarcaIdentifier(comarcaItem);
        if (comarcaIdentifier == null || comarcaCollectionIdentifiers.includes(comarcaIdentifier)) {
          return false;
        }
        comarcaCollectionIdentifiers.push(comarcaIdentifier);
        return true;
      });
      return [...comarcasToAdd, ...comarcaCollection];
    }
    return comarcaCollection;
  }
}
