import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoRecurso, TipoRecurso } from '../tipo-recurso.model';

import { TipoRecursoService } from './tipo-recurso.service';

describe('TipoRecurso Service', () => {
  let service: TipoRecursoService;
  let httpMock: HttpTestingController;
  let elemDefault: ITipoRecurso;
  let expectedResult: ITipoRecurso | ITipoRecurso[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TipoRecursoService);
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

    it('should create a TipoRecurso', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TipoRecurso()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoRecurso', () => {
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

    it('should partial update a TipoRecurso', () => {
      const patchObject = Object.assign(
        {
          descricao: 'BBBBBB',
        },
        new TipoRecurso()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoRecurso', () => {
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

    it('should delete a TipoRecurso', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTipoRecursoToCollectionIfMissing', () => {
      it('should add a TipoRecurso to an empty array', () => {
        const tipoRecurso: ITipoRecurso = { id: 123 };
        expectedResult = service.addTipoRecursoToCollectionIfMissing([], tipoRecurso);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoRecurso);
      });

      it('should not add a TipoRecurso to an array that contains it', () => {
        const tipoRecurso: ITipoRecurso = { id: 123 };
        const tipoRecursoCollection: ITipoRecurso[] = [
          {
            ...tipoRecurso,
          },
          { id: 456 },
        ];
        expectedResult = service.addTipoRecursoToCollectionIfMissing(tipoRecursoCollection, tipoRecurso);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoRecurso to an array that doesn't contain it", () => {
        const tipoRecurso: ITipoRecurso = { id: 123 };
        const tipoRecursoCollection: ITipoRecurso[] = [{ id: 456 }];
        expectedResult = service.addTipoRecursoToCollectionIfMissing(tipoRecursoCollection, tipoRecurso);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoRecurso);
      });

      it('should add only unique TipoRecurso to an array', () => {
        const tipoRecursoArray: ITipoRecurso[] = [{ id: 123 }, { id: 456 }, { id: 80631 }];
        const tipoRecursoCollection: ITipoRecurso[] = [{ id: 123 }];
        expectedResult = service.addTipoRecursoToCollectionIfMissing(tipoRecursoCollection, ...tipoRecursoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoRecurso: ITipoRecurso = { id: 123 };
        const tipoRecurso2: ITipoRecurso = { id: 456 };
        expectedResult = service.addTipoRecursoToCollectionIfMissing([], tipoRecurso, tipoRecurso2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoRecurso);
        expect(expectedResult).toContain(tipoRecurso2);
      });

      it('should accept null and undefined values', () => {
        const tipoRecurso: ITipoRecurso = { id: 123 };
        expectedResult = service.addTipoRecursoToCollectionIfMissing([], null, tipoRecurso, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoRecurso);
      });

      it('should return initial array if no TipoRecurso is added', () => {
        const tipoRecursoCollection: ITipoRecurso[] = [{ id: 123 }];
        expectedResult = service.addTipoRecursoToCollectionIfMissing(tipoRecursoCollection, undefined, null);
        expect(expectedResult).toEqual(tipoRecursoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
