import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IData, getDataIdentifier } from '../data.model';

export type EntityResponseType = HttpResponse<IData>;
export type EntityArrayResponseType = HttpResponse<IData[]>;

@Injectable({ providedIn: 'root' })
export class DataService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/data');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(data: IData): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(data);
    return this.http
      .post<IData>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(data: IData): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(data);
    return this.http
      .put<IData>(`${this.resourceUrl}/${getDataIdentifier(data) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(data: IData): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(data);
    return this.http
      .patch<IData>(`${this.resourceUrl}/${getDataIdentifier(data) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IData>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IData[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDataToCollectionIfMissing(dataCollection: IData[], ...dataToCheck: (IData | null | undefined)[]): IData[] {
    const data: IData[] = dataToCheck.filter(isPresent);
    if (data.length > 0) {
      const dataCollectionIdentifiers = dataCollection.map(dataItem => getDataIdentifier(dataItem)!);
      const dataToAdd = data.filter(dataItem => {
        const dataIdentifier = getDataIdentifier(dataItem);
        if (dataIdentifier == null || dataCollectionIdentifiers.includes(dataIdentifier)) {
          return false;
        }
        dataCollectionIdentifiers.push(dataIdentifier);
        return true;
      });
      return [...dataToAdd, ...dataCollection];
    }
    return dataCollection;
  }

  protected convertDateFromClient(data: IData): IData {
    return Object.assign({}, data, {
      data: data.data?.isValid() ? data.data.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.data = res.body.data ? dayjs(res.body.data) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((data: IData) => {
        data.data = data.data ? dayjs(data.data) : undefined;
      });
    }
    return res;
  }
}
