import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IComarca, Comarca } from '../comarca.model';

import { ComarcaService } from './comarca.service';

describe('Comarca Service', () => {
  let service: ComarcaService;
  let httpMock: HttpTestingController;
  let elemDefault: IComarca;
  let expectedResult: IComarca | IComarca[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ComarcaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nome: 'AAAAAAA',
      codigoCnj: 0,
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

    it('should create a Comarca', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Comarca()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Comarca', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          codigoCnj: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Comarca', () => {
      const patchObject = Object.assign({}, new Comarca());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Comarca', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          codigoCnj: 1,
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

    it('should delete a Comarca', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addComarcaToCollectionIfMissing', () => {
      it('should add a Comarca to an empty array', () => {
        const comarca: IComarca = { id: 123 };
        expectedResult = service.addComarcaToCollectionIfMissing([], comarca);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(comarca);
      });

      it('should not add a Comarca to an array that contains it', () => {
        const comarca: IComarca = { id: 123 };
        const comarcaCollection: IComarca[] = [
          {
            ...comarca,
          },
          { id: 456 },
        ];
        expectedResult = service.addComarcaToCollectionIfMissing(comarcaCollection, comarca);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Comarca to an array that doesn't contain it", () => {
        const comarca: IComarca = { id: 123 };
        const comarcaCollection: IComarca[] = [{ id: 456 }];
        expectedResult = service.addComarcaToCollectionIfMissing(comarcaCollection, comarca);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(comarca);
      });

      it('should add only unique Comarca to an array', () => {
        const comarcaArray: IComarca[] = [{ id: 123 }, { id: 456 }, { id: 26561 }];
        const comarcaCollection: IComarca[] = [{ id: 123 }];
        expectedResult = service.addComarcaToCollectionIfMissing(comarcaCollection, ...comarcaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const comarca: IComarca = { id: 123 };
        const comarca2: IComarca = { id: 456 };
        expectedResult = service.addComarcaToCollectionIfMissing([], comarca, comarca2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(comarca);
        expect(expectedResult).toContain(comarca2);
      });

      it('should accept null and undefined values', () => {
        const comarca: IComarca = { id: 123 };
        expectedResult = service.addComarcaToCollectionIfMissing([], null, comarca, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(comarca);
      });

      it('should return initial array if no Comarca is added', () => {
        const comarcaCollection: IComarca[] = [{ id: 123 }];
        expectedResult = service.addComarcaToCollectionIfMissing(comarcaCollection, undefined, null);
        expect(expectedResult).toEqual(comarcaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
