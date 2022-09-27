import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOpcaoRecurso, OpcaoRecurso } from '../opcao-recurso.model';

import { OpcaoRecursoService } from './opcao-recurso.service';

describe('OpcaoRecurso Service', () => {
  let service: OpcaoRecursoService;
  let httpMock: HttpTestingController;
  let elemDefault: IOpcaoRecurso;
  let expectedResult: IOpcaoRecurso | IOpcaoRecurso[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OpcaoRecursoService);
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

    it('should create a OpcaoRecurso', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new OpcaoRecurso()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a OpcaoRecurso', () => {
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

    it('should partial update a OpcaoRecurso', () => {
      const patchObject = Object.assign({}, new OpcaoRecurso());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of OpcaoRecurso', () => {
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

    it('should delete a OpcaoRecurso', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addOpcaoRecursoToCollectionIfMissing', () => {
      it('should add a OpcaoRecurso to an empty array', () => {
        const opcaoRecurso: IOpcaoRecurso = { id: 123 };
        expectedResult = service.addOpcaoRecursoToCollectionIfMissing([], opcaoRecurso);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(opcaoRecurso);
      });

      it('should not add a OpcaoRecurso to an array that contains it', () => {
        const opcaoRecurso: IOpcaoRecurso = { id: 123 };
        const opcaoRecursoCollection: IOpcaoRecurso[] = [
          {
            ...opcaoRecurso,
          },
          { id: 456 },
        ];
        expectedResult = service.addOpcaoRecursoToCollectionIfMissing(opcaoRecursoCollection, opcaoRecurso);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a OpcaoRecurso to an array that doesn't contain it", () => {
        const opcaoRecurso: IOpcaoRecurso = { id: 123 };
        const opcaoRecursoCollection: IOpcaoRecurso[] = [{ id: 456 }];
        expectedResult = service.addOpcaoRecursoToCollectionIfMissing(opcaoRecursoCollection, opcaoRecurso);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(opcaoRecurso);
      });

      it('should add only unique OpcaoRecurso to an array', () => {
        const opcaoRecursoArray: IOpcaoRecurso[] = [{ id: 123 }, { id: 456 }, { id: 8781 }];
        const opcaoRecursoCollection: IOpcaoRecurso[] = [{ id: 123 }];
        expectedResult = service.addOpcaoRecursoToCollectionIfMissing(opcaoRecursoCollection, ...opcaoRecursoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const opcaoRecurso: IOpcaoRecurso = { id: 123 };
        const opcaoRecurso2: IOpcaoRecurso = { id: 456 };
        expectedResult = service.addOpcaoRecursoToCollectionIfMissing([], opcaoRecurso, opcaoRecurso2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(opcaoRecurso);
        expect(expectedResult).toContain(opcaoRecurso2);
      });

      it('should accept null and undefined values', () => {
        const opcaoRecurso: IOpcaoRecurso = { id: 123 };
        expectedResult = service.addOpcaoRecursoToCollectionIfMissing([], null, opcaoRecurso, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(opcaoRecurso);
      });

      it('should return initial array if no OpcaoRecurso is added', () => {
        const opcaoRecursoCollection: IOpcaoRecurso[] = [{ id: 123 }];
        expectedResult = service.addOpcaoRecursoToCollectionIfMissing(opcaoRecursoCollection, undefined, null);
        expect(expectedResult).toEqual(opcaoRecursoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
