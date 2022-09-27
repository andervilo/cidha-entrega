import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoData, TipoData } from '../tipo-data.model';

import { TipoDataService } from './tipo-data.service';

describe('TipoData Service', () => {
  let service: TipoDataService;
  let httpMock: HttpTestingController;
  let elemDefault: ITipoData;
  let expectedResult: ITipoData | ITipoData[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TipoDataService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      descricao: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a TipoData', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TipoData()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoData', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          descricao: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TipoData', () => {
      const patchObject = Object.assign(
        {
          descricao: 'BBBBBB',
        },
        new TipoData()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoData', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          descricao: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a TipoData', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTipoDataToCollectionIfMissing', () => {
      it('should add a TipoData to an empty array', () => {
        const tipoData: ITipoData = { id: 123 };
        expectedResult = service.addTipoDataToCollectionIfMissing([], tipoData);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoData);
      });

      it('should not add a TipoData to an array that contains it', () => {
        const tipoData: ITipoData = { id: 123 };
        const tipoDataCollection: ITipoData[] = [
          {
            ...tipoData,
          },
          { id: 456 },
        ];
        expectedResult = service.addTipoDataToCollectionIfMissing(tipoDataCollection, tipoData);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoData to an array that doesn't contain it", () => {
        const tipoData: ITipoData = { id: 123 };
        const tipoDataCollection: ITipoData[] = [{ id: 456 }];
        expectedResult = service.addTipoDataToCollectionIfMissing(tipoDataCollection, tipoData);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoData);
      });

      it('should add only unique TipoData to an array', () => {
        const tipoDataArray: ITipoData[] = [{ id: 123 }, { id: 456 }, { id: 71559 }];
        const tipoDataCollection: ITipoData[] = [{ id: 123 }];
        expectedResult = service.addTipoDataToCollectionIfMissing(tipoDataCollection, ...tipoDataArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoData: ITipoData = { id: 123 };
        const tipoData2: ITipoData = { id: 456 };
        expectedResult = service.addTipoDataToCollectionIfMissing([], tipoData, tipoData2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoData);
        expect(expectedResult).toContain(tipoData2);
      });

      it('should accept null and undefined values', () => {
        const tipoData: ITipoData = { id: 123 };
        expectedResult = service.addTipoDataToCollectionIfMissing([], null, tipoData, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoData);
      });

      it('should return initial array if no TipoData is added', () => {
        const tipoDataCollection: ITipoData[] = [{ id: 123 }];
        expectedResult = service.addTipoDataToCollectionIfMissing(tipoDataCollection, undefined, null);
        expect(expectedResult).toEqual(tipoDataCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
