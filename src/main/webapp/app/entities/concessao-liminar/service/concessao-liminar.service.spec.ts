import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IConcessaoLiminar, ConcessaoLiminar } from '../concessao-liminar.model';

import { ConcessaoLiminarService } from './concessao-liminar.service';

describe('ConcessaoLiminar Service', () => {
  let service: ConcessaoLiminarService;
  let httpMock: HttpTestingController;
  let elemDefault: IConcessaoLiminar;
  let expectedResult: IConcessaoLiminar | IConcessaoLiminar[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ConcessaoLiminarService);
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

    it('should create a ConcessaoLiminar', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ConcessaoLiminar()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ConcessaoLiminar', () => {
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

    it('should partial update a ConcessaoLiminar', () => {
      const patchObject = Object.assign(
        {
          descricao: 'BBBBBB',
        },
        new ConcessaoLiminar()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ConcessaoLiminar', () => {
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

    it('should delete a ConcessaoLiminar', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addConcessaoLiminarToCollectionIfMissing', () => {
      it('should add a ConcessaoLiminar to an empty array', () => {
        const concessaoLiminar: IConcessaoLiminar = { id: 123 };
        expectedResult = service.addConcessaoLiminarToCollectionIfMissing([], concessaoLiminar);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(concessaoLiminar);
      });

      it('should not add a ConcessaoLiminar to an array that contains it', () => {
        const concessaoLiminar: IConcessaoLiminar = { id: 123 };
        const concessaoLiminarCollection: IConcessaoLiminar[] = [
          {
            ...concessaoLiminar,
          },
          { id: 456 },
        ];
        expectedResult = service.addConcessaoLiminarToCollectionIfMissing(concessaoLiminarCollection, concessaoLiminar);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ConcessaoLiminar to an array that doesn't contain it", () => {
        const concessaoLiminar: IConcessaoLiminar = { id: 123 };
        const concessaoLiminarCollection: IConcessaoLiminar[] = [{ id: 456 }];
        expectedResult = service.addConcessaoLiminarToCollectionIfMissing(concessaoLiminarCollection, concessaoLiminar);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(concessaoLiminar);
      });

      it('should add only unique ConcessaoLiminar to an array', () => {
        const concessaoLiminarArray: IConcessaoLiminar[] = [{ id: 123 }, { id: 456 }, { id: 96292 }];
        const concessaoLiminarCollection: IConcessaoLiminar[] = [{ id: 123 }];
        expectedResult = service.addConcessaoLiminarToCollectionIfMissing(concessaoLiminarCollection, ...concessaoLiminarArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const concessaoLiminar: IConcessaoLiminar = { id: 123 };
        const concessaoLiminar2: IConcessaoLiminar = { id: 456 };
        expectedResult = service.addConcessaoLiminarToCollectionIfMissing([], concessaoLiminar, concessaoLiminar2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(concessaoLiminar);
        expect(expectedResult).toContain(concessaoLiminar2);
      });

      it('should accept null and undefined values', () => {
        const concessaoLiminar: IConcessaoLiminar = { id: 123 };
        expectedResult = service.addConcessaoLiminarToCollectionIfMissing([], null, concessaoLiminar, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(concessaoLiminar);
      });

      it('should return initial array if no ConcessaoLiminar is added', () => {
        const concessaoLiminarCollection: IConcessaoLiminar[] = [{ id: 123 }];
        expectedResult = service.addConcessaoLiminarToCollectionIfMissing(concessaoLiminarCollection, undefined, null);
        expect(expectedResult).toEqual(concessaoLiminarCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
