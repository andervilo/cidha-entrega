import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDireito, getDireitoIdentifier } from '../direito.model';

export type EntityResponseType = HttpResponse<IDireito>;
export type EntityArrayResponseType = HttpResponse<IDireito[]>;

@Injectable({ providedIn: 'root' })
export class DireitoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/direitos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(direito: IDireito): Observable<EntityResponseType> {
    return this.http.post<IDireito>(this.resourceUrl, direito, { observe: 'response' });
  }

  update(direito: IDireito): Observable<EntityResponseType> {
    return this.http.put<IDireito>(`${this.resourceUrl}/${getDireitoIdentifier(direito) as number}`, direito, { observe: 'response' });
  }

  partialUpdate(direito: IDireito): Observable<EntityResponseType> {
    return this.http.patch<IDireito>(`${this.resourceUrl}/${getDireitoIdentifier(direito) as number}`, direito, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDireito>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDireito[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDireitoToCollectionIfMissing(direitoCollection: IDireito[], ...direitosToCheck: (IDireito | null | undefined)[]): IDireito[] {
    const direitos: IDireito[] = direitosToCheck.filter(isPresent);
    if (direitos.length > 0) {
      const direitoCollectionIdentifiers = direitoCollection.map(direitoItem => getDireitoIdentifier(direitoItem)!);
      const direitosToAdd = direitos.filter(direitoItem => {
        const direitoIdentifier = getDireitoIdentifier(direitoItem);
        if (direitoIdentifier == null || direitoCollectionIdentifiers.includes(direitoIdentifier)) {
          return false;
        }
        direitoCollectionIdentifiers.push(direitoIdentifier);
        return true;
      });
      return [...direitosToAdd, ...direitoCollection];
    }
    return direitoCollection;
  }
}
