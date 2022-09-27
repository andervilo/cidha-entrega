import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRelator, Relator } from '../relator.model';

import { RelatorService } from './relator.service';

describe('Relator Service', () => {
  let service: RelatorService;
  let httpMock: HttpTestingController;
  let elemDefault: IRelator;
  let expectedResult: IRelator | IRelator[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RelatorService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nome: 'AAAAAAA',
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

    it('should create a Relator', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Relator()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Relator', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Relator', () => {
      const patchObject = Object.assign(
        {
          nome: 'BBBBBB',
        },
        new Relator()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Relator', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
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

    it('should delete a Relator', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addRelatorToCollectionIfMissing', () => {
      it('should add a Relator to an empty array', () => {
        const relator: IRelator = { id: 123 };
        expectedResult = service.addRelatorToCollectionIfMissing([], relator);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(relator);
      });

      it('should not add a Relator to an array that contains it', () => {
        const relator: IRelator = { id: 123 };
        const relatorCollection: IRelator[] = [
          {
            ...relator,
          },
          { id: 456 },
        ];
        expectedResult = service.addRelatorToCollectionIfMissing(relatorCollection, relator);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Relator to an array that doesn't contain it", () => {
        const relator: IRelator = { id: 123 };
        const relatorCollection: IRelator[] = [{ id: 456 }];
        expectedResult = service.addRelatorToCollectionIfMissing(relatorCollection, relator);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(relator);
      });

      it('should add only unique Relator to an array', () => {
        const relatorArray: IRelator[] = [{ id: 123 }, { id: 456 }, { id: 54413 }];
        const relatorCollection: IRelator[] = [{ id: 123 }];
        expectedResult = service.addRelatorToCollectionIfMissing(relatorCollection, ...relatorArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const relator: IRelator = { id: 123 };
        const relator2: IRelator = { id: 456 };
        expectedResult = service.addRelatorToCollectionIfMissing([], relator, relator2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(relator);
        expect(expectedResult).toContain(relator2);
      });

      it('should accept null and undefined values', () => {
        const relator: IRelator = { id: 123 };
        expectedResult = service.addRelatorToCollectionIfMissing([], null, relator, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(relator);
      });

      it('should return initial array if no Relator is added', () => {
        const relatorCollection: IRelator[] = [{ id: 123 }];
        expectedResult = service.addRelatorToCollectionIfMissing(relatorCollection, undefined, null);
        expect(expectedResult).toEqual(relatorCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
