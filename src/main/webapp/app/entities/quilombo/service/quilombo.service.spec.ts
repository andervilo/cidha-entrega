import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TipoQuilombo } from 'app/entities/enumerations/tipo-quilombo.model';
import { IQuilombo, Quilombo } from '../quilombo.model';

import { QuilomboService } from './quilombo.service';

describe('Quilombo Service', () => {
  let service: QuilomboService;
  let httpMock: HttpTestingController;
  let elemDefault: IQuilombo;
  let expectedResult: IQuilombo | IQuilombo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(QuilomboService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nome: 'AAAAAAA',
      tipoQuilombo: TipoQuilombo.COMUNIDADE,
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

    it('should create a Quilombo', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Quilombo()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Quilombo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          tipoQuilombo: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Quilombo', () => {
      const patchObject = Object.assign(
        {
          nome: 'BBBBBB',
        },
        new Quilombo()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Quilombo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          tipoQuilombo: 'BBBBBB',
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

    it('should delete a Quilombo', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addQuilomboToCollectionIfMissing', () => {
      it('should add a Quilombo to an empty array', () => {
        const quilombo: IQuilombo = { id: 123 };
        expectedResult = service.addQuilomboToCollectionIfMissing([], quilombo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quilombo);
      });

      it('should not add a Quilombo to an array that contains it', () => {
        const quilombo: IQuilombo = { id: 123 };
        const quilomboCollection: IQuilombo[] = [
          {
            ...quilombo,
          },
          { id: 456 },
        ];
        expectedResult = service.addQuilomboToCollectionIfMissing(quilomboCollection, quilombo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Quilombo to an array that doesn't contain it", () => {
        const quilombo: IQuilombo = { id: 123 };
        const quilomboCollection: IQuilombo[] = [{ id: 456 }];
        expectedResult = service.addQuilomboToCollectionIfMissing(quilomboCollection, quilombo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quilombo);
      });

      it('should add only unique Quilombo to an array', () => {
        const quilomboArray: IQuilombo[] = [{ id: 123 }, { id: 456 }, { id: 15381 }];
        const quilomboCollection: IQuilombo[] = [{ id: 123 }];
        expectedResult = service.addQuilomboToCollectionIfMissing(quilomboCollection, ...quilomboArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const quilombo: IQuilombo = { id: 123 };
        const quilombo2: IQuilombo = { id: 456 };
        expectedResult = service.addQuilomboToCollectionIfMissing([], quilombo, quilombo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quilombo);
        expect(expectedResult).toContain(quilombo2);
      });

      it('should accept null and undefined values', () => {
        const quilombo: IQuilombo = { id: 123 };
        expectedResult = service.addQuilomboToCollectionIfMissing([], null, quilombo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quilombo);
      });

      it('should return initial array if no Quilombo is added', () => {
        const quilomboCollection: IQuilombo[] = [{ id: 123 }];
        expectedResult = service.addQuilomboToCollectionIfMissing(quilomboCollection, undefined, null);
        expect(expectedResult).toEqual(quilomboCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
