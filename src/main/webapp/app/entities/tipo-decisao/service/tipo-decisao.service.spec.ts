import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoDecisao, TipoDecisao } from '../tipo-decisao.model';

import { TipoDecisaoService } from './tipo-decisao.service';

describe('TipoDecisao Service', () => {
  let service: TipoDecisaoService;
  let httpMock: HttpTestingController;
  let elemDefault: ITipoDecisao;
  let expectedResult: ITipoDecisao | ITipoDecisao[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TipoDecisaoService);
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

    it('should create a TipoDecisao', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TipoDecisao()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoDecisao', () => {
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

    it('should partial update a TipoDecisao', () => {
      const patchObject = Object.assign({}, new TipoDecisao());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoDecisao', () => {
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

    it('should delete a TipoDecisao', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTipoDecisaoToCollectionIfMissing', () => {
      it('should add a TipoDecisao to an empty array', () => {
        const tipoDecisao: ITipoDecisao = { id: 123 };
        expectedResult = service.addTipoDecisaoToCollectionIfMissing([], tipoDecisao);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoDecisao);
      });

      it('should not add a TipoDecisao to an array that contains it', () => {
        const tipoDecisao: ITipoDecisao = { id: 123 };
        const tipoDecisaoCollection: ITipoDecisao[] = [
          {
            ...tipoDecisao,
          },
          { id: 456 },
        ];
        expectedResult = service.addTipoDecisaoToCollectionIfMissing(tipoDecisaoCollection, tipoDecisao);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoDecisao to an array that doesn't contain it", () => {
        const tipoDecisao: ITipoDecisao = { id: 123 };
        const tipoDecisaoCollection: ITipoDecisao[] = [{ id: 456 }];
        expectedResult = service.addTipoDecisaoToCollectionIfMissing(tipoDecisaoCollection, tipoDecisao);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoDecisao);
      });

      it('should add only unique TipoDecisao to an array', () => {
        const tipoDecisaoArray: ITipoDecisao[] = [{ id: 123 }, { id: 456 }, { id: 68832 }];
        const tipoDecisaoCollection: ITipoDecisao[] = [{ id: 123 }];
        expectedResult = service.addTipoDecisaoToCollectionIfMissing(tipoDecisaoCollection, ...tipoDecisaoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoDecisao: ITipoDecisao = { id: 123 };
        const tipoDecisao2: ITipoDecisao = { id: 456 };
        expectedResult = service.addTipoDecisaoToCollectionIfMissing([], tipoDecisao, tipoDecisao2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoDecisao);
        expect(expectedResult).toContain(tipoDecisao2);
      });

      it('should accept null and undefined values', () => {
        const tipoDecisao: ITipoDecisao = { id: 123 };
        expectedResult = service.addTipoDecisaoToCollectionIfMissing([], null, tipoDecisao, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoDecisao);
      });

      it('should return initial array if no TipoDecisao is added', () => {
        const tipoDecisaoCollection: ITipoDecisao[] = [{ id: 123 }];
        expectedResult = service.addTipoDecisaoToCollectionIfMissing(tipoDecisaoCollection, undefined, null);
        expect(expectedResult).toEqual(tipoDecisaoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
