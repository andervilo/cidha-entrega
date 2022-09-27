import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IConcessaoLiminarCassada, ConcessaoLiminarCassada } from '../concessao-liminar-cassada.model';

import { ConcessaoLiminarCassadaService } from './concessao-liminar-cassada.service';

describe('ConcessaoLiminarCassada Service', () => {
  let service: ConcessaoLiminarCassadaService;
  let httpMock: HttpTestingController;
  let elemDefault: IConcessaoLiminarCassada;
  let expectedResult: IConcessaoLiminarCassada | IConcessaoLiminarCassada[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ConcessaoLiminarCassadaService);
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

    it('should create a ConcessaoLiminarCassada', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ConcessaoLiminarCassada()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ConcessaoLiminarCassada', () => {
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

    it('should partial update a ConcessaoLiminarCassada', () => {
      const patchObject = Object.assign({}, new ConcessaoLiminarCassada());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ConcessaoLiminarCassada', () => {
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

    it('should delete a ConcessaoLiminarCassada', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addConcessaoLiminarCassadaToCollectionIfMissing', () => {
      it('should add a ConcessaoLiminarCassada to an empty array', () => {
        const concessaoLiminarCassada: IConcessaoLiminarCassada = { id: 123 };
        expectedResult = service.addConcessaoLiminarCassadaToCollectionIfMissing([], concessaoLiminarCassada);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(concessaoLiminarCassada);
      });

      it('should not add a ConcessaoLiminarCassada to an array that contains it', () => {
        const concessaoLiminarCassada: IConcessaoLiminarCassada = { id: 123 };
        const concessaoLiminarCassadaCollection: IConcessaoLiminarCassada[] = [
          {
            ...concessaoLiminarCassada,
          },
          { id: 456 },
        ];
        expectedResult = service.addConcessaoLiminarCassadaToCollectionIfMissing(
          concessaoLiminarCassadaCollection,
          concessaoLiminarCassada
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ConcessaoLiminarCassada to an array that doesn't contain it", () => {
        const concessaoLiminarCassada: IConcessaoLiminarCassada = { id: 123 };
        const concessaoLiminarCassadaCollection: IConcessaoLiminarCassada[] = [{ id: 456 }];
        expectedResult = service.addConcessaoLiminarCassadaToCollectionIfMissing(
          concessaoLiminarCassadaCollection,
          concessaoLiminarCassada
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(concessaoLiminarCassada);
      });

      it('should add only unique ConcessaoLiminarCassada to an array', () => {
        const concessaoLiminarCassadaArray: IConcessaoLiminarCassada[] = [{ id: 123 }, { id: 456 }, { id: 16141 }];
        const concessaoLiminarCassadaCollection: IConcessaoLiminarCassada[] = [{ id: 123 }];
        expectedResult = service.addConcessaoLiminarCassadaToCollectionIfMissing(
          concessaoLiminarCassadaCollection,
          ...concessaoLiminarCassadaArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const concessaoLiminarCassada: IConcessaoLiminarCassada = { id: 123 };
        const concessaoLiminarCassada2: IConcessaoLiminarCassada = { id: 456 };
        expectedResult = service.addConcessaoLiminarCassadaToCollectionIfMissing([], concessaoLiminarCassada, concessaoLiminarCassada2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(concessaoLiminarCassada);
        expect(expectedResult).toContain(concessaoLiminarCassada2);
      });

      it('should accept null and undefined values', () => {
        const concessaoLiminarCassada: IConcessaoLiminarCassada = { id: 123 };
        expectedResult = service.addConcessaoLiminarCassadaToCollectionIfMissing([], null, concessaoLiminarCassada, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(concessaoLiminarCassada);
      });

      it('should return initial array if no ConcessaoLiminarCassada is added', () => {
        const concessaoLiminarCassadaCollection: IConcessaoLiminarCassada[] = [{ id: 123 }];
        expectedResult = service.addConcessaoLiminarCassadaToCollectionIfMissing(concessaoLiminarCassadaCollection, undefined, null);
        expect(expectedResult).toEqual(concessaoLiminarCassadaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
