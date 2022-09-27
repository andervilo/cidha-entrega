import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoRepresentante, TipoRepresentante } from '../tipo-representante.model';

import { TipoRepresentanteService } from './tipo-representante.service';

describe('TipoRepresentante Service', () => {
  let service: TipoRepresentanteService;
  let httpMock: HttpTestingController;
  let elemDefault: ITipoRepresentante;
  let expectedResult: ITipoRepresentante | ITipoRepresentante[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TipoRepresentanteService);
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

    it('should create a TipoRepresentante', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TipoRepresentante()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoRepresentante', () => {
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

    it('should partial update a TipoRepresentante', () => {
      const patchObject = Object.assign({}, new TipoRepresentante());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoRepresentante', () => {
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

    it('should delete a TipoRepresentante', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTipoRepresentanteToCollectionIfMissing', () => {
      it('should add a TipoRepresentante to an empty array', () => {
        const tipoRepresentante: ITipoRepresentante = { id: 123 };
        expectedResult = service.addTipoRepresentanteToCollectionIfMissing([], tipoRepresentante);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoRepresentante);
      });

      it('should not add a TipoRepresentante to an array that contains it', () => {
        const tipoRepresentante: ITipoRepresentante = { id: 123 };
        const tipoRepresentanteCollection: ITipoRepresentante[] = [
          {
            ...tipoRepresentante,
          },
          { id: 456 },
        ];
        expectedResult = service.addTipoRepresentanteToCollectionIfMissing(tipoRepresentanteCollection, tipoRepresentante);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoRepresentante to an array that doesn't contain it", () => {
        const tipoRepresentante: ITipoRepresentante = { id: 123 };
        const tipoRepresentanteCollection: ITipoRepresentante[] = [{ id: 456 }];
        expectedResult = service.addTipoRepresentanteToCollectionIfMissing(tipoRepresentanteCollection, tipoRepresentante);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoRepresentante);
      });

      it('should add only unique TipoRepresentante to an array', () => {
        const tipoRepresentanteArray: ITipoRepresentante[] = [{ id: 123 }, { id: 456 }, { id: 63832 }];
        const tipoRepresentanteCollection: ITipoRepresentante[] = [{ id: 123 }];
        expectedResult = service.addTipoRepresentanteToCollectionIfMissing(tipoRepresentanteCollection, ...tipoRepresentanteArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoRepresentante: ITipoRepresentante = { id: 123 };
        const tipoRepresentante2: ITipoRepresentante = { id: 456 };
        expectedResult = service.addTipoRepresentanteToCollectionIfMissing([], tipoRepresentante, tipoRepresentante2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoRepresentante);
        expect(expectedResult).toContain(tipoRepresentante2);
      });

      it('should accept null and undefined values', () => {
        const tipoRepresentante: ITipoRepresentante = { id: 123 };
        expectedResult = service.addTipoRepresentanteToCollectionIfMissing([], null, tipoRepresentante, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoRepresentante);
      });

      it('should return initial array if no TipoRepresentante is added', () => {
        const tipoRepresentanteCollection: ITipoRepresentante[] = [{ id: 123 }];
        expectedResult = service.addTipoRepresentanteToCollectionIfMissing(tipoRepresentanteCollection, undefined, null);
        expect(expectedResult).toEqual(tipoRepresentanteCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
