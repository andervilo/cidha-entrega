import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoRecurso, getTipoRecursoIdentifier } from '../tipo-recurso.model';

export type EntityResponseType = HttpResponse<ITipoRecurso>;
export type EntityArrayResponseType = HttpResponse<ITipoRecurso[]>;

@Injectable({ providedIn: 'root' })
export class TipoRecursoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-recursos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tipoRecurso: ITipoRecurso): Observable<EntityResponseType> {
    return this.http.post<ITipoRecurso>(this.resourceUrl, tipoRecurso, { observe: 'response' });
  }

  update(tipoRecurso: ITipoRecurso): Observable<EntityResponseType> {
    return this.http.put<ITipoRecurso>(`${this.resourceUrl}/${getTipoRecursoIdentifier(tipoRecurso) as number}`, tipoRecurso, {
      observe: 'response',
    });
  }

  partialUpdate(tipoRecurso: ITipoRecurso): Observable<EntityResponseType> {
    return this.http.patch<ITipoRecurso>(`${this.resourceUrl}/${getTipoRecursoIdentifier(tipoRecurso) as number}`, tipoRecurso, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoRecurso>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoRecurso[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTipoRecursoToCollectionIfMissing(
    tipoRecursoCollection: ITipoRecurso[],
    ...tipoRecursosToCheck: (ITipoRecurso | null | undefined)[]
  ): ITipoRecurso[] {
    const tipoRecursos: ITipoRecurso[] = tipoRecursosToCheck.filter(isPresent);
    if (tipoRecursos.length > 0) {
      const tipoRecursoCollectionIdentifiers = tipoRecursoCollection.map(tipoRecursoItem => getTipoRecursoIdentifier(tipoRecursoItem)!);
      const tipoRecursosToAdd = tipoRecursos.filter(tipoRecursoItem => {
        const tipoRecursoIdentifier = getTipoRecursoIdentifier(tipoRecursoItem);
        if (tipoRecursoIdentifier == null || tipoRecursoCollectionIdentifiers.includes(tipoRecursoIdentifier)) {
          return false;
        }
        tipoRecursoCollectionIdentifiers.push(tipoRecursoIdentifier);
        return true;
      });
      return [...tipoRecursosToAdd, ...tipoRecursoCollection];
    }
    return tipoRecursoCollection;
  }
}
