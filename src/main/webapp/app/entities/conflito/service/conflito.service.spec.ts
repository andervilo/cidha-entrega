import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IConflito, Conflito } from '../conflito.model';

import { ConflitoService } from './conflito.service';

describe('Conflito Service', () => {
  let service: ConflitoService;
  let httpMock: HttpTestingController;
  let elemDefault: IConflito;
  let expectedResult: IConflito | IConflito[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ConflitoService);
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

    it('should create a Conflito', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Conflito()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Conflito', () => {
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

    it('should partial update a Conflito', () => {
      const patchObject = Object.assign({}, new Conflito());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Conflito', () => {
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

    it('should delete a Conflito', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addConflitoToCollectionIfMissing', () => {
      it('should add a Conflito to an empty array', () => {
        const conflito: IConflito = { id: 123 };
        expectedResult = service.addConflitoToCollectionIfMissing([], conflito);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(conflito);
      });

      it('should not add a Conflito to an array that contains it', () => {
        const conflito: IConflito = { id: 123 };
        const conflitoCollection: IConflito[] = [
          {
            ...conflito,
          },
          { id: 456 },
        ];
        expectedResult = service.addConflitoToCollectionIfMissing(conflitoCollection, conflito);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Conflito to an array that doesn't contain it", () => {
        const conflito: IConflito = { id: 123 };
        const conflitoCollection: IConflito[] = [{ id: 456 }];
        expectedResult = service.addConflitoToCollectionIfMissing(conflitoCollection, conflito);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(conflito);
      });

      it('should add only unique Conflito to an array', () => {
        const conflitoArray: IConflito[] = [{ id: 123 }, { id: 456 }, { id: 58497 }];
        const conflitoCollection: IConflito[] = [{ id: 123 }];
        expectedResult = service.addConflitoToCollectionIfMissing(conflitoCollection, ...conflitoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const conflito: IConflito = { id: 123 };
        const conflito2: IConflito = { id: 456 };
        expectedResult = service.addConflitoToCollectionIfMissing([], conflito, conflito2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(conflito);
        expect(expectedResult).toContain(conflito2);
      });

      it('should accept null and undefined values', () => {
        const conflito: IConflito = { id: 123 };
        expectedResult = service.addConflitoToCollectionIfMissing([], null, conflito, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(conflito);
      });

      it('should return initial array if no Conflito is added', () => {
        const conflitoCollection: IConflito[] = [{ id: 123 }];
        expectedResult = service.addConflitoToCollectionIfMissing(conflitoCollection, undefined, null);
        expect(expectedResult).toEqual(conflitoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
