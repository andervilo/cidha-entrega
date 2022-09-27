import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUnidadeConservacao, UnidadeConservacao } from '../unidade-conservacao.model';

import { UnidadeConservacaoService } from './unidade-conservacao.service';

describe('UnidadeConservacao Service', () => {
  let service: UnidadeConservacaoService;
  let httpMock: HttpTestingController;
  let elemDefault: IUnidadeConservacao;
  let expectedResult: IUnidadeConservacao | IUnidadeConservacao[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UnidadeConservacaoService);
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

    it('should create a UnidadeConservacao', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new UnidadeConservacao()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UnidadeConservacao', () => {
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

    it('should partial update a UnidadeConservacao', () => {
      const patchObject = Object.assign({}, new UnidadeConservacao());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UnidadeConservacao', () => {
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

    it('should delete a UnidadeConservacao', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addUnidadeConservacaoToCollectionIfMissing', () => {
      it('should add a UnidadeConservacao to an empty array', () => {
        const unidadeConservacao: IUnidadeConservacao = { id: 123 };
        expectedResult = service.addUnidadeConservacaoToCollectionIfMissing([], unidadeConservacao);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(unidadeConservacao);
      });

      it('should not add a UnidadeConservacao to an array that contains it', () => {
        const unidadeConservacao: IUnidadeConservacao = { id: 123 };
        const unidadeConservacaoCollection: IUnidadeConservacao[] = [
          {
            ...unidadeConservacao,
          },
          { id: 456 },
        ];
        expectedResult = service.addUnidadeConservacaoToCollectionIfMissing(unidadeConservacaoCollection, unidadeConservacao);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UnidadeConservacao to an array that doesn't contain it", () => {
        const unidadeConservacao: IUnidadeConservacao = { id: 123 };
        const unidadeConservacaoCollection: IUnidadeConservacao[] = [{ id: 456 }];
        expectedResult = service.addUnidadeConservacaoToCollectionIfMissing(unidadeConservacaoCollection, unidadeConservacao);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(unidadeConservacao);
      });

      it('should add only unique UnidadeConservacao to an array', () => {
        const unidadeConservacaoArray: IUnidadeConservacao[] = [{ id: 123 }, { id: 456 }, { id: 7149 }];
        const unidadeConservacaoCollection: IUnidadeConservacao[] = [{ id: 123 }];
        expectedResult = service.addUnidadeConservacaoToCollectionIfMissing(unidadeConservacaoCollection, ...unidadeConservacaoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const unidadeConservacao: IUnidadeConservacao = { id: 123 };
        const unidadeConservacao2: IUnidadeConservacao = { id: 456 };
        expectedResult = service.addUnidadeConservacaoToCollectionIfMissing([], unidadeConservacao, unidadeConservacao2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(unidadeConservacao);
        expect(expectedResult).toContain(unidadeConservacao2);
      });

      it('should accept null and undefined values', () => {
        const unidadeConservacao: IUnidadeConservacao = { id: 123 };
        expectedResult = service.addUnidadeConservacaoToCollectionIfMissing([], null, unidadeConservacao, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(unidadeConservacao);
      });

      it('should return initial array if no UnidadeConservacao is added', () => {
        const unidadeConservacaoCollection: IUnidadeConservacao[] = [{ id: 123 }];
        expectedResult = service.addUnidadeConservacaoToCollectionIfMissing(unidadeConservacaoCollection, undefined, null);
        expect(expectedResult).toEqual(unidadeConservacaoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
