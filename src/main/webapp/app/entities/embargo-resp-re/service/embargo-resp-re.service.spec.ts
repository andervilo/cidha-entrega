import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEmbargoRespRe, EmbargoRespRe } from '../embargo-resp-re.model';

import { EmbargoRespReService } from './embargo-resp-re.service';

describe('EmbargoRespRe Service', () => {
  let service: EmbargoRespReService;
  let httpMock: HttpTestingController;
  let elemDefault: IEmbargoRespRe;
  let expectedResult: IEmbargoRespRe | IEmbargoRespRe[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EmbargoRespReService);
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

    it('should create a EmbargoRespRe', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new EmbargoRespRe()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EmbargoRespRe', () => {
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

    it('should partial update a EmbargoRespRe', () => {
      const patchObject = Object.assign(
        {
          descricao: 'BBBBBB',
        },
        new EmbargoRespRe()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EmbargoRespRe', () => {
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

    it('should delete a EmbargoRespRe', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addEmbargoRespReToCollectionIfMissing', () => {
      it('should add a EmbargoRespRe to an empty array', () => {
        const embargoRespRe: IEmbargoRespRe = { id: 123 };
        expectedResult = service.addEmbargoRespReToCollectionIfMissing([], embargoRespRe);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(embargoRespRe);
      });

      it('should not add a EmbargoRespRe to an array that contains it', () => {
        const embargoRespRe: IEmbargoRespRe = { id: 123 };
        const embargoRespReCollection: IEmbargoRespRe[] = [
          {
            ...embargoRespRe,
          },
          { id: 456 },
        ];
        expectedResult = service.addEmbargoRespReToCollectionIfMissing(embargoRespReCollection, embargoRespRe);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EmbargoRespRe to an array that doesn't contain it", () => {
        const embargoRespRe: IEmbargoRespRe = { id: 123 };
        const embargoRespReCollection: IEmbargoRespRe[] = [{ id: 456 }];
        expectedResult = service.addEmbargoRespReToCollectionIfMissing(embargoRespReCollection, embargoRespRe);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(embargoRespRe);
      });

      it('should add only unique EmbargoRespRe to an array', () => {
        const embargoRespReArray: IEmbargoRespRe[] = [{ id: 123 }, { id: 456 }, { id: 15917 }];
        const embargoRespReCollection: IEmbargoRespRe[] = [{ id: 123 }];
        expectedResult = service.addEmbargoRespReToCollectionIfMissing(embargoRespReCollection, ...embargoRespReArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const embargoRespRe: IEmbargoRespRe = { id: 123 };
        const embargoRespRe2: IEmbargoRespRe = { id: 456 };
        expectedResult = service.addEmbargoRespReToCollectionIfMissing([], embargoRespRe, embargoRespRe2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(embargoRespRe);
        expect(expectedResult).toContain(embargoRespRe2);
      });

      it('should accept null and undefined values', () => {
        const embargoRespRe: IEmbargoRespRe = { id: 123 };
        expectedResult = service.addEmbargoRespReToCollectionIfMissing([], null, embargoRespRe, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(embargoRespRe);
      });

      it('should return initial array if no EmbargoRespRe is added', () => {
        const embargoRespReCollection: IEmbargoRespRe[] = [{ id: 123 }];
        expectedResult = service.addEmbargoRespReToCollectionIfMissing(embargoRespReCollection, undefined, null);
        expect(expectedResult).toEqual(embargoRespReCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
