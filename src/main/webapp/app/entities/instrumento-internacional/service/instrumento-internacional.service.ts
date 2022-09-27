import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInstrumentoInternacional, getInstrumentoInternacionalIdentifier } from '../instrumento-internacional.model';

export type EntityResponseType = HttpResponse<IInstrumentoInternacional>;
export type EntityArrayResponseType = HttpResponse<IInstrumentoInternacional[]>;

@Injectable({ providedIn: 'root' })
export class InstrumentoInternacionalService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/instrumento-internacionals');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(instrumentoInternacional: IInstrumentoInternacional): Observable<EntityResponseType> {
    return this.http.post<IInstrumentoInternacional>(this.resourceUrl, instrumentoInternacional, { observe: 'response' });
  }

  update(instrumentoInternacional: IInstrumentoInternacional): Observable<EntityResponseType> {
    return this.http.put<IInstrumentoInternacional>(
      `${this.resourceUrl}/${getInstrumentoInternacionalIdentifier(instrumentoInternacional) as number}`,
      instrumentoInternacional,
      { observe: 'response' }
    );
  }

  partialUpdate(instrumentoInternacional: IInstrumentoInternacional): Observable<EntityResponseType> {
    return this.http.patch<IInstrumentoInternacional>(
      `${this.resourceUrl}/${getInstrumentoInternacionalIdentifier(instrumentoInternacional) as number}`,
      instrumentoInternacional,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInstrumentoInternacional>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstrumentoInternacional[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addInstrumentoInternacionalToCollectionIfMissing(
    instrumentoInternacionalCollection: IInstrumentoInternacional[],
    ...instrumentoInternacionalsToCheck: (IInstrumentoInternacional | null | undefined)[]
  ): IInstrumentoInternacional[] {
    const instrumentoInternacionals: IInstrumentoInternacional[] = instrumentoInternacionalsToCheck.filter(isPresent);
    if (instrumentoInternacionals.length > 0) {
      const instrumentoInternacionalCollectionIdentifiers = instrumentoInternacionalCollection.map(
        instrumentoInternacionalItem => getInstrumentoInternacionalIdentifier(instrumentoInternacionalItem)!
      );
      const instrumentoInternacionalsToAdd = instrumentoInternacionals.filter(instrumentoInternacionalItem => {
        const instrumentoInternacionalIdentifier = getInstrumentoInternacionalIdentifier(instrumentoInternacionalItem);
        if (
          instrumentoInternacionalIdentifier == null ||
          instrumentoInternacionalCollectionIdentifiers.includes(instrumentoInternacionalIdentifier)
        ) {
          return false;
        }
        instrumentoInternacionalCollectionIdentifiers.push(instrumentoInternacionalIdentifier);
        return true;
      });
      return [...instrumentoInternacionalsToAdd, ...instrumentoInternacionalCollection];
    }
    return instrumentoInternacionalCollection;
  }
}
