import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IJurisprudencia, Jurisprudencia } from '../jurisprudencia.model';

import { JurisprudenciaService } from './jurisprudencia.service';

describe('Jurisprudencia Service', () => {
  let service: JurisprudenciaService;
  let httpMock: HttpTestingController;
  let elemDefault: IJurisprudencia;
  let expectedResult: IJurisprudencia | IJurisprudencia[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(JurisprudenciaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      jurisprudenciaCitadaDescricao: 'AAAAAAA',
      folhasJurisprudenciaCitada: 'AAAAAAA',
      jurisprudenciaSugerida: 'AAAAAAA',
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

    it('should create a Jurisprudencia', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Jurisprudencia()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Jurisprudencia', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          jurisprudenciaCitadaDescricao: 'BBBBBB',
          folhasJurisprudenciaCitada: 'BBBBBB',
          jurisprudenciaSugerida: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Jurisprudencia', () => {
      const patchObject = Object.assign(
        {
          folhasJurisprudenciaCitada: 'BBBBBB',
          jurisprudenciaSugerida: 'BBBBBB',
        },
        new Jurisprudencia()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Jurisprudencia', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          jurisprudenciaCitadaDescricao: 'BBBBBB',
          folhasJurisprudenciaCitada: 'BBBBBB',
          jurisprudenciaSugerida: 'BBBBBB',
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

    it('should delete a Jurisprudencia', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addJurisprudenciaToCollectionIfMissing', () => {
      it('should add a Jurisprudencia to an empty array', () => {
        const jurisprudencia: IJurisprudencia = { id: 123 };
        expectedResult = service.addJurisprudenciaToCollectionIfMissing([], jurisprudencia);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(jurisprudencia);
      });

      it('should not add a Jurisprudencia to an array that contains it', () => {
        const jurisprudencia: IJurisprudencia = { id: 123 };
        const jurisprudenciaCollection: IJurisprudencia[] = [
          {
            ...jurisprudencia,
          },
          { id: 456 },
        ];
        expectedResult = service.addJurisprudenciaToCollectionIfMissing(jurisprudenciaCollection, jurisprudencia);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Jurisprudencia to an array that doesn't contain it", () => {
        const jurisprudencia: IJurisprudencia = { id: 123 };
        const jurisprudenciaCollection: IJurisprudencia[] = [{ id: 456 }];
        expectedResult = service.addJurisprudenciaToCollectionIfMissing(jurisprudenciaCollection, jurisprudencia);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(jurisprudencia);
      });

      it('should add only unique Jurisprudencia to an array', () => {
        const jurisprudenciaArray: IJurisprudencia[] = [{ id: 123 }, { id: 456 }, { id: 83320 }];
        const jurisprudenciaCollection: IJurisprudencia[] = [{ id: 123 }];
        expectedResult = service.addJurisprudenciaToCollectionIfMissing(jurisprudenciaCollection, ...jurisprudenciaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const jurisprudencia: IJurisprudencia = { id: 123 };
        const jurisprudencia2: IJurisprudencia = { id: 456 };
        expectedResult = service.addJurisprudenciaToCollectionIfMissing([], jurisprudencia, jurisprudencia2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(jurisprudencia);
        expect(expectedResult).toContain(jurisprudencia2);
      });

      it('should accept null and undefined values', () => {
        const jurisprudencia: IJurisprudencia = { id: 123 };
        expectedResult = service.addJurisprudenciaToCollectionIfMissing([], null, jurisprudencia, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(jurisprudencia);
      });

      it('should return initial array if no Jurisprudencia is added', () => {
        const jurisprudenciaCollection: IJurisprudencia[] = [{ id: 123 }];
        expectedResult = service.addJurisprudenciaToCollectionIfMissing(jurisprudenciaCollection, undefined, null);
        expect(expectedResult).toEqual(jurisprudenciaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
