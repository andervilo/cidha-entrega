import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAtividadeExploracaoIlegal, AtividadeExploracaoIlegal } from '../atividade-exploracao-ilegal.model';

import { AtividadeExploracaoIlegalService } from './atividade-exploracao-ilegal.service';

describe('AtividadeExploracaoIlegal Service', () => {
  let service: AtividadeExploracaoIlegalService;
  let httpMock: HttpTestingController;
  let elemDefault: IAtividadeExploracaoIlegal;
  let expectedResult: IAtividadeExploracaoIlegal | IAtividadeExploracaoIlegal[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AtividadeExploracaoIlegalService);
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

    it('should create a AtividadeExploracaoIlegal', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new AtividadeExploracaoIlegal()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AtividadeExploracaoIlegal', () => {
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

    it('should partial update a AtividadeExploracaoIlegal', () => {
      const patchObject = Object.assign({}, new AtividadeExploracaoIlegal());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AtividadeExploracaoIlegal', () => {
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

    it('should delete a AtividadeExploracaoIlegal', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAtividadeExploracaoIlegalToCollectionIfMissing', () => {
      it('should add a AtividadeExploracaoIlegal to an empty array', () => {
        const atividadeExploracaoIlegal: IAtividadeExploracaoIlegal = { id: 123 };
        expectedResult = service.addAtividadeExploracaoIlegalToCollectionIfMissing([], atividadeExploracaoIlegal);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(atividadeExploracaoIlegal);
      });

      it('should not add a AtividadeExploracaoIlegal to an array that contains it', () => {
        const atividadeExploracaoIlegal: IAtividadeExploracaoIlegal = { id: 123 };
        const atividadeExploracaoIlegalCollection: IAtividadeExploracaoIlegal[] = [
          {
            ...atividadeExploracaoIlegal,
          },
          { id: 456 },
        ];
        expectedResult = service.addAtividadeExploracaoIlegalToCollectionIfMissing(
          atividadeExploracaoIlegalCollection,
          atividadeExploracaoIlegal
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AtividadeExploracaoIlegal to an array that doesn't contain it", () => {
        const atividadeExploracaoIlegal: IAtividadeExploracaoIlegal = { id: 123 };
        const atividadeExploracaoIlegalCollection: IAtividadeExploracaoIlegal[] = [{ id: 456 }];
        expectedResult = service.addAtividadeExploracaoIlegalToCollectionIfMissing(
          atividadeExploracaoIlegalCollection,
          atividadeExploracaoIlegal
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(atividadeExploracaoIlegal);
      });

      it('should add only unique AtividadeExploracaoIlegal to an array', () => {
        const atividadeExploracaoIlegalArray: IAtividadeExploracaoIlegal[] = [{ id: 123 }, { id: 456 }, { id: 17842 }];
        const atividadeExploracaoIlegalCollection: IAtividadeExploracaoIlegal[] = [{ id: 123 }];
        expectedResult = service.addAtividadeExploracaoIlegalToCollectionIfMissing(
          atividadeExploracaoIlegalCollection,
          ...atividadeExploracaoIlegalArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const atividadeExploracaoIlegal: IAtividadeExploracaoIlegal = { id: 123 };
        const atividadeExploracaoIlegal2: IAtividadeExploracaoIlegal = { id: 456 };
        expectedResult = service.addAtividadeExploracaoIlegalToCollectionIfMissing(
          [],
          atividadeExploracaoIlegal,
          atividadeExploracaoIlegal2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(atividadeExploracaoIlegal);
        expect(expectedResult).toContain(atividadeExploracaoIlegal2);
      });

      it('should accept null and undefined values', () => {
        const atividadeExploracaoIlegal: IAtividadeExploracaoIlegal = { id: 123 };
        expectedResult = service.addAtividadeExploracaoIlegalToCollectionIfMissing([], null, atividadeExploracaoIlegal, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(atividadeExploracaoIlegal);
      });

      it('should return initial array if no AtividadeExploracaoIlegal is added', () => {
        const atividadeExploracaoIlegalCollection: IAtividadeExploracaoIlegal[] = [{ id: 123 }];
        expectedResult = service.addAtividadeExploracaoIlegalToCollectionIfMissing(atividadeExploracaoIlegalCollection, undefined, null);
        expect(expectedResult).toEqual(atividadeExploracaoIlegalCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
