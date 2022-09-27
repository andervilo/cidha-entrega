import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRepresentanteLegal, RepresentanteLegal } from '../representante-legal.model';

import { RepresentanteLegalService } from './representante-legal.service';

describe('RepresentanteLegal Service', () => {
  let service: RepresentanteLegalService;
  let httpMock: HttpTestingController;
  let elemDefault: IRepresentanteLegal;
  let expectedResult: IRepresentanteLegal | IRepresentanteLegal[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RepresentanteLegalService);
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

    it('should create a RepresentanteLegal', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new RepresentanteLegal()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RepresentanteLegal', () => {
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

    it('should partial update a RepresentanteLegal', () => {
      const patchObject = Object.assign(
        {
          nome: 'BBBBBB',
        },
        new RepresentanteLegal()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RepresentanteLegal', () => {
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

    it('should delete a RepresentanteLegal', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addRepresentanteLegalToCollectionIfMissing', () => {
      it('should add a RepresentanteLegal to an empty array', () => {
        const representanteLegal: IRepresentanteLegal = { id: 123 };
        expectedResult = service.addRepresentanteLegalToCollectionIfMissing([], representanteLegal);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(representanteLegal);
      });

      it('should not add a RepresentanteLegal to an array that contains it', () => {
        const representanteLegal: IRepresentanteLegal = { id: 123 };
        const representanteLegalCollection: IRepresentanteLegal[] = [
          {
            ...representanteLegal,
          },
          { id: 456 },
        ];
        expectedResult = service.addRepresentanteLegalToCollectionIfMissing(representanteLegalCollection, representanteLegal);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RepresentanteLegal to an array that doesn't contain it", () => {
        const representanteLegal: IRepresentanteLegal = { id: 123 };
        const representanteLegalCollection: IRepresentanteLegal[] = [{ id: 456 }];
        expectedResult = service.addRepresentanteLegalToCollectionIfMissing(representanteLegalCollection, representanteLegal);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(representanteLegal);
      });

      it('should add only unique RepresentanteLegal to an array', () => {
        const representanteLegalArray: IRepresentanteLegal[] = [{ id: 123 }, { id: 456 }, { id: 48455 }];
        const representanteLegalCollection: IRepresentanteLegal[] = [{ id: 123 }];
        expectedResult = service.addRepresentanteLegalToCollectionIfMissing(representanteLegalCollection, ...representanteLegalArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const representanteLegal: IRepresentanteLegal = { id: 123 };
        const representanteLegal2: IRepresentanteLegal = { id: 456 };
        expectedResult = service.addRepresentanteLegalToCollectionIfMissing([], representanteLegal, representanteLegal2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(representanteLegal);
        expect(expectedResult).toContain(representanteLegal2);
      });

      it('should accept null and undefined values', () => {
        const representanteLegal: IRepresentanteLegal = { id: 123 };
        expectedResult = service.addRepresentanteLegalToCollectionIfMissing([], null, representanteLegal, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(representanteLegal);
      });

      it('should return initial array if no RepresentanteLegal is added', () => {
        const representanteLegalCollection: IRepresentanteLegal[] = [{ id: 123 }];
        expectedResult = service.addRepresentanteLegalToCollectionIfMissing(representanteLegalCollection, undefined, null);
        expect(expectedResult).toEqual(representanteLegalCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
