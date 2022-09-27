import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoDecisao, getTipoDecisaoIdentifier } from '../tipo-decisao.model';

export type EntityResponseType = HttpResponse<ITipoDecisao>;
export type EntityArrayResponseType = HttpResponse<ITipoDecisao[]>;

@Injectable({ providedIn: 'root' })
export class TipoDecisaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-decisaos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tipoDecisao: ITipoDecisao): Observable<EntityResponseType> {
    return this.http.post<ITipoDecisao>(this.resourceUrl, tipoDecisao, { observe: 'response' });
  }

  update(tipoDecisao: ITipoDecisao): Observable<EntityResponseType> {
    return this.http.put<ITipoDecisao>(`${this.resourceUrl}/${getTipoDecisaoIdentifier(tipoDecisao) as number}`, tipoDecisao, {
      observe: 'response',
    });
  }

  partialUpdate(tipoDecisao: ITipoDecisao): Observable<EntityResponseType> {
    return this.http.patch<ITipoDecisao>(`${this.resourceUrl}/${getTipoDecisaoIdentifier(tipoDecisao) as number}`, tipoDecisao, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoDecisao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoDecisao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTipoDecisaoToCollectionIfMissing(
    tipoDecisaoCollection: ITipoDecisao[],
    ...tipoDecisaosToCheck: (ITipoDecisao | null | undefined)[]
  ): ITipoDecisao[] {
    const tipoDecisaos: ITipoDecisao[] = tipoDecisaosToCheck.filter(isPresent);
    if (tipoDecisaos.length > 0) {
      const tipoDecisaoCollectionIdentifiers = tipoDecisaoCollection.map(tipoDecisaoItem => getTipoDecisaoIdentifier(tipoDecisaoItem)!);
      const tipoDecisaosToAdd = tipoDecisaos.filter(tipoDecisaoItem => {
        const tipoDecisaoIdentifier = getTipoDecisaoIdentifier(tipoDecisaoItem);
        if (tipoDecisaoIdentifier == null || tipoDecisaoCollectionIdentifiers.includes(tipoDecisaoIdentifier)) {
          return false;
        }
        tipoDecisaoCollectionIdentifiers.push(tipoDecisaoIdentifier);
        return true;
      });
      return [...tipoDecisaosToAdd, ...tipoDecisaoCollection];
    }
    return tipoDecisaoCollection;
  }
}
