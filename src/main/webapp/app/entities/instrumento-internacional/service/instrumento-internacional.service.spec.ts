import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IInstrumentoInternacional, InstrumentoInternacional } from '../instrumento-internacional.model';

import { InstrumentoInternacionalService } from './instrumento-internacional.service';

describe('InstrumentoInternacional Service', () => {
  let service: InstrumentoInternacionalService;
  let httpMock: HttpTestingController;
  let elemDefault: IInstrumentoInternacional;
  let expectedResult: IInstrumentoInternacional | IInstrumentoInternacional[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InstrumentoInternacionalService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      instrumentoInternacionalCitadoDescricao: 'AAAAAAA',
      folhasInstrumentoInternacional: 'AAAAAAA',
      instrumentoInternacionalSugerido: 'AAAAAAA',
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

    it('should create a InstrumentoInternacional', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new InstrumentoInternacional()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InstrumentoInternacional', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          instrumentoInternacionalCitadoDescricao: 'BBBBBB',
          folhasInstrumentoInternacional: 'BBBBBB',
          instrumentoInternacionalSugerido: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a InstrumentoInternacional', () => {
      const patchObject = Object.assign(
        {
          instrumentoInternacionalSugerido: 'BBBBBB',
        },
        new InstrumentoInternacional()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InstrumentoInternacional', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          instrumentoInternacionalCitadoDescricao: 'BBBBBB',
          folhasInstrumentoInternacional: 'BBBBBB',
          instrumentoInternacionalSugerido: 'BBBBBB',
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

    it('should delete a InstrumentoInternacional', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addInstrumentoInternacionalToCollectionIfMissing', () => {
      it('should add a InstrumentoInternacional to an empty array', () => {
        const instrumentoInternacional: IInstrumentoInternacional = { id: 123 };
        expectedResult = service.addInstrumentoInternacionalToCollectionIfMissing([], instrumentoInternacional);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(instrumentoInternacional);
      });

      it('should not add a InstrumentoInternacional to an array that contains it', () => {
        const instrumentoInternacional: IInstrumentoInternacional = { id: 123 };
        const instrumentoInternacionalCollection: IInstrumentoInternacional[] = [
          {
            ...instrumentoInternacional,
          },
          { id: 456 },
        ];
        expectedResult = service.addInstrumentoInternacionalToCollectionIfMissing(
          instrumentoInternacionalCollection,
          instrumentoInternacional
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InstrumentoInternacional to an array that doesn't contain it", () => {
        const instrumentoInternacional: IInstrumentoInternacional = { id: 123 };
        const instrumentoInternacionalCollection: IInstrumentoInternacional[] = [{ id: 456 }];
        expectedResult = service.addInstrumentoInternacionalToCollectionIfMissing(
          instrumentoInternacionalCollection,
          instrumentoInternacional
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(instrumentoInternacional);
      });

      it('should add only unique InstrumentoInternacional to an array', () => {
        const instrumentoInternacionalArray: IInstrumentoInternacional[] = [{ id: 123 }, { id: 456 }, { id: 56956 }];
        const instrumentoInternacionalCollection: IInstrumentoInternacional[] = [{ id: 123 }];
        expectedResult = service.addInstrumentoInternacionalToCollectionIfMissing(
          instrumentoInternacionalCollection,
          ...instrumentoInternacionalArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const instrumentoInternacional: IInstrumentoInternacional = { id: 123 };
        const instrumentoInternacional2: IInstrumentoInternacional = { id: 456 };
        expectedResult = service.addInstrumentoInternacionalToCollectionIfMissing([], instrumentoInternacional, instrumentoInternacional2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(instrumentoInternacional);
        expect(expectedResult).toContain(instrumentoInternacional2);
      });

      it('should accept null and undefined values', () => {
        const instrumentoInternacional: IInstrumentoInternacional = { id: 123 };
        expectedResult = service.addInstrumentoInternacionalToCollectionIfMissing([], null, instrumentoInternacional, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(instrumentoInternacional);
      });

      it('should return initial array if no InstrumentoInternacional is added', () => {
        const instrumentoInternacionalCollection: IInstrumentoInternacional[] = [{ id: 123 }];
        expectedResult = service.addInstrumentoInternacionalToCollectionIfMissing(instrumentoInternacionalCollection, undefined, null);
        expect(expectedResult).toEqual(instrumentoInternacionalCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
