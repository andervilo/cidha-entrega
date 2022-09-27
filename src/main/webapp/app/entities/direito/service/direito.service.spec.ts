import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDireito, Direito } from '../direito.model';

import { DireitoService } from './direito.service';

describe('Direito Service', () => {
  let service: DireitoService;
  let httpMock: HttpTestingController;
  let elemDefault: IDireito;
  let expectedResult: IDireito | IDireito[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DireitoService);
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

    it('should create a Direito', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Direito()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Direito', () => {
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

    it('should partial update a Direito', () => {
      const patchObject = Object.assign(
        {
          descricao: 'BBBBBB',
        },
        new Direito()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Direito', () => {
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

    it('should delete a Direito', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDireitoToCollectionIfMissing', () => {
      it('should add a Direito to an empty array', () => {
        const direito: IDireito = { id: 123 };
        expectedResult = service.addDireitoToCollectionIfMissing([], direito);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(direito);
      });

      it('should not add a Direito to an array that contains it', () => {
        const direito: IDireito = { id: 123 };
        const direitoCollection: IDireito[] = [
          {
            ...direito,
          },
          { id: 456 },
        ];
        expectedResult = service.addDireitoToCollectionIfMissing(direitoCollection, direito);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Direito to an array that doesn't contain it", () => {
        const direito: IDireito = { id: 123 };
        const direitoCollection: IDireito[] = [{ id: 456 }];
        expectedResult = service.addDireitoToCollectionIfMissing(direitoCollection, direito);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(direito);
      });

      it('should add only unique Direito to an array', () => {
        const direitoArray: IDireito[] = [{ id: 123 }, { id: 456 }, { id: 13090 }];
        const direitoCollection: IDireito[] = [{ id: 123 }];
        expectedResult = service.addDireitoToCollectionIfMissing(direitoCollection, ...direitoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const direito: IDireito = { id: 123 };
        const direito2: IDireito = { id: 456 };
        expectedResult = service.addDireitoToCollectionIfMissing([], direito, direito2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(direito);
        expect(expectedResult).toContain(direito2);
      });

      it('should accept null and undefined values', () => {
        const direito: IDireito = { id: 123 };
        expectedResult = service.addDireitoToCollectionIfMissing([], null, direito, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(direito);
      });

      it('should return initial array if no Direito is added', () => {
        const direitoCollection: IDireito[] = [{ id: 123 }];
        expectedResult = service.addDireitoToCollectionIfMissing(direitoCollection, undefined, null);
        expect(expectedResult).toEqual(direitoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
