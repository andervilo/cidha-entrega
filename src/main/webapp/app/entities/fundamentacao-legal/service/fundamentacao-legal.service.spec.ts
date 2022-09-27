import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFundamentacaoLegal, FundamentacaoLegal } from '../fundamentacao-legal.model';

import { FundamentacaoLegalService } from './fundamentacao-legal.service';

describe('FundamentacaoLegal Service', () => {
  let service: FundamentacaoLegalService;
  let httpMock: HttpTestingController;
  let elemDefault: IFundamentacaoLegal;
  let expectedResult: IFundamentacaoLegal | IFundamentacaoLegal[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FundamentacaoLegalService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      fundamentacaoLegal: 'AAAAAAA',
      folhasFundamentacaoLegal: 'AAAAAAA',
      fundamentacaoLegalSugerida: 'AAAAAAA',
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

    it('should create a FundamentacaoLegal', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new FundamentacaoLegal()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FundamentacaoLegal', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          fundamentacaoLegal: 'BBBBBB',
          folhasFundamentacaoLegal: 'BBBBBB',
          fundamentacaoLegalSugerida: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FundamentacaoLegal', () => {
      const patchObject = Object.assign(
        {
          fundamentacaoLegal: 'BBBBBB',
        },
        new FundamentacaoLegal()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FundamentacaoLegal', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          fundamentacaoLegal: 'BBBBBB',
          folhasFundamentacaoLegal: 'BBBBBB',
          fundamentacaoLegalSugerida: 'BBBBBB',
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

    it('should delete a FundamentacaoLegal', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addFundamentacaoLegalToCollectionIfMissing', () => {
      it('should add a FundamentacaoLegal to an empty array', () => {
        const fundamentacaoLegal: IFundamentacaoLegal = { id: 123 };
        expectedResult = service.addFundamentacaoLegalToCollectionIfMissing([], fundamentacaoLegal);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fundamentacaoLegal);
      });

      it('should not add a FundamentacaoLegal to an array that contains it', () => {
        const fundamentacaoLegal: IFundamentacaoLegal = { id: 123 };
        const fundamentacaoLegalCollection: IFundamentacaoLegal[] = [
          {
            ...fundamentacaoLegal,
          },
          { id: 456 },
        ];
        expectedResult = service.addFundamentacaoLegalToCollectionIfMissing(fundamentacaoLegalCollection, fundamentacaoLegal);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FundamentacaoLegal to an array that doesn't contain it", () => {
        const fundamentacaoLegal: IFundamentacaoLegal = { id: 123 };
        const fundamentacaoLegalCollection: IFundamentacaoLegal[] = [{ id: 456 }];
        expectedResult = service.addFundamentacaoLegalToCollectionIfMissing(fundamentacaoLegalCollection, fundamentacaoLegal);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fundamentacaoLegal);
      });

      it('should add only unique FundamentacaoLegal to an array', () => {
        const fundamentacaoLegalArray: IFundamentacaoLegal[] = [{ id: 123 }, { id: 456 }, { id: 6168 }];
        const fundamentacaoLegalCollection: IFundamentacaoLegal[] = [{ id: 123 }];
        expectedResult = service.addFundamentacaoLegalToCollectionIfMissing(fundamentacaoLegalCollection, ...fundamentacaoLegalArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fundamentacaoLegal: IFundamentacaoLegal = { id: 123 };
        const fundamentacaoLegal2: IFundamentacaoLegal = { id: 456 };
        expectedResult = service.addFundamentacaoLegalToCollectionIfMissing([], fundamentacaoLegal, fundamentacaoLegal2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fundamentacaoLegal);
        expect(expectedResult).toContain(fundamentacaoLegal2);
      });

      it('should accept null and undefined values', () => {
        const fundamentacaoLegal: IFundamentacaoLegal = { id: 123 };
        expectedResult = service.addFundamentacaoLegalToCollectionIfMissing([], null, fundamentacaoLegal, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fundamentacaoLegal);
      });

      it('should return initial array if no FundamentacaoLegal is added', () => {
        const fundamentacaoLegalCollection: IFundamentacaoLegal[] = [{ id: 123 }];
        expectedResult = service.addFundamentacaoLegalToCollectionIfMissing(fundamentacaoLegalCollection, undefined, null);
        expect(expectedResult).toEqual(fundamentacaoLegalCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
