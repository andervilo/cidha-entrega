import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StatusProcesso } from 'app/entities/enumerations/status-processo.model';
import { IProcesso, Processo } from '../processo.model';

import { ProcessoService } from './processo.service';

describe('Processo Service', () => {
  let service: ProcessoService;
  let httpMock: HttpTestingController;
  let elemDefault: IProcesso;
  let expectedResult: IProcesso | IProcesso[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProcessoService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      numeroProcesso: 'AAAAAAA',
      oficio: 'AAAAAAA',
      assunto: 'AAAAAAA',
      linkUnico: 'AAAAAAA',
      linkTrf: 'AAAAAAA',
      turmaTrf1: 'AAAAAAA',
      numeroProcessoAdministrativo: 'AAAAAAA',
      numeroProcessoJudicialPrimeiraInstancia: 'AAAAAAA',
      numeroProcessoJudicialPrimeiraInstanciaLink: 'AAAAAAA',
      numeroProcessoJudicialPrimeiraInstanciaObservacoes: 'AAAAAAA',
      parecer: false,
      folhasProcessoConcessaoLiminar: 'AAAAAAA',
      concessaoLiminarObservacoes: 'AAAAAAA',
      folhasProcessoCassacao: 'AAAAAAA',
      folhasParecer: 'AAAAAAA',
      folhasEmbargo: 'AAAAAAA',
      acordaoEmbargo: 'AAAAAAA',
      folhasCienciaJulgEmbargos: 'AAAAAAA',
      apelacao: 'AAAAAAA',
      folhasApelacao: 'AAAAAAA',
      acordaoApelacao: 'AAAAAAA',
      folhasCienciaJulgApelacao: 'AAAAAAA',
      embargoDeclaracao: false,
      embargoRecursoExtraordinario: false,
      folhasRecursoEspecial: 'AAAAAAA',
      acordaoRecursoEspecial: 'AAAAAAA',
      folhasCienciaJulgamentoRecursoEspecial: 'AAAAAAA',
      embargoRecursoEspecial: false,
      folhasCiencia: 'AAAAAAA',
      agravoRespRe: 'AAAAAAA',
      folhasRespRe: 'AAAAAAA',
      acordaoAgravoRespRe: 'AAAAAAA',
      folhasCienciaJulgamentoAgravoRespRe: 'AAAAAAA',
      embargoRespRe: 'AAAAAAA',
      agravoInterno: 'AAAAAAA',
      folhasAgravoInterno: 'AAAAAAA',
      embargoRecursoAgravo: false,
      observacoes: 'AAAAAAA',
      recursoSTJ: false,
      linkRecursoSTJ: 'AAAAAAA',
      folhasRecursoSTJ: 'AAAAAAA',
      recursoSTF: false,
      linkRecursoSTF: 'AAAAAAA',
      folhasRecursoSTF: 'AAAAAAA',
      folhasMemorialMPF: 'AAAAAAA',
      execusaoProvisoria: false,
      numeracaoExecusaoProvisoria: 'AAAAAAA',
      recuperacaoEfetivaCumprimentoSentenca: 'AAAAAAA',
      recuperacaoEfetivaCumprimentoSentencaObservacoes: 'AAAAAAA',
      envolveEmpreendimento: false,
      envolveExploracaoIlegal: false,
      envolveTerraQuilombola: false,
      envolveTerraComunidadeTradicional: false,
      envolveTerraIndigena: false,
      resumoFatos: 'AAAAAAA',
      tamanhoArea: 0,
      valorArea: 0,
      tamanhoAreaObservacao: 'AAAAAAA',
      dadosGeograficosLitigioConflito: false,
      latitude: 'AAAAAAA',
      longitude: 'AAAAAAA',
      numeroProcessoMPF: 'AAAAAAA',
      numeroEmbargo: 'AAAAAAA',
      pautaApelacao: 'AAAAAAA',
      numeroRecursoEspecial: 'AAAAAAA',
      admissiblidade: 'AAAAAAA',
      envolveGrandeProjeto: false,
      envolveUnidadeConservacao: false,
      linkReferencia: 'AAAAAAA',
      statusProcesso: StatusProcesso.EM_ANDAMENTO,
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

    it('should create a Processo', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Processo()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Processo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          numeroProcesso: 'BBBBBB',
          oficio: 'BBBBBB',
          assunto: 'BBBBBB',
          linkUnico: 'BBBBBB',
          linkTrf: 'BBBBBB',
          turmaTrf1: 'BBBBBB',
          numeroProcessoAdministrativo: 'BBBBBB',
          numeroProcessoJudicialPrimeiraInstancia: 'BBBBBB',
          numeroProcessoJudicialPrimeiraInstanciaLink: 'BBBBBB',
          numeroProcessoJudicialPrimeiraInstanciaObservacoes: 'BBBBBB',
          parecer: true,
          folhasProcessoConcessaoLiminar: 'BBBBBB',
          concessaoLiminarObservacoes: 'BBBBBB',
          folhasProcessoCassacao: 'BBBBBB',
          folhasParecer: 'BBBBBB',
          folhasEmbargo: 'BBBBBB',
          acordaoEmbargo: 'BBBBBB',
          folhasCienciaJulgEmbargos: 'BBBBBB',
          apelacao: 'BBBBBB',
          folhasApelacao: 'BBBBBB',
          acordaoApelacao: 'BBBBBB',
          folhasCienciaJulgApelacao: 'BBBBBB',
          embargoDeclaracao: true,
          embargoRecursoExtraordinario: true,
          folhasRecursoEspecial: 'BBBBBB',
          acordaoRecursoEspecial: 'BBBBBB',
          folhasCienciaJulgamentoRecursoEspecial: 'BBBBBB',
          embargoRecursoEspecial: true,
          folhasCiencia: 'BBBBBB',
          agravoRespRe: 'BBBBBB',
          folhasRespRe: 'BBBBBB',
          acordaoAgravoRespRe: 'BBBBBB',
          folhasCienciaJulgamentoAgravoRespRe: 'BBBBBB',
          embargoRespRe: 'BBBBBB',
          agravoInterno: 'BBBBBB',
          folhasAgravoInterno: 'BBBBBB',
          embargoRecursoAgravo: true,
          observacoes: 'BBBBBB',
          recursoSTJ: true,
          linkRecursoSTJ: 'BBBBBB',
          folhasRecursoSTJ: 'BBBBBB',
          recursoSTF: true,
          linkRecursoSTF: 'BBBBBB',
          folhasRecursoSTF: 'BBBBBB',
          folhasMemorialMPF: 'BBBBBB',
          execusaoProvisoria: true,
          numeracaoExecusaoProvisoria: 'BBBBBB',
          recuperacaoEfetivaCumprimentoSentenca: 'BBBBBB',
          recuperacaoEfetivaCumprimentoSentencaObservacoes: 'BBBBBB',
          envolveEmpreendimento: true,
          envolveExploracaoIlegal: true,
          envolveTerraQuilombola: true,
          envolveTerraComunidadeTradicional: true,
          envolveTerraIndigena: true,
          resumoFatos: 'BBBBBB',
          tamanhoArea: 1,
          valorArea: 1,
          tamanhoAreaObservacao: 'BBBBBB',
          dadosGeograficosLitigioConflito: true,
          latitude: 'BBBBBB',
          longitude: 'BBBBBB',
          numeroProcessoMPF: 'BBBBBB',
          numeroEmbargo: 'BBBBBB',
          pautaApelacao: 'BBBBBB',
          numeroRecursoEspecial: 'BBBBBB',
          admissiblidade: 'BBBBBB',
          envolveGrandeProjeto: true,
          envolveUnidadeConservacao: true,
          linkReferencia: 'BBBBBB',
          statusProcesso: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Processo', () => {
      const patchObject = Object.assign(
        {
          numeroProcesso: 'BBBBBB',
          assunto: 'BBBBBB',
          linkUnico: 'BBBBBB',
          linkTrf: 'BBBBBB',
          numeroProcessoJudicialPrimeiraInstancia: 'BBBBBB',
          numeroProcessoJudicialPrimeiraInstanciaLink: 'BBBBBB',
          parecer: true,
          folhasProcessoConcessaoLiminar: 'BBBBBB',
          folhasProcessoCassacao: 'BBBBBB',
          folhasParecer: 'BBBBBB',
          folhasApelacao: 'BBBBBB',
          embargoRecursoExtraordinario: true,
          embargoRecursoEspecial: true,
          agravoRespRe: 'BBBBBB',
          folhasCienciaJulgamentoAgravoRespRe: 'BBBBBB',
          embargoRespRe: 'BBBBBB',
          recursoSTF: true,
          linkRecursoSTF: 'BBBBBB',
          folhasRecursoSTF: 'BBBBBB',
          folhasMemorialMPF: 'BBBBBB',
          execusaoProvisoria: true,
          numeracaoExecusaoProvisoria: 'BBBBBB',
          recuperacaoEfetivaCumprimentoSentenca: 'BBBBBB',
          recuperacaoEfetivaCumprimentoSentencaObservacoes: 'BBBBBB',
          envolveTerraQuilombola: true,
          envolveTerraIndigena: true,
          tamanhoArea: 1,
          tamanhoAreaObservacao: 'BBBBBB',
          dadosGeograficosLitigioConflito: true,
          numeroProcessoMPF: 'BBBBBB',
          numeroEmbargo: 'BBBBBB',
          numeroRecursoEspecial: 'BBBBBB',
          linkReferencia: 'BBBBBB',
          statusProcesso: 'BBBBBB',
        },
        new Processo()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Processo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          numeroProcesso: 'BBBBBB',
          oficio: 'BBBBBB',
          assunto: 'BBBBBB',
          linkUnico: 'BBBBBB',
          linkTrf: 'BBBBBB',
          turmaTrf1: 'BBBBBB',
          numeroProcessoAdministrativo: 'BBBBBB',
          numeroProcessoJudicialPrimeiraInstancia: 'BBBBBB',
          numeroProcessoJudicialPrimeiraInstanciaLink: 'BBBBBB',
          numeroProcessoJudicialPrimeiraInstanciaObservacoes: 'BBBBBB',
          parecer: true,
          folhasProcessoConcessaoLiminar: 'BBBBBB',
          concessaoLiminarObservacoes: 'BBBBBB',
          folhasProcessoCassacao: 'BBBBBB',
          folhasParecer: 'BBBBBB',
          folhasEmbargo: 'BBBBBB',
          acordaoEmbargo: 'BBBBBB',
          folhasCienciaJulgEmbargos: 'BBBBBB',
          apelacao: 'BBBBBB',
          folhasApelacao: 'BBBBBB',
          acordaoApelacao: 'BBBBBB',
          folhasCienciaJulgApelacao: 'BBBBBB',
          embargoDeclaracao: true,
          embargoRecursoExtraordinario: true,
          folhasRecursoEspecial: 'BBBBBB',
          acordaoRecursoEspecial: 'BBBBBB',
          folhasCienciaJulgamentoRecursoEspecial: 'BBBBBB',
          embargoRecursoEspecial: true,
          folhasCiencia: 'BBBBBB',
          agravoRespRe: 'BBBBBB',
          folhasRespRe: 'BBBBBB',
          acordaoAgravoRespRe: 'BBBBBB',
          folhasCienciaJulgamentoAgravoRespRe: 'BBBBBB',
          embargoRespRe: 'BBBBBB',
          agravoInterno: 'BBBBBB',
          folhasAgravoInterno: 'BBBBBB',
          embargoRecursoAgravo: true,
          observacoes: 'BBBBBB',
          recursoSTJ: true,
          linkRecursoSTJ: 'BBBBBB',
          folhasRecursoSTJ: 'BBBBBB',
          recursoSTF: true,
          linkRecursoSTF: 'BBBBBB',
          folhasRecursoSTF: 'BBBBBB',
          folhasMemorialMPF: 'BBBBBB',
          execusaoProvisoria: true,
          numeracaoExecusaoProvisoria: 'BBBBBB',
          recuperacaoEfetivaCumprimentoSentenca: 'BBBBBB',
          recuperacaoEfetivaCumprimentoSentencaObservacoes: 'BBBBBB',
          envolveEmpreendimento: true,
          envolveExploracaoIlegal: true,
          envolveTerraQuilombola: true,
          envolveTerraComunidadeTradicional: true,
          envolveTerraIndigena: true,
          resumoFatos: 'BBBBBB',
          tamanhoArea: 1,
          valorArea: 1,
          tamanhoAreaObservacao: 'BBBBBB',
          dadosGeograficosLitigioConflito: true,
          latitude: 'BBBBBB',
          longitude: 'BBBBBB',
          numeroProcessoMPF: 'BBBBBB',
          numeroEmbargo: 'BBBBBB',
          pautaApelacao: 'BBBBBB',
          numeroRecursoEspecial: 'BBBBBB',
          admissiblidade: 'BBBBBB',
          envolveGrandeProjeto: true,
          envolveUnidadeConservacao: true,
          linkReferencia: 'BBBBBB',
          statusProcesso: 'BBBBBB',
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

    it('should delete a Processo', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addProcessoToCollectionIfMissing', () => {
      it('should add a Processo to an empty array', () => {
        const processo: IProcesso = { id: 123 };
        expectedResult = service.addProcessoToCollectionIfMissing([], processo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(processo);
      });

      it('should not add a Processo to an array that contains it', () => {
        const processo: IProcesso = { id: 123 };
        const processoCollection: IProcesso[] = [
          {
            ...processo,
          },
          { id: 456 },
        ];
        expectedResult = service.addProcessoToCollectionIfMissing(processoCollection, processo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Processo to an array that doesn't contain it", () => {
        const processo: IProcesso = { id: 123 };
        const processoCollection: IProcesso[] = [{ id: 456 }];
        expectedResult = service.addProcessoToCollectionIfMissing(processoCollection, processo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(processo);
      });

      it('should add only unique Processo to an array', () => {
        const processoArray: IProcesso[] = [{ id: 123 }, { id: 456 }, { id: 45667 }];
        const processoCollection: IProcesso[] = [{ id: 123 }];
        expectedResult = service.addProcessoToCollectionIfMissing(processoCollection, ...processoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const processo: IProcesso = { id: 123 };
        const processo2: IProcesso = { id: 456 };
        expectedResult = service.addProcessoToCollectionIfMissing([], processo, processo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(processo);
        expect(expectedResult).toContain(processo2);
      });

      it('should accept null and undefined values', () => {
        const processo: IProcesso = { id: 123 };
        expectedResult = service.addProcessoToCollectionIfMissing([], null, processo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(processo);
      });

      it('should return initial array if no Processo is added', () => {
        const processoCollection: IProcesso[] = [{ id: 123 }];
        expectedResult = service.addProcessoToCollectionIfMissing(processoCollection, undefined, null);
        expect(expectedResult).toEqual(processoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
