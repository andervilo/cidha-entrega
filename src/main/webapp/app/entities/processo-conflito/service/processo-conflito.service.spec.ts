import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProcessoConflito, ProcessoConflito } from '../processo-conflito.model';

import { ProcessoConflitoService } from './processo-conflito.service';

describe('ProcessoConflito Service', () => {
  let service: ProcessoConflitoService;
  let httpMock: HttpTestingController;
  let elemDefault: IProcessoConflito;
  let expectedResult: IProcessoConflito | IProcessoConflito[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProcessoConflitoService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      inicioConflitoObservacoes: 'AAAAAAA',
      historicoConlito: 'AAAAAAA',
      nomeCasoComuidade: 'AAAAAAA',
      consultaPrevia: false,
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

    it('should create a ProcessoConflito', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ProcessoConflito()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProcessoConflito', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          inicioConflitoObservacoes: 'BBBBBB',
          historicoConlito: 'BBBBBB',
          nomeCasoComuidade: 'BBBBBB',
          consultaPrevia: true,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProcessoConflito', () => {
      const patchObject = Object.assign(
        {
          historicoConlito: 'BBBBBB',
          nomeCasoComuidade: 'BBBBBB',
          consultaPrevia: true,
        },
        new ProcessoConflito()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProcessoConflito', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          inicioConflitoObservacoes: 'BBBBBB',
          historicoConlito: 'BBBBBB',
          nomeCasoComuidade: 'BBBBBB',
          consultaPrevia: true,
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

    it('should delete a ProcessoConflito', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addProcessoConflitoToCollectionIfMissing', () => {
      it('should add a ProcessoConflito to an empty array', () => {
        const processoConflito: IProcessoConflito = { id: 123 };
        expectedResult = service.addProcessoConflitoToCollectionIfMissing([], processoConflito);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(processoConflito);
      });

      it('should not add a ProcessoConflito to an array that contains it', () => {
        const processoConflito: IProcessoConflito = { id: 123 };
        const processoConflitoCollection: IProcessoConflito[] = [
          {
            ...processoConflito,
          },
          { id: 456 },
        ];
        expectedResult = service.addProcessoConflitoToCollectionIfMissing(processoConflitoCollection, processoConflito);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProcessoConflito to an array that doesn't contain it", () => {
        const processoConflito: IProcessoConflito = { id: 123 };
        const processoConflitoCollection: IProcessoConflito[] = [{ id: 456 }];
        expectedResult = service.addProcessoConflitoToCollectionIfMissing(processoConflitoCollection, processoConflito);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(processoConflito);
      });

      it('should add only unique ProcessoConflito to an array', () => {
        const processoConflitoArray: IProcessoConflito[] = [{ id: 123 }, { id: 456 }, { id: 29396 }];
        const processoConflitoCollection: IProcessoConflito[] = [{ id: 123 }];
        expectedResult = service.addProcessoConflitoToCollectionIfMissing(processoConflitoCollection, ...processoConflitoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const processoConflito: IProcessoConflito = { id: 123 };
        const processoConflito2: IProcessoConflito = { id: 456 };
        expectedResult = service.addProcessoConflitoToCollectionIfMissing([], processoConflito, processoConflito2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(processoConflito);
        expect(expectedResult).toContain(processoConflito2);
      });

      it('should accept null and undefined values', () => {
        const processoConflito: IProcessoConflito = { id: 123 };
        expectedResult = service.addProcessoConflitoToCollectionIfMissing([], null, processoConflito, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(processoConflito);
      });

      it('should return initial array if no ProcessoConflito is added', () => {
        const processoConflitoCollection: IProcessoConflito[] = [{ id: 123 }];
        expectedResult = service.addProcessoConflitoToCollectionIfMissing(processoConflitoCollection, undefined, null);
        expect(expectedResult).toEqual(processoConflitoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
