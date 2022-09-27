import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEtniaIndigena, EtniaIndigena } from '../etnia-indigena.model';

import { EtniaIndigenaService } from './etnia-indigena.service';

describe('EtniaIndigena Service', () => {
  let service: EtniaIndigenaService;
  let httpMock: HttpTestingController;
  let elemDefault: IEtniaIndigena;
  let expectedResult: IEtniaIndigena | IEtniaIndigena[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EtniaIndigenaService);
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

    it('should create a EtniaIndigena', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new EtniaIndigena()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EtniaIndigena', () => {
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

    it('should partial update a EtniaIndigena', () => {
      const patchObject = Object.assign({}, new EtniaIndigena());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EtniaIndigena', () => {
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

    it('should delete a EtniaIndigena', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addEtniaIndigenaToCollectionIfMissing', () => {
      it('should add a EtniaIndigena to an empty array', () => {
        const etniaIndigena: IEtniaIndigena = { id: 123 };
        expectedResult = service.addEtniaIndigenaToCollectionIfMissing([], etniaIndigena);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(etniaIndigena);
      });

      it('should not add a EtniaIndigena to an array that contains it', () => {
        const etniaIndigena: IEtniaIndigena = { id: 123 };
        const etniaIndigenaCollection: IEtniaIndigena[] = [
          {
            ...etniaIndigena,
          },
          { id: 456 },
        ];
        expectedResult = service.addEtniaIndigenaToCollectionIfMissing(etniaIndigenaCollection, etniaIndigena);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EtniaIndigena to an array that doesn't contain it", () => {
        const etniaIndigena: IEtniaIndigena = { id: 123 };
        const etniaIndigenaCollection: IEtniaIndigena[] = [{ id: 456 }];
        expectedResult = service.addEtniaIndigenaToCollectionIfMissing(etniaIndigenaCollection, etniaIndigena);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(etniaIndigena);
      });

      it('should add only unique EtniaIndigena to an array', () => {
        const etniaIndigenaArray: IEtniaIndigena[] = [{ id: 123 }, { id: 456 }, { id: 13550 }];
        const etniaIndigenaCollection: IEtniaIndigena[] = [{ id: 123 }];
        expectedResult = service.addEtniaIndigenaToCollectionIfMissing(etniaIndigenaCollection, ...etniaIndigenaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const etniaIndigena: IEtniaIndigena = { id: 123 };
        const etniaIndigena2: IEtniaIndigena = { id: 456 };
        expectedResult = service.addEtniaIndigenaToCollectionIfMissing([], etniaIndigena, etniaIndigena2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(etniaIndigena);
        expect(expectedResult).toContain(etniaIndigena2);
      });

      it('should accept null and undefined values', () => {
        const etniaIndigena: IEtniaIndigena = { id: 123 };
        expectedResult = service.addEtniaIndigenaToCollectionIfMissing([], null, etniaIndigena, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(etniaIndigena);
      });

      it('should return initial array if no EtniaIndigena is added', () => {
        const etniaIndigenaCollection: IEtniaIndigena[] = [{ id: 123 }];
        expectedResult = service.addEtniaIndigenaToCollectionIfMissing(etniaIndigenaCollection, undefined, null);
        expect(expectedResult).toEqual(etniaIndigenaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
