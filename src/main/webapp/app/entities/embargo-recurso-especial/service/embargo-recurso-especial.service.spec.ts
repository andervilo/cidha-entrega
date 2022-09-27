import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEmbargoRecursoEspecial, EmbargoRecursoEspecial } from '../embargo-recurso-especial.model';

import { EmbargoRecursoEspecialService } from './embargo-recurso-especial.service';

describe('EmbargoRecursoEspecial Service', () => {
  let service: EmbargoRecursoEspecialService;
  let httpMock: HttpTestingController;
  let elemDefault: IEmbargoRecursoEspecial;
  let expectedResult: IEmbargoRecursoEspecial | IEmbargoRecursoEspecial[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EmbargoRecursoEspecialService);
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

    it('should create a EmbargoRecursoEspecial', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new EmbargoRecursoEspecial()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EmbargoRecursoEspecial', () => {
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

    it('should partial update a EmbargoRecursoEspecial', () => {
      const patchObject = Object.assign({}, new EmbargoRecursoEspecial());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EmbargoRecursoEspecial', () => {
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

    it('should delete a EmbargoRecursoEspecial', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addEmbargoRecursoEspecialToCollectionIfMissing', () => {
      it('should add a EmbargoRecursoEspecial to an empty array', () => {
        const embargoRecursoEspecial: IEmbargoRecursoEspecial = { id: 123 };
        expectedResult = service.addEmbargoRecursoEspecialToCollectionIfMissing([], embargoRecursoEspecial);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(embargoRecursoEspecial);
      });

      it('should not add a EmbargoRecursoEspecial to an array that contains it', () => {
        const embargoRecursoEspecial: IEmbargoRecursoEspecial = { id: 123 };
        const embargoRecursoEspecialCollection: IEmbargoRecursoEspecial[] = [
          {
            ...embargoRecursoEspecial,
          },
          { id: 456 },
        ];
        expectedResult = service.addEmbargoRecursoEspecialToCollectionIfMissing(embargoRecursoEspecialCollection, embargoRecursoEspecial);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EmbargoRecursoEspecial to an array that doesn't contain it", () => {
        const embargoRecursoEspecial: IEmbargoRecursoEspecial = { id: 123 };
        const embargoRecursoEspecialCollection: IEmbargoRecursoEspecial[] = [{ id: 456 }];
        expectedResult = service.addEmbargoRecursoEspecialToCollectionIfMissing(embargoRecursoEspecialCollection, embargoRecursoEspecial);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(embargoRecursoEspecial);
      });

      it('should add only unique EmbargoRecursoEspecial to an array', () => {
        const embargoRecursoEspecialArray: IEmbargoRecursoEspecial[] = [{ id: 123 }, { id: 456 }, { id: 84705 }];
        const embargoRecursoEspecialCollection: IEmbargoRecursoEspecial[] = [{ id: 123 }];
        expectedResult = service.addEmbargoRecursoEspecialToCollectionIfMissing(
          embargoRecursoEspecialCollection,
          ...embargoRecursoEspecialArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const embargoRecursoEspecial: IEmbargoRecursoEspecial = { id: 123 };
        const embargoRecursoEspecial2: IEmbargoRecursoEspecial = { id: 456 };
        expectedResult = service.addEmbargoRecursoEspecialToCollectionIfMissing([], embargoRecursoEspecial, embargoRecursoEspecial2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(embargoRecursoEspecial);
        expect(expectedResult).toContain(embargoRecursoEspecial2);
      });

      it('should accept null and undefined values', () => {
        const embargoRecursoEspecial: IEmbargoRecursoEspecial = { id: 123 };
        expectedResult = service.addEmbargoRecursoEspecialToCollectionIfMissing([], null, embargoRecursoEspecial, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(embargoRecursoEspecial);
      });

      it('should return initial array if no EmbargoRecursoEspecial is added', () => {
        const embargoRecursoEspecialCollection: IEmbargoRecursoEspecial[] = [{ id: 123 }];
        expectedResult = service.addEmbargoRecursoEspecialToCollectionIfMissing(embargoRecursoEspecialCollection, undefined, null);
        expect(expectedResult).toEqual(embargoRecursoEspecialCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
