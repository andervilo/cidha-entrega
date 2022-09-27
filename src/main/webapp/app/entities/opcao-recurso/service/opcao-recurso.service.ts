import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOpcaoRecurso, getOpcaoRecursoIdentifier } from '../opcao-recurso.model';

export type EntityResponseType = HttpResponse<IOpcaoRecurso>;
export type EntityArrayResponseType = HttpResponse<IOpcaoRecurso[]>;

@Injectable({ providedIn: 'root' })
export class OpcaoRecursoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/opcao-recursos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(opcaoRecurso: IOpcaoRecurso): Observable<EntityResponseType> {
    return this.http.post<IOpcaoRecurso>(this.resourceUrl, opcaoRecurso, { observe: 'response' });
  }

  update(opcaoRecurso: IOpcaoRecurso): Observable<EntityResponseType> {
    return this.http.put<IOpcaoRecurso>(`${this.resourceUrl}/${getOpcaoRecursoIdentifier(opcaoRecurso) as number}`, opcaoRecurso, {
      observe: 'response',
    });
  }

  partialUpdate(opcaoRecurso: IOpcaoRecurso): Observable<EntityResponseType> {
    return this.http.patch<IOpcaoRecurso>(`${this.resourceUrl}/${getOpcaoRecursoIdentifier(opcaoRecurso) as number}`, opcaoRecurso, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOpcaoRecurso>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOpcaoRecurso[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addOpcaoRecursoToCollectionIfMissing(
    opcaoRecursoCollection: IOpcaoRecurso[],
    ...opcaoRecursosToCheck: (IOpcaoRecurso | null | undefined)[]
  ): IOpcaoRecurso[] {
    const opcaoRecursos: IOpcaoRecurso[] = opcaoRecursosToCheck.filter(isPresent);
    if (opcaoRecursos.length > 0) {
      const opcaoRecursoCollectionIdentifiers = opcaoRecursoCollection.map(
        opcaoRecursoItem => getOpcaoRecursoIdentifier(opcaoRecursoItem)!
      );
      const opcaoRecursosToAdd = opcaoRecursos.filter(opcaoRecursoItem => {
        const opcaoRecursoIdentifier = getOpcaoRecursoIdentifier(opcaoRecursoItem);
        if (opcaoRecursoIdentifier == null || opcaoRecursoCollectionIdentifiers.includes(opcaoRecursoIdentifier)) {
          return false;
        }
        opcaoRecursoCollectionIdentifiers.push(opcaoRecursoIdentifier);
        return true;
      });
      return [...opcaoRecursosToAdd, ...opcaoRecursoCollection];
    }
    return opcaoRecursoCollection;
  }
}
