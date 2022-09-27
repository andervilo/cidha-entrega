import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProblemaJuridico, ProblemaJuridico } from '../problema-juridico.model';

import { ProblemaJuridicoService } from './problema-juridico.service';

describe('ProblemaJuridico Service', () => {
  let service: ProblemaJuridicoService;
  let httpMock: HttpTestingController;
  let elemDefault: IProblemaJuridico;
  let expectedResult: IProblemaJuridico | IProblemaJuridico[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProblemaJuridicoService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      prolemaJuridicoRespondido: 'AAAAAAA',
      folhasProblemaJuridico: 'AAAAAAA',
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

    it('should create a ProblemaJuridico', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ProblemaJuridico()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProblemaJuridico', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          prolemaJuridicoRespondido: 'BBBBBB',
          folhasProblemaJuridico: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProblemaJuridico', () => {
      const patchObject = Object.assign(
        {
          folhasProblemaJuridico: 'BBBBBB',
        },
        new ProblemaJuridico()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProblemaJuridico', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          prolemaJuridicoRespondido: 'BBBBBB',
          folhasProblemaJuridico: 'BBBBBB',
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

    it('should delete a ProblemaJuridico', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addProblemaJuridicoToCollectionIfMissing', () => {
      it('should add a ProblemaJuridico to an empty array', () => {
        const problemaJuridico: IProblemaJuridico = { id: 123 };
        expectedResult = service.addProblemaJuridicoToCollectionIfMissing([], problemaJuridico);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(problemaJuridico);
      });

      it('should not add a ProblemaJuridico to an array that contains it', () => {
        const problemaJuridico: IProblemaJuridico = { id: 123 };
        const problemaJuridicoCollection: IProblemaJuridico[] = [
          {
            ...problemaJuridico,
          },
          { id: 456 },
        ];
        expectedResult = service.addProblemaJuridicoToCollectionIfMissing(problemaJuridicoCollection, problemaJuridico);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProblemaJuridico to an array that doesn't contain it", () => {
        const problemaJuridico: IProblemaJuridico = { id: 123 };
        const problemaJuridicoCollection: IProblemaJuridico[] = [{ id: 456 }];
        expectedResult = service.addProblemaJuridicoToCollectionIfMissing(problemaJuridicoCollection, problemaJuridico);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(problemaJuridico);
      });

      it('should add only unique ProblemaJuridico to an array', () => {
        const problemaJuridicoArray: IProblemaJuridico[] = [{ id: 123 }, { id: 456 }, { id: 74668 }];
        const problemaJuridicoCollection: IProblemaJuridico[] = [{ id: 123 }];
        expectedResult = service.addProblemaJuridicoToCollectionIfMissing(problemaJuridicoCollection, ...problemaJuridicoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const problemaJuridico: IProblemaJuridico = { id: 123 };
        const problemaJuridico2: IProblemaJuridico = { id: 456 };
        expectedResult = service.addProblemaJuridicoToCollectionIfMissing([], problemaJuridico, problemaJuridico2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(problemaJuridico);
        expect(expectedResult).toContain(problemaJuridico2);
      });

      it('should accept null and undefined values', () => {
        const problemaJuridico: IProblemaJuridico = { id: 123 };
        expectedResult = service.addProblemaJuridicoToCollectionIfMissing([], null, problemaJuridico, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(problemaJuridico);
      });

      it('should return initial array if no ProblemaJuridico is added', () => {
        const problemaJuridicoCollection: IProblemaJuridico[] = [{ id: 123 }];
        expectedResult = service.addProblemaJuridicoToCollectionIfMissing(problemaJuridicoCollection, undefined, null);
        expect(expectedResult).toEqual(problemaJuridicoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
