import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEmbargoDeclaracaoAgravo, EmbargoDeclaracaoAgravo } from '../embargo-declaracao-agravo.model';

import { EmbargoDeclaracaoAgravoService } from './embargo-declaracao-agravo.service';

describe('EmbargoDeclaracaoAgravo Service', () => {
  let service: EmbargoDeclaracaoAgravoService;
  let httpMock: HttpTestingController;
  let elemDefault: IEmbargoDeclaracaoAgravo;
  let expectedResult: IEmbargoDeclaracaoAgravo | IEmbargoDeclaracaoAgravo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EmbargoDeclaracaoAgravoService);
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

    it('should create a EmbargoDeclaracaoAgravo', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new EmbargoDeclaracaoAgravo()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EmbargoDeclaracaoAgravo', () => {
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

    it('should partial update a EmbargoDeclaracaoAgravo', () => {
      const patchObject = Object.assign(
        {
          descricao: 'BBBBBB',
        },
        new EmbargoDeclaracaoAgravo()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EmbargoDeclaracaoAgravo', () => {
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

    it('should delete a EmbargoDeclaracaoAgravo', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addEmbargoDeclaracaoAgravoToCollectionIfMissing', () => {
      it('should add a EmbargoDeclaracaoAgravo to an empty array', () => {
        const embargoDeclaracaoAgravo: IEmbargoDeclaracaoAgravo = { id: 123 };
        expectedResult = service.addEmbargoDeclaracaoAgravoToCollectionIfMissing([], embargoDeclaracaoAgravo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(embargoDeclaracaoAgravo);
      });

      it('should not add a EmbargoDeclaracaoAgravo to an array that contains it', () => {
        const embargoDeclaracaoAgravo: IEmbargoDeclaracaoAgravo = { id: 123 };
        const embargoDeclaracaoAgravoCollection: IEmbargoDeclaracaoAgravo[] = [
          {
            ...embargoDeclaracaoAgravo,
          },
          { id: 456 },
        ];
        expectedResult = service.addEmbargoDeclaracaoAgravoToCollectionIfMissing(
          embargoDeclaracaoAgravoCollection,
          embargoDeclaracaoAgravo
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EmbargoDeclaracaoAgravo to an array that doesn't contain it", () => {
        const embargoDeclaracaoAgravo: IEmbargoDeclaracaoAgravo = { id: 123 };
        const embargoDeclaracaoAgravoCollection: IEmbargoDeclaracaoAgravo[] = [{ id: 456 }];
        expectedResult = service.addEmbargoDeclaracaoAgravoToCollectionIfMissing(
          embargoDeclaracaoAgravoCollection,
          embargoDeclaracaoAgravo
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(embargoDeclaracaoAgravo);
      });

      it('should add only unique EmbargoDeclaracaoAgravo to an array', () => {
        const embargoDeclaracaoAgravoArray: IEmbargoDeclaracaoAgravo[] = [{ id: 123 }, { id: 456 }, { id: 55756 }];
        const embargoDeclaracaoAgravoCollection: IEmbargoDeclaracaoAgravo[] = [{ id: 123 }];
        expectedResult = service.addEmbargoDeclaracaoAgravoToCollectionIfMissing(
          embargoDeclaracaoAgravoCollection,
          ...embargoDeclaracaoAgravoArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const embargoDeclaracaoAgravo: IEmbargoDeclaracaoAgravo = { id: 123 };
        const embargoDeclaracaoAgravo2: IEmbargoDeclaracaoAgravo = { id: 456 };
        expectedResult = service.addEmbargoDeclaracaoAgravoToCollectionIfMissing([], embargoDeclaracaoAgravo, embargoDeclaracaoAgravo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(embargoDeclaracaoAgravo);
        expect(expectedResult).toContain(embargoDeclaracaoAgravo2);
      });

      it('should accept null and undefined values', () => {
        const embargoDeclaracaoAgravo: IEmbargoDeclaracaoAgravo = { id: 123 };
        expectedResult = service.addEmbargoDeclaracaoAgravoToCollectionIfMissing([], null, embargoDeclaracaoAgravo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(embargoDeclaracaoAgravo);
      });

      it('should return initial array if no EmbargoDeclaracaoAgravo is added', () => {
        const embargoDeclaracaoAgravoCollection: IEmbargoDeclaracaoAgravo[] = [{ id: 123 }];
        expectedResult = service.addEmbargoDeclaracaoAgravoToCollectionIfMissing(embargoDeclaracaoAgravoCollection, undefined, null);
        expect(expectedResult).toEqual(embargoDeclaracaoAgravoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
