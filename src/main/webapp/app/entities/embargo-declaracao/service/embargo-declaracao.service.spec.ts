import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEmbargoDeclaracao, EmbargoDeclaracao } from '../embargo-declaracao.model';

import { EmbargoDeclaracaoService } from './embargo-declaracao.service';

describe('EmbargoDeclaracao Service', () => {
  let service: EmbargoDeclaracaoService;
  let httpMock: HttpTestingController;
  let elemDefault: IEmbargoDeclaracao;
  let expectedResult: IEmbargoDeclaracao | IEmbargoDeclaracao[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EmbargoDeclaracaoService);
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

    it('should create a EmbargoDeclaracao', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new EmbargoDeclaracao()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EmbargoDeclaracao', () => {
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

    it('should partial update a EmbargoDeclaracao', () => {
      const patchObject = Object.assign({}, new EmbargoDeclaracao());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EmbargoDeclaracao', () => {
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

    it('should delete a EmbargoDeclaracao', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addEmbargoDeclaracaoToCollectionIfMissing', () => {
      it('should add a EmbargoDeclaracao to an empty array', () => {
        const embargoDeclaracao: IEmbargoDeclaracao = { id: 123 };
        expectedResult = service.addEmbargoDeclaracaoToCollectionIfMissing([], embargoDeclaracao);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(embargoDeclaracao);
      });

      it('should not add a EmbargoDeclaracao to an array that contains it', () => {
        const embargoDeclaracao: IEmbargoDeclaracao = { id: 123 };
        const embargoDeclaracaoCollection: IEmbargoDeclaracao[] = [
          {
            ...embargoDeclaracao,
          },
          { id: 456 },
        ];
        expectedResult = service.addEmbargoDeclaracaoToCollectionIfMissing(embargoDeclaracaoCollection, embargoDeclaracao);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EmbargoDeclaracao to an array that doesn't contain it", () => {
        const embargoDeclaracao: IEmbargoDeclaracao = { id: 123 };
        const embargoDeclaracaoCollection: IEmbargoDeclaracao[] = [{ id: 456 }];
        expectedResult = service.addEmbargoDeclaracaoToCollectionIfMissing(embargoDeclaracaoCollection, embargoDeclaracao);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(embargoDeclaracao);
      });

      it('should add only unique EmbargoDeclaracao to an array', () => {
        const embargoDeclaracaoArray: IEmbargoDeclaracao[] = [{ id: 123 }, { id: 456 }, { id: 53687 }];
        const embargoDeclaracaoCollection: IEmbargoDeclaracao[] = [{ id: 123 }];
        expectedResult = service.addEmbargoDeclaracaoToCollectionIfMissing(embargoDeclaracaoCollection, ...embargoDeclaracaoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const embargoDeclaracao: IEmbargoDeclaracao = { id: 123 };
        const embargoDeclaracao2: IEmbargoDeclaracao = { id: 456 };
        expectedResult = service.addEmbargoDeclaracaoToCollectionIfMissing([], embargoDeclaracao, embargoDeclaracao2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(embargoDeclaracao);
        expect(expectedResult).toContain(embargoDeclaracao2);
      });

      it('should accept null and undefined values', () => {
        const embargoDeclaracao: IEmbargoDeclaracao = { id: 123 };
        expectedResult = service.addEmbargoDeclaracaoToCollectionIfMissing([], null, embargoDeclaracao, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(embargoDeclaracao);
      });

      it('should return initial array if no EmbargoDeclaracao is added', () => {
        const embargoDeclaracaoCollection: IEmbargoDeclaracao[] = [{ id: 123 }];
        expectedResult = service.addEmbargoDeclaracaoToCollectionIfMissing(embargoDeclaracaoCollection, undefined, null);
        expect(expectedResult).toEqual(embargoDeclaracaoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
