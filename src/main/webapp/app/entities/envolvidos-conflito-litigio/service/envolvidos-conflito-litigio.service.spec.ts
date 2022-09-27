import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEnvolvidosConflitoLitigio, EnvolvidosConflitoLitigio } from '../envolvidos-conflito-litigio.model';

import { EnvolvidosConflitoLitigioService } from './envolvidos-conflito-litigio.service';

describe('EnvolvidosConflitoLitigio Service', () => {
  let service: EnvolvidosConflitoLitigioService;
  let httpMock: HttpTestingController;
  let elemDefault: IEnvolvidosConflitoLitigio;
  let expectedResult: IEnvolvidosConflitoLitigio | IEnvolvidosConflitoLitigio[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EnvolvidosConflitoLitigioService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      numeroIndividuos: 0,
      fonteInformacaoQtde: 'AAAAAAA',
      observacoes: 'AAAAAAA',
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

    it('should create a EnvolvidosConflitoLitigio', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new EnvolvidosConflitoLitigio()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EnvolvidosConflitoLitigio', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          numeroIndividuos: 1,
          fonteInformacaoQtde: 'BBBBBB',
          observacoes: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EnvolvidosConflitoLitigio', () => {
      const patchObject = Object.assign(
        {
          fonteInformacaoQtde: 'BBBBBB',
          observacoes: 'BBBBBB',
        },
        new EnvolvidosConflitoLitigio()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EnvolvidosConflitoLitigio', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          numeroIndividuos: 1,
          fonteInformacaoQtde: 'BBBBBB',
          observacoes: 'BBBBBB',
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

    it('should delete a EnvolvidosConflitoLitigio', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addEnvolvidosConflitoLitigioToCollectionIfMissing', () => {
      it('should add a EnvolvidosConflitoLitigio to an empty array', () => {
        const envolvidosConflitoLitigio: IEnvolvidosConflitoLitigio = { id: 123 };
        expectedResult = service.addEnvolvidosConflitoLitigioToCollectionIfMissing([], envolvidosConflitoLitigio);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(envolvidosConflitoLitigio);
      });

      it('should not add a EnvolvidosConflitoLitigio to an array that contains it', () => {
        const envolvidosConflitoLitigio: IEnvolvidosConflitoLitigio = { id: 123 };
        const envolvidosConflitoLitigioCollection: IEnvolvidosConflitoLitigio[] = [
          {
            ...envolvidosConflitoLitigio,
          },
          { id: 456 },
        ];
        expectedResult = service.addEnvolvidosConflitoLitigioToCollectionIfMissing(
          envolvidosConflitoLitigioCollection,
          envolvidosConflitoLitigio
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EnvolvidosConflitoLitigio to an array that doesn't contain it", () => {
        const envolvidosConflitoLitigio: IEnvolvidosConflitoLitigio = { id: 123 };
        const envolvidosConflitoLitigioCollection: IEnvolvidosConflitoLitigio[] = [{ id: 456 }];
        expectedResult = service.addEnvolvidosConflitoLitigioToCollectionIfMissing(
          envolvidosConflitoLitigioCollection,
          envolvidosConflitoLitigio
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(envolvidosConflitoLitigio);
      });

      it('should add only unique EnvolvidosConflitoLitigio to an array', () => {
        const envolvidosConflitoLitigioArray: IEnvolvidosConflitoLitigio[] = [{ id: 123 }, { id: 456 }, { id: 49672 }];
        const envolvidosConflitoLitigioCollection: IEnvolvidosConflitoLitigio[] = [{ id: 123 }];
        expectedResult = service.addEnvolvidosConflitoLitigioToCollectionIfMissing(
          envolvidosConflitoLitigioCollection,
          ...envolvidosConflitoLitigioArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const envolvidosConflitoLitigio: IEnvolvidosConflitoLitigio = { id: 123 };
        const envolvidosConflitoLitigio2: IEnvolvidosConflitoLitigio = { id: 456 };
        expectedResult = service.addEnvolvidosConflitoLitigioToCollectionIfMissing(
          [],
          envolvidosConflitoLitigio,
          envolvidosConflitoLitigio2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(envolvidosConflitoLitigio);
        expect(expectedResult).toContain(envolvidosConflitoLitigio2);
      });

      it('should accept null and undefined values', () => {
        const envolvidosConflitoLitigio: IEnvolvidosConflitoLitigio = { id: 123 };
        expectedResult = service.addEnvolvidosConflitoLitigioToCollectionIfMissing([], null, envolvidosConflitoLitigio, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(envolvidosConflitoLitigio);
      });

      it('should return initial array if no EnvolvidosConflitoLitigio is added', () => {
        const envolvidosConflitoLitigioCollection: IEnvolvidosConflitoLitigio[] = [{ id: 123 }];
        expectedResult = service.addEnvolvidosConflitoLitigioToCollectionIfMissing(envolvidosConflitoLitigioCollection, undefined, null);
        expect(expectedResult).toEqual(envolvidosConflitoLitigioCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
