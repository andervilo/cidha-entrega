import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoEmpreendimento, TipoEmpreendimento } from '../tipo-empreendimento.model';

import { TipoEmpreendimentoService } from './tipo-empreendimento.service';

describe('TipoEmpreendimento Service', () => {
  let service: TipoEmpreendimentoService;
  let httpMock: HttpTestingController;
  let elemDefault: ITipoEmpreendimento;
  let expectedResult: ITipoEmpreendimento | ITipoEmpreendimento[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TipoEmpreendimentoService);
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

    it('should create a TipoEmpreendimento', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TipoEmpreendimento()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoEmpreendimento', () => {
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

    it('should partial update a TipoEmpreendimento', () => {
      const patchObject = Object.assign(
        {
          descricao: 'BBBBBB',
        },
        new TipoEmpreendimento()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoEmpreendimento', () => {
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

    it('should delete a TipoEmpreendimento', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTipoEmpreendimentoToCollectionIfMissing', () => {
      it('should add a TipoEmpreendimento to an empty array', () => {
        const tipoEmpreendimento: ITipoEmpreendimento = { id: 123 };
        expectedResult = service.addTipoEmpreendimentoToCollectionIfMissing([], tipoEmpreendimento);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoEmpreendimento);
      });

      it('should not add a TipoEmpreendimento to an array that contains it', () => {
        const tipoEmpreendimento: ITipoEmpreendimento = { id: 123 };
        const tipoEmpreendimentoCollection: ITipoEmpreendimento[] = [
          {
            ...tipoEmpreendimento,
          },
          { id: 456 },
        ];
        expectedResult = service.addTipoEmpreendimentoToCollectionIfMissing(tipoEmpreendimentoCollection, tipoEmpreendimento);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoEmpreendimento to an array that doesn't contain it", () => {
        const tipoEmpreendimento: ITipoEmpreendimento = { id: 123 };
        const tipoEmpreendimentoCollection: ITipoEmpreendimento[] = [{ id: 456 }];
        expectedResult = service.addTipoEmpreendimentoToCollectionIfMissing(tipoEmpreendimentoCollection, tipoEmpreendimento);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoEmpreendimento);
      });

      it('should add only unique TipoEmpreendimento to an array', () => {
        const tipoEmpreendimentoArray: ITipoEmpreendimento[] = [{ id: 123 }, { id: 456 }, { id: 71274 }];
        const tipoEmpreendimentoCollection: ITipoEmpreendimento[] = [{ id: 123 }];
        expectedResult = service.addTipoEmpreendimentoToCollectionIfMissing(tipoEmpreendimentoCollection, ...tipoEmpreendimentoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoEmpreendimento: ITipoEmpreendimento = { id: 123 };
        const tipoEmpreendimento2: ITipoEmpreendimento = { id: 456 };
        expectedResult = service.addTipoEmpreendimentoToCollectionIfMissing([], tipoEmpreendimento, tipoEmpreendimento2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoEmpreendimento);
        expect(expectedResult).toContain(tipoEmpreendimento2);
      });

      it('should accept null and undefined values', () => {
        const tipoEmpreendimento: ITipoEmpreendimento = { id: 123 };
        expectedResult = service.addTipoEmpreendimentoToCollectionIfMissing([], null, tipoEmpreendimento, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoEmpreendimento);
      });

      it('should return initial array if no TipoEmpreendimento is added', () => {
        const tipoEmpreendimentoCollection: ITipoEmpreendimento[] = [{ id: 123 }];
        expectedResult = service.addTipoEmpreendimentoToCollectionIfMissing(tipoEmpreendimentoCollection, undefined, null);
        expect(expectedResult).toEqual(tipoEmpreendimentoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
