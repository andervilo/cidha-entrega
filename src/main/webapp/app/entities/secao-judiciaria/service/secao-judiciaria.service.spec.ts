import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISecaoJudiciaria, SecaoJudiciaria } from '../secao-judiciaria.model';

import { SecaoJudiciariaService } from './secao-judiciaria.service';

describe('SecaoJudiciaria Service', () => {
  let service: SecaoJudiciariaService;
  let httpMock: HttpTestingController;
  let elemDefault: ISecaoJudiciaria;
  let expectedResult: ISecaoJudiciaria | ISecaoJudiciaria[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SecaoJudiciariaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      sigla: 'AAAAAAA',
      nome: 'AAAAAAA',
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

    it('should create a SecaoJudiciaria', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new SecaoJudiciaria()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SecaoJudiciaria', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          sigla: 'BBBBBB',
          nome: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SecaoJudiciaria', () => {
      const patchObject = Object.assign(
        {
          sigla: 'BBBBBB',
          nome: 'BBBBBB',
        },
        new SecaoJudiciaria()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SecaoJudiciaria', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          sigla: 'BBBBBB',
          nome: 'BBBBBB',
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

    it('should delete a SecaoJudiciaria', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSecaoJudiciariaToCollectionIfMissing', () => {
      it('should add a SecaoJudiciaria to an empty array', () => {
        const secaoJudiciaria: ISecaoJudiciaria = { id: 123 };
        expectedResult = service.addSecaoJudiciariaToCollectionIfMissing([], secaoJudiciaria);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(secaoJudiciaria);
      });

      it('should not add a SecaoJudiciaria to an array that contains it', () => {
        const secaoJudiciaria: ISecaoJudiciaria = { id: 123 };
        const secaoJudiciariaCollection: ISecaoJudiciaria[] = [
          {
            ...secaoJudiciaria,
          },
          { id: 456 },
        ];
        expectedResult = service.addSecaoJudiciariaToCollectionIfMissing(secaoJudiciariaCollection, secaoJudiciaria);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SecaoJudiciaria to an array that doesn't contain it", () => {
        const secaoJudiciaria: ISecaoJudiciaria = { id: 123 };
        const secaoJudiciariaCollection: ISecaoJudiciaria[] = [{ id: 456 }];
        expectedResult = service.addSecaoJudiciariaToCollectionIfMissing(secaoJudiciariaCollection, secaoJudiciaria);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(secaoJudiciaria);
      });

      it('should add only unique SecaoJudiciaria to an array', () => {
        const secaoJudiciariaArray: ISecaoJudiciaria[] = [{ id: 123 }, { id: 456 }, { id: 98307 }];
        const secaoJudiciariaCollection: ISecaoJudiciaria[] = [{ id: 123 }];
        expectedResult = service.addSecaoJudiciariaToCollectionIfMissing(secaoJudiciariaCollection, ...secaoJudiciariaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const secaoJudiciaria: ISecaoJudiciaria = { id: 123 };
        const secaoJudiciaria2: ISecaoJudiciaria = { id: 456 };
        expectedResult = service.addSecaoJudiciariaToCollectionIfMissing([], secaoJudiciaria, secaoJudiciaria2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(secaoJudiciaria);
        expect(expectedResult).toContain(secaoJudiciaria2);
      });

      it('should accept null and undefined values', () => {
        const secaoJudiciaria: ISecaoJudiciaria = { id: 123 };
        expectedResult = service.addSecaoJudiciariaToCollectionIfMissing([], null, secaoJudiciaria, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(secaoJudiciaria);
      });

      it('should return initial array if no SecaoJudiciaria is added', () => {
        const secaoJudiciariaCollection: ISecaoJudiciaria[] = [{ id: 123 }];
        expectedResult = service.addSecaoJudiciariaToCollectionIfMissing(secaoJudiciariaCollection, undefined, null);
        expect(expectedResult).toEqual(secaoJudiciariaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
