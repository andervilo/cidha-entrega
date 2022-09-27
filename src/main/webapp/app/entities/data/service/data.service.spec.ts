import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IData, Data } from '../data.model';

import { DataService } from './data.service';

describe('Data Service', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  let elemDefault: IData;
  let expectedResult: IData | IData[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      data: currentDate,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          data: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Data', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          data: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          data: currentDate,
        },
        returnedFromService
      );

      service.create(new Data()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Data', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          data: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          data: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Data', () => {
      const patchObject = Object.assign({}, new Data());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          data: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Data', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          data: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          data: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Data', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDataToCollectionIfMissing', () => {
      it('should add a Data to an empty array', () => {
        const data: IData = { id: 123 };
        expectedResult = service.addDataToCollectionIfMissing([], data);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(data);
      });

      it('should not add a Data to an array that contains it', () => {
        const data: IData = { id: 123 };
        const dataCollection: IData[] = [
          {
            ...data,
          },
          { id: 456 },
        ];
        expectedResult = service.addDataToCollectionIfMissing(dataCollection, data);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Data to an array that doesn't contain it", () => {
        const data: IData = { id: 123 };
        const dataCollection: IData[] = [{ id: 456 }];
        expectedResult = service.addDataToCollectionIfMissing(dataCollection, data);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(data);
      });

      it('should add only unique Data to an array', () => {
        const dataArray: IData[] = [{ id: 123 }, { id: 456 }, { id: 87666 }];
        const dataCollection: IData[] = [{ id: 123 }];
        expectedResult = service.addDataToCollectionIfMissing(dataCollection, ...dataArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const data: IData = { id: 123 };
        const data2: IData = { id: 456 };
        expectedResult = service.addDataToCollectionIfMissing([], data, data2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(data);
        expect(expectedResult).toContain(data2);
      });

      it('should accept null and undefined values', () => {
        const data: IData = { id: 123 };
        expectedResult = service.addDataToCollectionIfMissing([], null, data, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(data);
      });

      it('should return initial array if no Data is added', () => {
        const dataCollection: IData[] = [{ id: 123 }];
        expectedResult = service.addDataToCollectionIfMissing(dataCollection, undefined, null);
        expect(expectedResult).toEqual(dataCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
