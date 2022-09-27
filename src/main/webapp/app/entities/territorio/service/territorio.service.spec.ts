import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITerritorio, Territorio } from '../territorio.model';

import { TerritorioService } from './territorio.service';

describe('Territorio Service', () => {
  let service: TerritorioService;
  let httpMock: HttpTestingController;
  let elemDefault: ITerritorio;
  let expectedResult: ITerritorio | ITerritorio[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TerritorioService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
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

    it('should create a Territorio', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Territorio()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Territorio', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
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

    it('should partial update a Territorio', () => {
      const patchObject = Object.assign(
        {
          nome: 'BBBBBB',
        },
        new Territorio()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Territorio', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
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

    it('should delete a Territorio', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTerritorioToCollectionIfMissing', () => {
      it('should add a Territorio to an empty array', () => {
        const territorio: ITerritorio = { id: 123 };
        expectedResult = service.addTerritorioToCollectionIfMissing([], territorio);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(territorio);
      });

      it('should not add a Territorio to an array that contains it', () => {
        const territorio: ITerritorio = { id: 123 };
        const territorioCollection: ITerritorio[] = [
          {
            ...territorio,
          },
          { id: 456 },
        ];
        expectedResult = service.addTerritorioToCollectionIfMissing(territorioCollection, territorio);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Territorio to an array that doesn't contain it", () => {
        const territorio: ITerritorio = { id: 123 };
        const territorioCollection: ITerritorio[] = [{ id: 456 }];
        expectedResult = service.addTerritorioToCollectionIfMissing(territorioCollection, territorio);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(territorio);
      });

      it('should add only unique Territorio to an array', () => {
        const territorioArray: ITerritorio[] = [{ id: 123 }, { id: 456 }, { id: 42281 }];
        const territorioCollection: ITerritorio[] = [{ id: 123 }];
        expectedResult = service.addTerritorioToCollectionIfMissing(territorioCollection, ...territorioArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const territorio: ITerritorio = { id: 123 };
        const territorio2: ITerritorio = { id: 456 };
        expectedResult = service.addTerritorioToCollectionIfMissing([], territorio, territorio2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(territorio);
        expect(expectedResult).toContain(territorio2);
      });

      it('should accept null and undefined values', () => {
        const territorio: ITerritorio = { id: 123 };
        expectedResult = service.addTerritorioToCollectionIfMissing([], null, territorio, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(territorio);
      });

      it('should return initial array if no Territorio is added', () => {
        const territorioCollection: ITerritorio[] = [{ id: 123 }];
        expectedResult = service.addTerritorioToCollectionIfMissing(territorioCollection, undefined, null);
        expect(expectedResult).toEqual(territorioCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
