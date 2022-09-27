import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IParteInteresssada, ParteInteresssada } from '../parte-interesssada.model';

import { ParteInteresssadaService } from './parte-interesssada.service';

describe('ParteInteresssada Service', () => {
  let service: ParteInteresssadaService;
  let httpMock: HttpTestingController;
  let elemDefault: IParteInteresssada;
  let expectedResult: IParteInteresssada | IParteInteresssada[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ParteInteresssadaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nome: 'AAAAAAA',
      classificacao: 'AAAAAAA',
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

    it('should create a ParteInteresssada', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ParteInteresssada()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ParteInteresssada', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          classificacao: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ParteInteresssada', () => {
      const patchObject = Object.assign(
        {
          nome: 'BBBBBB',
          classificacao: 'BBBBBB',
        },
        new ParteInteresssada()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ParteInteresssada', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          classificacao: 'BBBBBB',
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

    it('should delete a ParteInteresssada', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addParteInteresssadaToCollectionIfMissing', () => {
      it('should add a ParteInteresssada to an empty array', () => {
        const parteInteresssada: IParteInteresssada = { id: 123 };
        expectedResult = service.addParteInteresssadaToCollectionIfMissing([], parteInteresssada);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(parteInteresssada);
      });

      it('should not add a ParteInteresssada to an array that contains it', () => {
        const parteInteresssada: IParteInteresssada = { id: 123 };
        const parteInteresssadaCollection: IParteInteresssada[] = [
          {
            ...parteInteresssada,
          },
          { id: 456 },
        ];
        expectedResult = service.addParteInteresssadaToCollectionIfMissing(parteInteresssadaCollection, parteInteresssada);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ParteInteresssada to an array that doesn't contain it", () => {
        const parteInteresssada: IParteInteresssada = { id: 123 };
        const parteInteresssadaCollection: IParteInteresssada[] = [{ id: 456 }];
        expectedResult = service.addParteInteresssadaToCollectionIfMissing(parteInteresssadaCollection, parteInteresssada);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(parteInteresssada);
      });

      it('should add only unique ParteInteresssada to an array', () => {
        const parteInteresssadaArray: IParteInteresssada[] = [{ id: 123 }, { id: 456 }, { id: 58344 }];
        const parteInteresssadaCollection: IParteInteresssada[] = [{ id: 123 }];
        expectedResult = service.addParteInteresssadaToCollectionIfMissing(parteInteresssadaCollection, ...parteInteresssadaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const parteInteresssada: IParteInteresssada = { id: 123 };
        const parteInteresssada2: IParteInteresssada = { id: 456 };
        expectedResult = service.addParteInteresssadaToCollectionIfMissing([], parteInteresssada, parteInteresssada2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(parteInteresssada);
        expect(expectedResult).toContain(parteInteresssada2);
      });

      it('should accept null and undefined values', () => {
        const parteInteresssada: IParteInteresssada = { id: 123 };
        expectedResult = service.addParteInteresssadaToCollectionIfMissing([], null, parteInteresssada, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(parteInteresssada);
      });

      it('should return initial array if no ParteInteresssada is added', () => {
        const parteInteresssadaCollection: IParteInteresssada[] = [{ id: 123 }];
        expectedResult = service.addParteInteresssadaToCollectionIfMissing(parteInteresssadaCollection, undefined, null);
        expect(expectedResult).toEqual(parteInteresssadaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
