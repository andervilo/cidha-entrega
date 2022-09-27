import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITerraIndigena, TerraIndigena } from '../terra-indigena.model';

import { TerraIndigenaService } from './terra-indigena.service';

describe('TerraIndigena Service', () => {
  let service: TerraIndigenaService;
  let httpMock: HttpTestingController;
  let elemDefault: ITerraIndigena;
  let expectedResult: ITerraIndigena | ITerraIndigena[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TerraIndigenaService);
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

    it('should create a TerraIndigena', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TerraIndigena()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TerraIndigena', () => {
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

    it('should partial update a TerraIndigena', () => {
      const patchObject = Object.assign({}, new TerraIndigena());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TerraIndigena', () => {
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

    it('should delete a TerraIndigena', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTerraIndigenaToCollectionIfMissing', () => {
      it('should add a TerraIndigena to an empty array', () => {
        const terraIndigena: ITerraIndigena = { id: 123 };
        expectedResult = service.addTerraIndigenaToCollectionIfMissing([], terraIndigena);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(terraIndigena);
      });

      it('should not add a TerraIndigena to an array that contains it', () => {
        const terraIndigena: ITerraIndigena = { id: 123 };
        const terraIndigenaCollection: ITerraIndigena[] = [
          {
            ...terraIndigena,
          },
          { id: 456 },
        ];
        expectedResult = service.addTerraIndigenaToCollectionIfMissing(terraIndigenaCollection, terraIndigena);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TerraIndigena to an array that doesn't contain it", () => {
        const terraIndigena: ITerraIndigena = { id: 123 };
        const terraIndigenaCollection: ITerraIndigena[] = [{ id: 456 }];
        expectedResult = service.addTerraIndigenaToCollectionIfMissing(terraIndigenaCollection, terraIndigena);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(terraIndigena);
      });

      it('should add only unique TerraIndigena to an array', () => {
        const terraIndigenaArray: ITerraIndigena[] = [{ id: 123 }, { id: 456 }, { id: 89230 }];
        const terraIndigenaCollection: ITerraIndigena[] = [{ id: 123 }];
        expectedResult = service.addTerraIndigenaToCollectionIfMissing(terraIndigenaCollection, ...terraIndigenaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const terraIndigena: ITerraIndigena = { id: 123 };
        const terraIndigena2: ITerraIndigena = { id: 456 };
        expectedResult = service.addTerraIndigenaToCollectionIfMissing([], terraIndigena, terraIndigena2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(terraIndigena);
        expect(expectedResult).toContain(terraIndigena2);
      });

      it('should accept null and undefined values', () => {
        const terraIndigena: ITerraIndigena = { id: 123 };
        expectedResult = service.addTerraIndigenaToCollectionIfMissing([], null, terraIndigena, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(terraIndigena);
      });

      it('should return initial array if no TerraIndigena is added', () => {
        const terraIndigenaCollection: ITerraIndigena[] = [{ id: 123 }];
        expectedResult = service.addTerraIndigenaToCollectionIfMissing(terraIndigenaCollection, undefined, null);
        expect(expectedResult).toEqual(terraIndigenaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
