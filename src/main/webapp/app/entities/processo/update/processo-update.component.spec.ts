import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProcessoService } from '../service/processo.service';
import { IProcesso, Processo } from '../processo.model';
import { ITipoDecisao } from 'app/entities/tipo-decisao/tipo-decisao.model';
import { TipoDecisaoService } from 'app/entities/tipo-decisao/service/tipo-decisao.service';
import { ITipoEmpreendimento } from 'app/entities/tipo-empreendimento/tipo-empreendimento.model';
import { TipoEmpreendimentoService } from 'app/entities/tipo-empreendimento/service/tipo-empreendimento.service';
import { ISecaoJudiciaria } from 'app/entities/secao-judiciaria/secao-judiciaria.model';
import { SecaoJudiciariaService } from 'app/entities/secao-judiciaria/service/secao-judiciaria.service';
import { IComarca } from 'app/entities/comarca/comarca.model';
import { ComarcaService } from 'app/entities/comarca/service/comarca.service';
import { IMunicipio } from 'app/entities/municipio/municipio.model';
import { MunicipioService } from 'app/entities/municipio/service/municipio.service';
import { ITerritorio } from 'app/entities/territorio/territorio.model';
import { TerritorioService } from 'app/entities/territorio/service/territorio.service';
import { IAtividadeExploracaoIlegal } from 'app/entities/atividade-exploracao-ilegal/atividade-exploracao-ilegal.model';
import { AtividadeExploracaoIlegalService } from 'app/entities/atividade-exploracao-ilegal/service/atividade-exploracao-ilegal.service';
import { IUnidadeConservacao } from 'app/entities/unidade-conservacao/unidade-conservacao.model';
import { UnidadeConservacaoService } from 'app/entities/unidade-conservacao/service/unidade-conservacao.service';
import { IEnvolvidosConflitoLitigio } from 'app/entities/envolvidos-conflito-litigio/envolvidos-conflito-litigio.model';
import { EnvolvidosConflitoLitigioService } from 'app/entities/envolvidos-conflito-litigio/service/envolvidos-conflito-litigio.service';
import { ITerraIndigena } from 'app/entities/terra-indigena/terra-indigena.model';
import { TerraIndigenaService } from 'app/entities/terra-indigena/service/terra-indigena.service';
import { IProcessoConflito } from 'app/entities/processo-conflito/processo-conflito.model';
import { ProcessoConflitoService } from 'app/entities/processo-conflito/service/processo-conflito.service';
import { IParteInteresssada } from 'app/entities/parte-interesssada/parte-interesssada.model';
import { ParteInteresssadaService } from 'app/entities/parte-interesssada/service/parte-interesssada.service';
import { IRelator } from 'app/entities/relator/relator.model';
import { RelatorService } from 'app/entities/relator/service/relator.service';
import { IQuilombo } from 'app/entities/quilombo/quilombo.model';
import { QuilomboService } from 'app/entities/quilombo/service/quilombo.service';

import { ProcessoUpdateComponent } from './processo-update.component';

