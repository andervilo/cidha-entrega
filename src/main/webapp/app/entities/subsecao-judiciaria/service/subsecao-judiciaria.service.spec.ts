import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISubsecaoJudiciaria, SubsecaoJudiciaria } from '../subsecao-judiciaria.model';

import { SubsecaoJudiciariaService } from './subsecao-judiciaria.service';

describe('SubsecaoJudiciaria Service', () => {
  let service: SubsecaoJudiciariaService;
  let httpMock: HttpTestingController;
  let elemDefault: ISubsecaoJudiciaria;
  let expectedResult: ISubsecaoJudiciaria | ISubsecaoJudiciaria[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SubsecaoJudiciariaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      sigla: 'AAAAAAA',
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

    it('should create a SubsecaoJudiciaria', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new SubsecaoJudiciaria()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SubsecaoJudiciaria', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          sigla: 'BBBBBB',
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

    it('should partial update a SubsecaoJudiciaria', () => {
      const patchObject = Object.assign(
        {
          sigla: 'BBBBBB',
          nome: 'BBBBBB',
        },
        new SubsecaoJudiciaria()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SubsecaoJudiciaria', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          sigla: 'BBBBBB',
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

    it('should delete a SubsecaoJudiciaria', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSubsecaoJudiciariaToCollectionIfMissing', () => {
      it('should add a SubsecaoJudiciaria to an empty array', () => {
        const subsecaoJudiciaria: ISubsecaoJudiciaria = { id: 123 };
        expectedResult = service.addSubsecaoJudiciariaToCollectionIfMissing([], subsecaoJudiciaria);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(subsecaoJudiciaria);
      });

      it('should not add a SubsecaoJudiciaria to an array that contains it', () => {
        const subsecaoJudiciaria: ISubsecaoJudiciaria = { id: 123 };
        const subsecaoJudiciariaCollection: ISubsecaoJudiciaria[] = [
          {
            ...subsecaoJudiciaria,
          },
          { id: 456 },
        ];
        expectedResult = service.addSubsecaoJudiciariaToCollectionIfMissing(subsecaoJudiciariaCollection, subsecaoJudiciaria);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SubsecaoJudiciaria to an array that doesn't contain it", () => {
        const subsecaoJudiciaria: ISubsecaoJudiciaria = { id: 123 };
        const subsecaoJudiciariaCollection: ISubsecaoJudiciaria[] = [{ id: 456 }];
        expectedResult = service.addSubsecaoJudiciariaToCollectionIfMissing(subsecaoJudiciariaCollection, subsecaoJudiciaria);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(subsecaoJudiciaria);
      });

      it('should add only unique SubsecaoJudiciaria to an array', () => {
        const subsecaoJudiciariaArray: ISubsecaoJudiciaria[] = [{ id: 123 }, { id: 456 }, { id: 35336 }];
        const subsecaoJudiciariaCollection: ISubsecaoJudiciaria[] = [{ id: 123 }];
        expectedResult = service.addSubsecaoJudiciariaToCollectionIfMissing(subsecaoJudiciariaCollection, ...subsecaoJudiciariaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const subsecaoJudiciaria: ISubsecaoJudiciaria = { id: 123 };
        const subsecaoJudiciaria2: ISubsecaoJudiciaria = { id: 456 };
        expectedResult = service.addSubsecaoJudiciariaToCollectionIfMissing([], subsecaoJudiciaria, subsecaoJudiciaria2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(subsecaoJudiciaria);
        expect(expectedResult).toContain(subsecaoJudiciaria2);
      });

      it('should accept null and undefined values', () => {
        const subsecaoJudiciaria: ISubsecaoJudiciaria = { id: 123 };
        expectedResult = service.addSubsecaoJudiciariaToCollectionIfMissing([], null, subsecaoJudiciaria, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(subsecaoJudiciaria);
      });

      it('should return initial array if no SubsecaoJudiciaria is added', () => {
        const subsecaoJudiciariaCollection: ISubsecaoJudiciaria[] = [{ id: 123 }];
        expectedResult = service.addSubsecaoJudiciariaToCollectionIfMissing(subsecaoJudiciariaCollection, undefined, null);
        expect(expectedResult).toEqual(subsecaoJudiciariaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
