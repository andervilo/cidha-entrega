import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFundamentacaoDoutrinaria, FundamentacaoDoutrinaria } from '../fundamentacao-doutrinaria.model';

import { FundamentacaoDoutrinariaService } from './fundamentacao-doutrinaria.service';

describe('FundamentacaoDoutrinaria Service', () => {
  let service: FundamentacaoDoutrinariaService;
  let httpMock: HttpTestingController;
  let elemDefault: IFundamentacaoDoutrinaria;
  let expectedResult: IFundamentacaoDoutrinaria | IFundamentacaoDoutrinaria[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FundamentacaoDoutrinariaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      fundamentacaoDoutrinariaCitada: 'AAAAAAA',
      folhasFundamentacaoDoutrinaria: 'AAAAAAA',
      fundamentacaoDoutrinariaSugerida: 'AAAAAAA',
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

    it('should create a FundamentacaoDoutrinaria', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new FundamentacaoDoutrinaria()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FundamentacaoDoutrinaria', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          fundamentacaoDoutrinariaCitada: 'BBBBBB',
          folhasFundamentacaoDoutrinaria: 'BBBBBB',
          fundamentacaoDoutrinariaSugerida: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FundamentacaoDoutrinaria', () => {
      const patchObject = Object.assign(
        {
          fundamentacaoDoutrinariaCitada: 'BBBBBB',
          folhasFundamentacaoDoutrinaria: 'BBBBBB',
          fundamentacaoDoutrinariaSugerida: 'BBBBBB',
        },
        new FundamentacaoDoutrinaria()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FundamentacaoDoutrinaria', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          fundamentacaoDoutrinariaCitada: 'BBBBBB',
          folhasFundamentacaoDoutrinaria: 'BBBBBB',
          fundamentacaoDoutrinariaSugerida: 'BBBBBB',
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

    it('should delete a FundamentacaoDoutrinaria', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addFundamentacaoDoutrinariaToCollectionIfMissing', () => {
      it('should add a FundamentacaoDoutrinaria to an empty array', () => {
        const fundamentacaoDoutrinaria: IFundamentacaoDoutrinaria = { id: 123 };
        expectedResult = service.addFundamentacaoDoutrinariaToCollectionIfMissing([], fundamentacaoDoutrinaria);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fundamentacaoDoutrinaria);
      });

      it('should not add a FundamentacaoDoutrinaria to an array that contains it', () => {
        const fundamentacaoDoutrinaria: IFundamentacaoDoutrinaria = { id: 123 };
        const fundamentacaoDoutrinariaCollection: IFundamentacaoDoutrinaria[] = [
          {
            ...fundamentacaoDoutrinaria,
          },
          { id: 456 },
        ];
        expectedResult = service.addFundamentacaoDoutrinariaToCollectionIfMissing(
          fundamentacaoDoutrinariaCollection,
          fundamentacaoDoutrinaria
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FundamentacaoDoutrinaria to an array that doesn't contain it", () => {
        const fundamentacaoDoutrinaria: IFundamentacaoDoutrinaria = { id: 123 };
        const fundamentacaoDoutrinariaCollection: IFundamentacaoDoutrinaria[] = [{ id: 456 }];
        expectedResult = service.addFundamentacaoDoutrinariaToCollectionIfMissing(
          fundamentacaoDoutrinariaCollection,
          fundamentacaoDoutrinaria
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fundamentacaoDoutrinaria);
      });

      it('should add only unique FundamentacaoDoutrinaria to an array', () => {
        const fundamentacaoDoutrinariaArray: IFundamentacaoDoutrinaria[] = [{ id: 123 }, { id: 456 }, { id: 662 }];
        const fundamentacaoDoutrinariaCollection: IFundamentacaoDoutrinaria[] = [{ id: 123 }];
        expectedResult = service.addFundamentacaoDoutrinariaToCollectionIfMissing(
          fundamentacaoDoutrinariaCollection,
          ...fundamentacaoDoutrinariaArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fundamentacaoDoutrinaria: IFundamentacaoDoutrinaria = { id: 123 };
        const fundamentacaoDoutrinaria2: IFundamentacaoDoutrinaria = { id: 456 };
        expectedResult = service.addFundamentacaoDoutrinariaToCollectionIfMissing([], fundamentacaoDoutrinaria, fundamentacaoDoutrinaria2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fundamentacaoDoutrinaria);
        expect(expectedResult).toContain(fundamentacaoDoutrinaria2);
      });

      it('should accept null and undefined values', () => {
        const fundamentacaoDoutrinaria: IFundamentacaoDoutrinaria = { id: 123 };
        expectedResult = service.addFundamentacaoDoutrinariaToCollectionIfMissing([], null, fundamentacaoDoutrinaria, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fundamentacaoDoutrinaria);
      });

      it('should return initial array if no FundamentacaoDoutrinaria is added', () => {
        const fundamentacaoDoutrinariaCollection: IFundamentacaoDoutrinaria[] = [{ id: 123 }];
        expectedResult = service.addFundamentacaoDoutrinariaToCollectionIfMissing(fundamentacaoDoutrinariaCollection, undefined, null);
        expect(expectedResult).toEqual(fundamentacaoDoutrinariaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