describe('Processo Management Update Component', () => {
  let comp: ProcessoUpdateComponent;
  let fixture: ComponentFixture<ProcessoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let processoService: ProcessoService;
  let tipoDecisaoService: TipoDecisaoService;
  let tipoEmpreendimentoService: TipoEmpreendimentoService;
  let secaoJudiciariaService: SecaoJudiciariaService;
  let comarcaService: ComarcaService;
  let municipioService: MunicipioService;
  let territorioService: TerritorioService;
  let atividadeExploracaoIlegalService: AtividadeExploracaoIlegalService;
  let unidadeConservacaoService: UnidadeConservacaoService;
  let envolvidosConflitoLitigioService: EnvolvidosConflitoLitigioService;
  let terraIndigenaService: TerraIndigenaService;
  let processoConflitoService: ProcessoConflitoService;
  let parteInteresssadaService: ParteInteresssadaService;
  let relatorService: RelatorService;
  let quilomboService: QuilomboService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProcessoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ProcessoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProcessoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    processoService = TestBed.inject(ProcessoService);
    tipoDecisaoService = TestBed.inject(TipoDecisaoService);
    tipoEmpreendimentoService = TestBed.inject(TipoEmpreendimentoService);
    secaoJudiciariaService = TestBed.inject(SecaoJudiciariaService);
    comarcaService = TestBed.inject(ComarcaService);
    municipioService = TestBed.inject(MunicipioService);
    territorioService = TestBed.inject(TerritorioService);
    atividadeExploracaoIlegalService = TestBed.inject(AtividadeExploracaoIlegalService);
    unidadeConservacaoService = TestBed.inject(UnidadeConservacaoService);
    envolvidosConflitoLitigioService = TestBed.inject(EnvolvidosConflitoLitigioService);
    terraIndigenaService = TestBed.inject(TerraIndigenaService);
    processoConflitoService = TestBed.inject(ProcessoConflitoService);
    parteInteresssadaService = TestBed.inject(ParteInteresssadaService);
    relatorService = TestBed.inject(RelatorService);
    quilomboService = TestBed.inject(QuilomboService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TipoDecisao query and add missing value', () => {
      const processo: IProcesso = { id: 456 };
      const tipoDecisao: ITipoDecisao = { id: 3857 };
      processo.tipoDecisao = tipoDecisao;

      const tipoDecisaoCollection: ITipoDecisao[] = [{ id: 34510 }];
      jest.spyOn(tipoDecisaoService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoDecisaoCollection })));
      const additionalTipoDecisaos = [tipoDecisao];
      const expectedCollection: ITipoDecisao[] = [...additionalTipoDecisaos, ...tipoDecisaoCollection];
      jest.spyOn(tipoDecisaoService, 'addTipoDecisaoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      expect(tipoDecisaoService.query).toHaveBeenCalled();
      expect(tipoDecisaoService.addTipoDecisaoToCollectionIfMissing).toHaveBeenCalledWith(tipoDecisaoCollection, ...additionalTipoDecisaos);
      expect(comp.tipoDecisaosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TipoEmpreendimento query and add missing value', () => {
      const processo: IProcesso = { id: 456 };
      const tipoEmpreendimento: ITipoEmpreendimento = { id: 75285 };
      processo.tipoEmpreendimento = tipoEmpreendimento;

      const tipoEmpreendimentoCollection: ITipoEmpreendimento[] = [{ id: 95859 }];
      jest.spyOn(tipoEmpreendimentoService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoEmpreendimentoCollection })));
      const additionalTipoEmpreendimentos = [tipoEmpreendimento];
      const expectedCollection: ITipoEmpreendimento[] = [...additionalTipoEmpreendimentos, ...tipoEmpreendimentoCollection];
      jest.spyOn(tipoEmpreendimentoService, 'addTipoEmpreendimentoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      expect(tipoEmpreendimentoService.query).toHaveBeenCalled();
      expect(tipoEmpreendimentoService.addTipoEmpreendimentoToCollectionIfMissing).toHaveBeenCalledWith(
        tipoEmpreendimentoCollection,
        ...additionalTipoEmpreendimentos
      );
      expect(comp.tipoEmpreendimentosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SecaoJudiciaria query and add missing value', () => {
      const processo: IProcesso = { id: 456 };
      const secaoJudiciaria: ISecaoJudiciaria = { id: 17315 };
      processo.secaoJudiciaria = secaoJudiciaria;

      const secaoJudiciariaCollection: ISecaoJudiciaria[] = [{ id: 6769 }];
      jest.spyOn(secaoJudiciariaService, 'query').mockReturnValue(of(new HttpResponse({ body: secaoJudiciariaCollection })));
      const additionalSecaoJudiciarias = [secaoJudiciaria];
      const expectedCollection: ISecaoJudiciaria[] = [...additionalSecaoJudiciarias, ...secaoJudiciariaCollection];
      jest.spyOn(secaoJudiciariaService, 'addSecaoJudiciariaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      expect(secaoJudiciariaService.query).toHaveBeenCalled();
      expect(secaoJudiciariaService.addSecaoJudiciariaToCollectionIfMissing).toHaveBeenCalledWith(
        secaoJudiciariaCollection,
        ...additionalSecaoJudiciarias
      );
      expect(comp.secaoJudiciariasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Comarca query and add missing value', () => {
      const processo: IProcesso = { id: 456 };
      const comarcas: IComarca[] = [{ id: 7527 }];
      processo.comarcas = comarcas;

      const comarcaCollection: IComarca[] = [{ id: 32078 }];
      jest.spyOn(comarcaService, 'query').mockReturnValue(of(new HttpResponse({ body: comarcaCollection })));
      const additionalComarcas = [...comarcas];
      const expectedCollection: IComarca[] = [...additionalComarcas, ...comarcaCollection];
      jest.spyOn(comarcaService, 'addComarcaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      expect(comarcaService.query).toHaveBeenCalled();
      expect(comarcaService.addComarcaToCollectionIfMissing).toHaveBeenCalledWith(comarcaCollection, ...additionalComarcas);
      expect(comp.comarcasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Municipio query and add missing value', () => {
      const processo: IProcesso = { id: 456 };
      const municipios: IMunicipio[] = [{ id: 85420 }];
      processo.municipios = municipios;

      const municipioCollection: IMunicipio[] = [{ id: 62881 }];
      jest.spyOn(municipioService, 'query').mockReturnValue(of(new HttpResponse({ body: municipioCollection })));
      const additionalMunicipios = [...municipios];
      const expectedCollection: IMunicipio[] = [...additionalMunicipios, ...municipioCollection];
      jest.spyOn(municipioService, 'addMunicipioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      expect(municipioService.query).toHaveBeenCalled();
      expect(municipioService.addMunicipioToCollectionIfMissing).toHaveBeenCalledWith(municipioCollection, ...additionalMunicipios);
      expect(comp.municipiosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Territorio query and add missing value', () => {
      const processo: IProcesso = { id: 456 };
      const territorios: ITerritorio[] = [{ id: 95899 }];
      processo.territorios = territorios;

      const territorioCollection: ITerritorio[] = [{ id: 46571 }];
      jest.spyOn(territorioService, 'query').mockReturnValue(of(new HttpResponse({ body: territorioCollection })));
      const additionalTerritorios = [...territorios];
      const expectedCollection: ITerritorio[] = [...additionalTerritorios, ...territorioCollection];
      jest.spyOn(territorioService, 'addTerritorioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      expect(territorioService.query).toHaveBeenCalled();
      expect(territorioService.addTerritorioToCollectionIfMissing).toHaveBeenCalledWith(territorioCollection, ...additionalTerritorios);
      expect(comp.territoriosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AtividadeExploracaoIlegal query and add missing value', () => {
      const processo: IProcesso = { id: 456 };
      const atividadeExploracaoIlegals: IAtividadeExploracaoIlegal[] = [{ id: 61900 }];
      processo.atividadeExploracaoIlegals = atividadeExploracaoIlegals;

      const atividadeExploracaoIlegalCollection: IAtividadeExploracaoIlegal[] = [{ id: 10180 }];
      jest
        .spyOn(atividadeExploracaoIlegalService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: atividadeExploracaoIlegalCollection })));
      const additionalAtividadeExploracaoIlegals = [...atividadeExploracaoIlegals];
      const expectedCollection: IAtividadeExploracaoIlegal[] = [
        ...additionalAtividadeExploracaoIlegals,
        ...atividadeExploracaoIlegalCollection,
      ];
      jest.spyOn(atividadeExploracaoIlegalService, 'addAtividadeExploracaoIlegalToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      expect(atividadeExploracaoIlegalService.query).toHaveBeenCalled();
      expect(atividadeExploracaoIlegalService.addAtividadeExploracaoIlegalToCollectionIfMissing).toHaveBeenCalledWith(
        atividadeExploracaoIlegalCollection,
        ...additionalAtividadeExploracaoIlegals
      );
      expect(comp.atividadeExploracaoIlegalsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UnidadeConservacao query and add missing value', () => {
      const processo: IProcesso = { id: 456 };
      const unidadeConservacaos: IUnidadeConservacao[] = [{ id: 21561 }];
      processo.unidadeConservacaos = unidadeConservacaos;

      const unidadeConservacaoCollection: IUnidadeConservacao[] = [{ id: 26125 }];
      jest.spyOn(unidadeConservacaoService, 'query').mockReturnValue(of(new HttpResponse({ body: unidadeConservacaoCollection })));
      const additionalUnidadeConservacaos = [...unidadeConservacaos];
      const expectedCollection: IUnidadeConservacao[] = [...additionalUnidadeConservacaos, ...unidadeConservacaoCollection];
      jest.spyOn(unidadeConservacaoService, 'addUnidadeConservacaoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      expect(unidadeConservacaoService.query).toHaveBeenCalled();
      expect(unidadeConservacaoService.addUnidadeConservacaoToCollectionIfMissing).toHaveBeenCalledWith(
        unidadeConservacaoCollection,
        ...additionalUnidadeConservacaos
      );
      expect(comp.unidadeConservacaosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call EnvolvidosConflitoLitigio query and add missing value', () => {
      const processo: IProcesso = { id: 456 };
      const envolvidosConflitoLitigios: IEnvolvidosConflitoLitigio[] = [{ id: 64962 }];
      processo.envolvidosConflitoLitigios = envolvidosConflitoLitigios;

      const envolvidosConflitoLitigioCollection: IEnvolvidosConflitoLitigio[] = [{ id: 17100 }];
      jest
        .spyOn(envolvidosConflitoLitigioService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: envolvidosConflitoLitigioCollection })));
      const additionalEnvolvidosConflitoLitigios = [...envolvidosConflitoLitigios];
      const expectedCollection: IEnvolvidosConflitoLitigio[] = [
        ...additionalEnvolvidosConflitoLitigios,
        ...envolvidosConflitoLitigioCollection,
      ];
      jest.spyOn(envolvidosConflitoLitigioService, 'addEnvolvidosConflitoLitigioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      expect(envolvidosConflitoLitigioService.query).toHaveBeenCalled();
      expect(envolvidosConflitoLitigioService.addEnvolvidosConflitoLitigioToCollectionIfMissing).toHaveBeenCalledWith(
        envolvidosConflitoLitigioCollection,
        ...additionalEnvolvidosConflitoLitigios
      );
      expect(comp.envolvidosConflitoLitigiosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TerraIndigena query and add missing value', () => {
      const processo: IProcesso = { id: 456 };
      const terraIndigenas: ITerraIndigena[] = [{ id: 91013 }];
      processo.terraIndigenas = terraIndigenas;

      const terraIndigenaCollection: ITerraIndigena[] = [{ id: 93649 }];
      jest.spyOn(terraIndigenaService, 'query').mockReturnValue(of(new HttpResponse({ body: terraIndigenaCollection })));
      const additionalTerraIndigenas = [...terraIndigenas];
      const expectedCollection: ITerraIndigena[] = [...additionalTerraIndigenas, ...terraIndigenaCollection];
      jest.spyOn(terraIndigenaService, 'addTerraIndigenaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      expect(terraIndigenaService.query).toHaveBeenCalled();
      expect(terraIndigenaService.addTerraIndigenaToCollectionIfMissing).toHaveBeenCalledWith(
        terraIndigenaCollection,
        ...additionalTerraIndigenas
      );
      expect(comp.terraIndigenasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ProcessoConflito query and add missing value', () => {
      const processo: IProcesso = { id: 456 };
      const processoConflitos: IProcessoConflito[] = [{ id: 16013 }];
      processo.processoConflitos = processoConflitos;

      const processoConflitoCollection: IProcessoConflito[] = [{ id: 75516 }];
      jest.spyOn(processoConflitoService, 'query').mockReturnValue(of(new HttpResponse({ body: processoConflitoCollection })));
      const additionalProcessoConflitos = [...processoConflitos];
      const expectedCollection: IProcessoConflito[] = [...additionalProcessoConflitos, ...processoConflitoCollection];
      jest.spyOn(processoConflitoService, 'addProcessoConflitoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      expect(processoConflitoService.query).toHaveBeenCalled();
      expect(processoConflitoService.addProcessoConflitoToCollectionIfMissing).toHaveBeenCalledWith(
        processoConflitoCollection,
        ...additionalProcessoConflitos
      );
      expect(comp.processoConflitosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ParteInteresssada query and add missing value', () => {
      const processo: IProcesso = { id: 456 };
      const parteInteresssadas: IParteInteresssada[] = [{ id: 36189 }];
      processo.parteInteresssadas = parteInteresssadas;

      const parteInteresssadaCollection: IParteInteresssada[] = [{ id: 60635 }];
      jest.spyOn(parteInteresssadaService, 'query').mockReturnValue(of(new HttpResponse({ body: parteInteresssadaCollection })));
      const additionalParteInteresssadas = [...parteInteresssadas];
      const expectedCollection: IParteInteresssada[] = [...additionalParteInteresssadas, ...parteInteresssadaCollection];
      jest.spyOn(parteInteresssadaService, 'addParteInteresssadaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      expect(parteInteresssadaService.query).toHaveBeenCalled();
      expect(parteInteresssadaService.addParteInteresssadaToCollectionIfMissing).toHaveBeenCalledWith(
        parteInteresssadaCollection,
        ...additionalParteInteresssadas
      );
      expect(comp.parteInteresssadasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Relator query and add missing value', () => {
      const processo: IProcesso = { id: 456 };
      const relators: IRelator[] = [{ id: 88116 }];
      processo.relators = relators;

      const relatorCollection: IRelator[] = [{ id: 46155 }];
      jest.spyOn(relatorService, 'query').mockReturnValue(of(new HttpResponse({ body: relatorCollection })));
      const additionalRelators = [...relators];
      const expectedCollection: IRelator[] = [...additionalRelators, ...relatorCollection];
      jest.spyOn(relatorService, 'addRelatorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      expect(relatorService.query).toHaveBeenCalled();
      expect(relatorService.addRelatorToCollectionIfMissing).toHaveBeenCalledWith(relatorCollection, ...additionalRelators);
      expect(comp.relatorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Quilombo query and add missing value', () => {
      const processo: IProcesso = { id: 456 };
      const quilombos: IQuilombo[] = [{ id: 50953 }];
      processo.quilombos = quilombos;

      const quilomboCollection: IQuilombo[] = [{ id: 25513 }];
      jest.spyOn(quilomboService, 'query').mockReturnValue(of(new HttpResponse({ body: quilomboCollection })));
      const additionalQuilombos = [...quilombos];
      const expectedCollection: IQuilombo[] = [...additionalQuilombos, ...quilomboCollection];
      jest.spyOn(quilomboService, 'addQuilomboToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      expect(quilomboService.query).toHaveBeenCalled();
      expect(quilomboService.addQuilomboToCollectionIfMissing).toHaveBeenCalledWith(quilomboCollection, ...additionalQuilombos);
      expect(comp.quilombosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const processo: IProcesso = { id: 456 };
      const tipoDecisao: ITipoDecisao = { id: 41955 };
      processo.tipoDecisao = tipoDecisao;
      const tipoEmpreendimento: ITipoEmpreendimento = { id: 40505 };
      processo.tipoEmpreendimento = tipoEmpreendimento;
      const secaoJudiciaria: ISecaoJudiciaria = { id: 88830 };
      processo.secaoJudiciaria = secaoJudiciaria;
      const comarcas: IComarca = { id: 75156 };
      processo.comarcas = [comarcas];
      const municipios: IMunicipio = { id: 36918 };
      processo.municipios = [municipios];
      const territorios: ITerritorio = { id: 61315 };
      processo.territorios = [territorios];
      const atividadeExploracaoIlegals: IAtividadeExploracaoIlegal = { id: 75438 };
      processo.atividadeExploracaoIlegals = [atividadeExploracaoIlegals];
      const unidadeConservacaos: IUnidadeConservacao = { id: 49051 };
      processo.unidadeConservacaos = [unidadeConservacaos];
      const envolvidosConflitoLitigios: IEnvolvidosConflitoLitigio = { id: 55626 };
      processo.envolvidosConflitoLitigios = [envolvidosConflitoLitigios];
      const terraIndigenas: ITerraIndigena = { id: 93585 };
      processo.terraIndigenas = [terraIndigenas];
      const processoConflitos: IProcessoConflito = { id: 8331 };
      processo.processoConflitos = [processoConflitos];
      const parteInteresssadas: IParteInteresssada = { id: 70395 };
      processo.parteInteresssadas = [parteInteresssadas];
      const relators: IRelator = { id: 59437 };
      processo.relators = [relators];
      const quilombos: IQuilombo = { id: 7909 };
      processo.quilombos = [quilombos];

      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(processo));
      expect(comp.tipoDecisaosSharedCollection).toContain(tipoDecisao);
      expect(comp.tipoEmpreendimentosSharedCollection).toContain(tipoEmpreendimento);
      expect(comp.secaoJudiciariasSharedCollection).toContain(secaoJudiciaria);
      expect(comp.comarcasSharedCollection).toContain(comarcas);
      expect(comp.municipiosSharedCollection).toContain(municipios);
      expect(comp.territoriosSharedCollection).toContain(territorios);
      expect(comp.atividadeExploracaoIlegalsSharedCollection).toContain(atividadeExploracaoIlegals);
      expect(comp.unidadeConservacaosSharedCollection).toContain(unidadeConservacaos);
      expect(comp.envolvidosConflitoLitigiosSharedCollection).toContain(envolvidosConflitoLitigios);
      expect(comp.terraIndigenasSharedCollection).toContain(terraIndigenas);
      expect(comp.processoConflitosSharedCollection).toContain(processoConflitos);
      expect(comp.parteInteresssadasSharedCollection).toContain(parteInteresssadas);
      expect(comp.relatorsSharedCollection).toContain(relators);
      expect(comp.quilombosSharedCollection).toContain(quilombos);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Processo>>();
      const processo = { id: 123 };
      jest.spyOn(processoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: processo }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(processoService.update).toHaveBeenCalledWith(processo);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Processo>>();
      const processo = new Processo();
      jest.spyOn(processoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: processo }));
      saveSubject.complete();

      // THEN
      expect(processoService.create).toHaveBeenCalledWith(processo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Processo>>();
      const processo = { id: 123 };
      jest.spyOn(processoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ processo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(processoService.update).toHaveBeenCalledWith(processo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackTipoDecisaoById', () => {
      it('Should return tracked TipoDecisao primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTipoDecisaoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackTipoEmpreendimentoById', () => {
      it('Should return tracked TipoEmpreendimento primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTipoEmpreendimentoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackSecaoJudiciariaById', () => {
      it('Should return tracked SecaoJudiciaria primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSecaoJudiciariaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackComarcaById', () => {
      it('Should return tracked Comarca primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackComarcaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackMunicipioById', () => {
      it('Should return tracked Municipio primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackMunicipioById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackTerritorioById', () => {
      it('Should return tracked Territorio primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTerritorioById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackAtividadeExploracaoIlegalById', () => {
      it('Should return tracked AtividadeExploracaoIlegal primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackAtividadeExploracaoIlegalById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackUnidadeConservacaoById', () => {
      it('Should return tracked UnidadeConservacao primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUnidadeConservacaoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackEnvolvidosConflitoLitigioById', () => {
      it('Should return tracked EnvolvidosConflitoLitigio primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEnvolvidosConflitoLitigioById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackTerraIndigenaById', () => {
      it('Should return tracked TerraIndigena primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTerraIndigenaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackProcessoConflitoById', () => {
      it('Should return tracked ProcessoConflito primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProcessoConflitoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackParteInteresssadaById', () => {
      it('Should return tracked ParteInteresssada primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackParteInteresssadaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackRelatorById', () => {
      it('Should return tracked Relator primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackRelatorById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackQuilomboById', () => {
      it('Should return tracked Quilombo primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackQuilomboById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedComarca', () => {
      it('Should return option if no Comarca is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedComarca(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Comarca for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedComarca(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Comarca is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedComarca(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedMunicipio', () => {
      it('Should return option if no Municipio is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedMunicipio(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Municipio for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedMunicipio(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Municipio is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedMunicipio(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedTerritorio', () => {
      it('Should return option if no Territorio is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedTerritorio(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Territorio for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedTerritorio(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Territorio is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedTerritorio(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedAtividadeExploracaoIlegal', () => {
      it('Should return option if no AtividadeExploracaoIlegal is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedAtividadeExploracaoIlegal(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected AtividadeExploracaoIlegal for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedAtividadeExploracaoIlegal(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this AtividadeExploracaoIlegal is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedAtividadeExploracaoIlegal(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedUnidadeConservacao', () => {
      it('Should return option if no UnidadeConservacao is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedUnidadeConservacao(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected UnidadeConservacao for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedUnidadeConservacao(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this UnidadeConservacao is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedUnidadeConservacao(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedEnvolvidosConflitoLitigio', () => {
      it('Should return option if no EnvolvidosConflitoLitigio is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedEnvolvidosConflitoLitigio(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected EnvolvidosConflitoLitigio for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedEnvolvidosConflitoLitigio(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this EnvolvidosConflitoLitigio is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedEnvolvidosConflitoLitigio(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedTerraIndigena', () => {
      it('Should return option if no TerraIndigena is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedTerraIndigena(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected TerraIndigena for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedTerraIndigena(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this TerraIndigena is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedTerraIndigena(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedProcessoConflito', () => {
      it('Should return option if no ProcessoConflito is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedProcessoConflito(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected ProcessoConflito for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedProcessoConflito(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this ProcessoConflito is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedProcessoConflito(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedParteInteresssada', () => {
      it('Should return option if no ParteInteresssada is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedParteInteresssada(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected ParteInteresssada for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedParteInteresssada(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this ParteInteresssada is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedParteInteresssada(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedRelator', () => {
      it('Should return option if no Relator is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedRelator(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Relator for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedRelator(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Relator is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedRelator(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedQuilombo', () => {
      it('Should return option if no Quilombo is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedQuilombo(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Quilombo for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedQuilombo(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Quilombo is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedQuilombo(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
