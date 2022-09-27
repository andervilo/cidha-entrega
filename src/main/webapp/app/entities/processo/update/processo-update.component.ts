import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProcesso, Processo } from '../processo.model';
import { ProcessoService } from '../service/processo.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
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
import { StatusProcesso } from 'app/entities/enumerations/status-processo.model';

@Component({
  selector: 'jhi-processo-update',
  templateUrl: './processo-update.component.html',
})
export class ProcessoUpdateComponent implements OnInit {
  isSaving = false;
  statusProcessoValues = Object.keys(StatusProcesso);

  tipoDecisaosSharedCollection: ITipoDecisao[] = [];
  tipoEmpreendimentosSharedCollection: ITipoEmpreendimento[] = [];
  secaoJudiciariasSharedCollection: ISecaoJudiciaria[] = [];
  comarcasSharedCollection: IComarca[] = [];
  municipiosSharedCollection: IMunicipio[] = [];
  territoriosSharedCollection: ITerritorio[] = [];
  atividadeExploracaoIlegalsSharedCollection: IAtividadeExploracaoIlegal[] = [];
  unidadeConservacaosSharedCollection: IUnidadeConservacao[] = [];
  envolvidosConflitoLitigiosSharedCollection: IEnvolvidosConflitoLitigio[] = [];
  terraIndigenasSharedCollection: ITerraIndigena[] = [];
  processoConflitosSharedCollection: IProcessoConflito[] = [];
  parteInteresssadasSharedCollection: IParteInteresssada[] = [];
  relatorsSharedCollection: IRelator[] = [];
  quilombosSharedCollection: IQuilombo[] = [];

  editForm = this.fb.group({
    id: [],
    numeroProcesso: [],
    oficio: [],
    assunto: [],
    linkUnico: [],
    linkTrf: [],
    turmaTrf1: [],
    numeroProcessoAdministrativo: [],
    numeroProcessoJudicialPrimeiraInstancia: [],
    numeroProcessoJudicialPrimeiraInstanciaLink: [],
    numeroProcessoJudicialPrimeiraInstanciaObservacoes: [],
    parecer: [],
    folhasProcessoConcessaoLiminar: [],
    concessaoLiminarObservacoes: [],
    folhasProcessoCassacao: [],
    folhasParecer: [],
    folhasEmbargo: [],
    acordaoEmbargo: [],
    folhasCienciaJulgEmbargos: [],
    apelacao: [],
    folhasApelacao: [],
    acordaoApelacao: [],
    folhasCienciaJulgApelacao: [],
    embargoDeclaracao: [],
    embargoRecursoExtraordinario: [],
    folhasRecursoEspecial: [],
    acordaoRecursoEspecial: [],
    folhasCienciaJulgamentoRecursoEspecial: [],
    embargoRecursoEspecial: [],
    folhasCiencia: [],
    agravoRespRe: [],
    folhasRespRe: [],
    acordaoAgravoRespRe: [],
    folhasCienciaJulgamentoAgravoRespRe: [],
    embargoRespRe: [],
    agravoInterno: [],
    folhasAgravoInterno: [],
    embargoRecursoAgravo: [],
    observacoes: [],
    recursoSTJ: [],
    linkRecursoSTJ: [],
    folhasRecursoSTJ: [],
    recursoSTF: [],
    linkRecursoSTF: [],
    folhasRecursoSTF: [],
    folhasMemorialMPF: [],
    execusaoProvisoria: [],
    numeracaoExecusaoProvisoria: [],
    recuperacaoEfetivaCumprimentoSentenca: [],
    recuperacaoEfetivaCumprimentoSentencaObservacoes: [],
    envolveEmpreendimento: [],
    envolveExploracaoIlegal: [],
    envolveTerraQuilombola: [],
    envolveTerraComunidadeTradicional: [],
    envolveTerraIndigena: [],
    resumoFatos: [],
    tamanhoArea: [],
    valorArea: [],
    tamanhoAreaObservacao: [],
    dadosGeograficosLitigioConflito: [],
    latitude: [],
    longitude: [],
    numeroProcessoMPF: [],
    numeroEmbargo: [],
    pautaApelacao: [],
    numeroRecursoEspecial: [],
    admissiblidade: [],
    envolveGrandeProjeto: [],
    envolveUnidadeConservacao: [],
    linkReferencia: [],
    statusProcesso: [],
    tipoDecisao: [],
    tipoEmpreendimento: [],
    secaoJudiciaria: [],
    comarcas: [],
    municipios: [],
    territorios: [],
    atividadeExploracaoIlegals: [],
    unidadeConservacaos: [],
    envolvidosConflitoLitigios: [],
    terraIndigenas: [],
    processoConflitos: [],
    parteInteresssadas: [],
    relators: [],
    quilombos: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected processoService: ProcessoService,
    protected tipoDecisaoService: TipoDecisaoService,
    protected tipoEmpreendimentoService: TipoEmpreendimentoService,
    protected secaoJudiciariaService: SecaoJudiciariaService,
    protected comarcaService: ComarcaService,
    protected municipioService: MunicipioService,
    protected territorioService: TerritorioService,
    protected atividadeExploracaoIlegalService: AtividadeExploracaoIlegalService,
    protected unidadeConservacaoService: UnidadeConservacaoService,
    protected envolvidosConflitoLitigioService: EnvolvidosConflitoLitigioService,
    protected terraIndigenaService: TerraIndigenaService,
    protected processoConflitoService: ProcessoConflitoService,
    protected parteInteresssadaService: ParteInteresssadaService,
    protected relatorService: RelatorService,
    protected quilomboService: QuilomboService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ processo }) => {
      this.updateForm(processo);

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('cidhaApp.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const processo = this.createFromForm();
    if (processo.id !== undefined) {
      this.subscribeToSaveResponse(this.processoService.update(processo));
    } else {
      this.subscribeToSaveResponse(this.processoService.create(processo));
    }
  }

  trackTipoDecisaoById(_index: number, item: ITipoDecisao): number {
    return item.id!;
  }

  trackTipoEmpreendimentoById(_index: number, item: ITipoEmpreendimento): number {
    return item.id!;
  }

  trackSecaoJudiciariaById(_index: number, item: ISecaoJudiciaria): number {
    return item.id!;
  }

  trackComarcaById(_index: number, item: IComarca): number {
    return item.id!;
  }

  trackMunicipioById(_index: number, item: IMunicipio): number {
    return item.id!;
  }

  trackTerritorioById(_index: number, item: ITerritorio): number {
    return item.id!;
  }

  trackAtividadeExploracaoIlegalById(_index: number, item: IAtividadeExploracaoIlegal): number {
    return item.id!;
  }

  trackUnidadeConservacaoById(_index: number, item: IUnidadeConservacao): number {
    return item.id!;
  }

  trackEnvolvidosConflitoLitigioById(_index: number, item: IEnvolvidosConflitoLitigio): number {
    return item.id!;
  }

  trackTerraIndigenaById(_index: number, item: ITerraIndigena): number {
    return item.id!;
  }

  trackProcessoConflitoById(_index: number, item: IProcessoConflito): number {
    return item.id!;
  }

  trackParteInteresssadaById(_index: number, item: IParteInteresssada): number {
    return item.id!;
  }

  trackRelatorById(_index: number, item: IRelator): number {
    return item.id!;
  }

  trackQuilomboById(_index: number, item: IQuilombo): number {
    return item.id!;
  }

  getSelectedComarca(option: IComarca, selectedVals?: IComarca[]): IComarca {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedMunicipio(option: IMunicipio, selectedVals?: IMunicipio[]): IMunicipio {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedTerritorio(option: ITerritorio, selectedVals?: ITerritorio[]): ITerritorio {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedAtividadeExploracaoIlegal(
    option: IAtividadeExploracaoIlegal,
    selectedVals?: IAtividadeExploracaoIlegal[]
  ): IAtividadeExploracaoIlegal {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedUnidadeConservacao(option: IUnidadeConservacao, selectedVals?: IUnidadeConservacao[]): IUnidadeConservacao {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedEnvolvidosConflitoLitigio(
    option: IEnvolvidosConflitoLitigio,
    selectedVals?: IEnvolvidosConflitoLitigio[]
  ): IEnvolvidosConflitoLitigio {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedTerraIndigena(option: ITerraIndigena, selectedVals?: ITerraIndigena[]): ITerraIndigena {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedProcessoConflito(option: IProcessoConflito, selectedVals?: IProcessoConflito[]): IProcessoConflito {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedParteInteresssada(option: IParteInteresssada, selectedVals?: IParteInteresssada[]): IParteInteresssada {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedRelator(option: IRelator, selectedVals?: IRelator[]): IRelator {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedQuilombo(option: IQuilombo, selectedVals?: IQuilombo[]): IQuilombo {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProcesso>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(processo: IProcesso): void {
    this.editForm.patchValue({
      id: processo.id,
      numeroProcesso: processo.numeroProcesso,
      oficio: processo.oficio,
      assunto: processo.assunto,
      linkUnico: processo.linkUnico,
      linkTrf: processo.linkTrf,
      turmaTrf1: processo.turmaTrf1,
      numeroProcessoAdministrativo: processo.numeroProcessoAdministrativo,
      numeroProcessoJudicialPrimeiraInstancia: processo.numeroProcessoJudicialPrimeiraInstancia,
      numeroProcessoJudicialPrimeiraInstanciaLink: processo.numeroProcessoJudicialPrimeiraInstanciaLink,
      numeroProcessoJudicialPrimeiraInstanciaObservacoes: processo.numeroProcessoJudicialPrimeiraInstanciaObservacoes,
      parecer: processo.parecer,
      folhasProcessoConcessaoLiminar: processo.folhasProcessoConcessaoLiminar,
      concessaoLiminarObservacoes: processo.concessaoLiminarObservacoes,
      folhasProcessoCassacao: processo.folhasProcessoCassacao,
      folhasParecer: processo.folhasParecer,
      folhasEmbargo: processo.folhasEmbargo,
      acordaoEmbargo: processo.acordaoEmbargo,
      folhasCienciaJulgEmbargos: processo.folhasCienciaJulgEmbargos,
      apelacao: processo.apelacao,
      folhasApelacao: processo.folhasApelacao,
      acordaoApelacao: processo.acordaoApelacao,
      folhasCienciaJulgApelacao: processo.folhasCienciaJulgApelacao,
      embargoDeclaracao: processo.embargoDeclaracao,
      embargoRecursoExtraordinario: processo.embargoRecursoExtraordinario,
      folhasRecursoEspecial: processo.folhasRecursoEspecial,
      acordaoRecursoEspecial: processo.acordaoRecursoEspecial,
      folhasCienciaJulgamentoRecursoEspecial: processo.folhasCienciaJulgamentoRecursoEspecial,
      embargoRecursoEspecial: processo.embargoRecursoEspecial,
      folhasCiencia: processo.folhasCiencia,
      agravoRespRe: processo.agravoRespRe,
      folhasRespRe: processo.folhasRespRe,
      acordaoAgravoRespRe: processo.acordaoAgravoRespRe,
      folhasCienciaJulgamentoAgravoRespRe: processo.folhasCienciaJulgamentoAgravoRespRe,
      embargoRespRe: processo.embargoRespRe,
      agravoInterno: processo.agravoInterno,
      folhasAgravoInterno: processo.folhasAgravoInterno,
      embargoRecursoAgravo: processo.embargoRecursoAgravo,
      observacoes: processo.observacoes,
      recursoSTJ: processo.recursoSTJ,
      linkRecursoSTJ: processo.linkRecursoSTJ,
      folhasRecursoSTJ: processo.folhasRecursoSTJ,
      recursoSTF: processo.recursoSTF,
      linkRecursoSTF: processo.linkRecursoSTF,
      folhasRecursoSTF: processo.folhasRecursoSTF,
      folhasMemorialMPF: processo.folhasMemorialMPF,
      execusaoProvisoria: processo.execusaoProvisoria,
      numeracaoExecusaoProvisoria: processo.numeracaoExecusaoProvisoria,
      recuperacaoEfetivaCumprimentoSentenca: processo.recuperacaoEfetivaCumprimentoSentenca,
      recuperacaoEfetivaCumprimentoSentencaObservacoes: processo.recuperacaoEfetivaCumprimentoSentencaObservacoes,
      envolveEmpreendimento: processo.envolveEmpreendimento,
      envolveExploracaoIlegal: processo.envolveExploracaoIlegal,
      envolveTerraQuilombola: processo.envolveTerraQuilombola,
      envolveTerraComunidadeTradicional: processo.envolveTerraComunidadeTradicional,
      envolveTerraIndigena: processo.envolveTerraIndigena,
      resumoFatos: processo.resumoFatos,
      tamanhoArea: processo.tamanhoArea,
      valorArea: processo.valorArea,
      tamanhoAreaObservacao: processo.tamanhoAreaObservacao,
      dadosGeograficosLitigioConflito: processo.dadosGeograficosLitigioConflito,
      latitude: processo.latitude,
      longitude: processo.longitude,
      numeroProcessoMPF: processo.numeroProcessoMPF,
      numeroEmbargo: processo.numeroEmbargo,
      pautaApelacao: processo.pautaApelacao,
      numeroRecursoEspecial: processo.numeroRecursoEspecial,
      admissiblidade: processo.admissiblidade,
      envolveGrandeProjeto: processo.envolveGrandeProjeto,
      envolveUnidadeConservacao: processo.envolveUnidadeConservacao,
      linkReferencia: processo.linkReferencia,
      statusProcesso: processo.statusProcesso,
      tipoDecisao: processo.tipoDecisao,
      tipoEmpreendimento: processo.tipoEmpreendimento,
      secaoJudiciaria: processo.secaoJudiciaria,
      comarcas: processo.comarcas,
      municipios: processo.municipios,
      territorios: processo.territorios,
      atividadeExploracaoIlegals: processo.atividadeExploracaoIlegals,
      unidadeConservacaos: processo.unidadeConservacaos,
      envolvidosConflitoLitigios: processo.envolvidosConflitoLitigios,
      terraIndigenas: processo.terraIndigenas,
      processoConflitos: processo.processoConflitos,
      parteInteresssadas: processo.parteInteresssadas,
      relators: processo.relators,
      quilombos: processo.quilombos,
    });

    this.tipoDecisaosSharedCollection = this.tipoDecisaoService.addTipoDecisaoToCollectionIfMissing(
      this.tipoDecisaosSharedCollection,
      processo.tipoDecisao
    );
    this.tipoEmpreendimentosSharedCollection = this.tipoEmpreendimentoService.addTipoEmpreendimentoToCollectionIfMissing(
      this.tipoEmpreendimentosSharedCollection,
      processo.tipoEmpreendimento
    );
    this.secaoJudiciariasSharedCollection = this.secaoJudiciariaService.addSecaoJudiciariaToCollectionIfMissing(
      this.secaoJudiciariasSharedCollection,
      processo.secaoJudiciaria
    );
    this.comarcasSharedCollection = this.comarcaService.addComarcaToCollectionIfMissing(
      this.comarcasSharedCollection,
      ...(processo.comarcas ?? [])
    );
    this.municipiosSharedCollection = this.municipioService.addMunicipioToCollectionIfMissing(
      this.municipiosSharedCollection,
      ...(processo.municipios ?? [])
    );
    this.territoriosSharedCollection = this.territorioService.addTerritorioToCollectionIfMissing(
      this.territoriosSharedCollection,
      ...(processo.territorios ?? [])
    );
    this.atividadeExploracaoIlegalsSharedCollection =
      this.atividadeExploracaoIlegalService.addAtividadeExploracaoIlegalToCollectionIfMissing(
        this.atividadeExploracaoIlegalsSharedCollection,
        ...(processo.atividadeExploracaoIlegals ?? [])
      );
    this.unidadeConservacaosSharedCollection = this.unidadeConservacaoService.addUnidadeConservacaoToCollectionIfMissing(
      this.unidadeConservacaosSharedCollection,
      ...(processo.unidadeConservacaos ?? [])
    );
    this.envolvidosConflitoLitigiosSharedCollection =
      this.envolvidosConflitoLitigioService.addEnvolvidosConflitoLitigioToCollectionIfMissing(
        this.envolvidosConflitoLitigiosSharedCollection,
        ...(processo.envolvidosConflitoLitigios ?? [])
      );
    this.terraIndigenasSharedCollection = this.terraIndigenaService.addTerraIndigenaToCollectionIfMissing(
      this.terraIndigenasSharedCollection,
      ...(processo.terraIndigenas ?? [])
    );
    this.processoConflitosSharedCollection = this.processoConflitoService.addProcessoConflitoToCollectionIfMissing(
      this.processoConflitosSharedCollection,
      ...(processo.processoConflitos ?? [])
    );
    this.parteInteresssadasSharedCollection = this.parteInteresssadaService.addParteInteresssadaToCollectionIfMissing(
      this.parteInteresssadasSharedCollection,
      ...(processo.parteInteresssadas ?? [])
    );
    this.relatorsSharedCollection = this.relatorService.addRelatorToCollectionIfMissing(
      this.relatorsSharedCollection,
      ...(processo.relators ?? [])
    );
    this.quilombosSharedCollection = this.quilomboService.addQuilomboToCollectionIfMissing(
      this.quilombosSharedCollection,
      ...(processo.quilombos ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tipoDecisaoService
      .query()
      .pipe(map((res: HttpResponse<ITipoDecisao[]>) => res.body ?? []))
      .pipe(
        map((tipoDecisaos: ITipoDecisao[]) =>
          this.tipoDecisaoService.addTipoDecisaoToCollectionIfMissing(tipoDecisaos, this.editForm.get('tipoDecisao')!.value)
        )
      )
      .subscribe((tipoDecisaos: ITipoDecisao[]) => (this.tipoDecisaosSharedCollection = tipoDecisaos));

    this.tipoEmpreendimentoService
      .query()
      .pipe(map((res: HttpResponse<ITipoEmpreendimento[]>) => res.body ?? []))
      .pipe(
        map((tipoEmpreendimentos: ITipoEmpreendimento[]) =>
          this.tipoEmpreendimentoService.addTipoEmpreendimentoToCollectionIfMissing(
            tipoEmpreendimentos,
            this.editForm.get('tipoEmpreendimento')!.value
          )
        )
      )
      .subscribe((tipoEmpreendimentos: ITipoEmpreendimento[]) => (this.tipoEmpreendimentosSharedCollection = tipoEmpreendimentos));

    this.secaoJudiciariaService
      .query()
      .pipe(map((res: HttpResponse<ISecaoJudiciaria[]>) => res.body ?? []))
      .pipe(
        map((secaoJudiciarias: ISecaoJudiciaria[]) =>
          this.secaoJudiciariaService.addSecaoJudiciariaToCollectionIfMissing(secaoJudiciarias, this.editForm.get('secaoJudiciaria')!.value)
        )
      )
      .subscribe((secaoJudiciarias: ISecaoJudiciaria[]) => (this.secaoJudiciariasSharedCollection = secaoJudiciarias));

    this.comarcaService
      .query()
      .pipe(map((res: HttpResponse<IComarca[]>) => res.body ?? []))
      .pipe(
        map((comarcas: IComarca[]) =>
          this.comarcaService.addComarcaToCollectionIfMissing(comarcas, ...(this.editForm.get('comarcas')!.value ?? []))
        )
      )
      .subscribe((comarcas: IComarca[]) => (this.comarcasSharedCollection = comarcas));

    this.municipioService
      .query()
      .pipe(map((res: HttpResponse<IMunicipio[]>) => res.body ?? []))
      .pipe(
        map((municipios: IMunicipio[]) =>
          this.municipioService.addMunicipioToCollectionIfMissing(municipios, ...(this.editForm.get('municipios')!.value ?? []))
        )
      )
      .subscribe((municipios: IMunicipio[]) => (this.municipiosSharedCollection = municipios));

    this.territorioService
      .query()
      .pipe(map((res: HttpResponse<ITerritorio[]>) => res.body ?? []))
      .pipe(
        map((territorios: ITerritorio[]) =>
          this.territorioService.addTerritorioToCollectionIfMissing(territorios, ...(this.editForm.get('territorios')!.value ?? []))
        )
      )
      .subscribe((territorios: ITerritorio[]) => (this.territoriosSharedCollection = territorios));

    this.atividadeExploracaoIlegalService
      .query()
      .pipe(map((res: HttpResponse<IAtividadeExploracaoIlegal[]>) => res.body ?? []))
      .pipe(
        map((atividadeExploracaoIlegals: IAtividadeExploracaoIlegal[]) =>
          this.atividadeExploracaoIlegalService.addAtividadeExploracaoIlegalToCollectionIfMissing(
            atividadeExploracaoIlegals,
            ...(this.editForm.get('atividadeExploracaoIlegals')!.value ?? [])
          )
        )
      )
      .subscribe(
        (atividadeExploracaoIlegals: IAtividadeExploracaoIlegal[]) =>
          (this.atividadeExploracaoIlegalsSharedCollection = atividadeExploracaoIlegals)
      );

    this.unidadeConservacaoService
      .query()
      .pipe(map((res: HttpResponse<IUnidadeConservacao[]>) => res.body ?? []))
      .pipe(
        map((unidadeConservacaos: IUnidadeConservacao[]) =>
          this.unidadeConservacaoService.addUnidadeConservacaoToCollectionIfMissing(
            unidadeConservacaos,
            ...(this.editForm.get('unidadeConservacaos')!.value ?? [])
          )
        )
      )
      .subscribe((unidadeConservacaos: IUnidadeConservacao[]) => (this.unidadeConservacaosSharedCollection = unidadeConservacaos));

    this.envolvidosConflitoLitigioService
      .query()
      .pipe(map((res: HttpResponse<IEnvolvidosConflitoLitigio[]>) => res.body ?? []))
      .pipe(
        map((envolvidosConflitoLitigios: IEnvolvidosConflitoLitigio[]) =>
          this.envolvidosConflitoLitigioService.addEnvolvidosConflitoLitigioToCollectionIfMissing(
            envolvidosConflitoLitigios,
            ...(this.editForm.get('envolvidosConflitoLitigios')!.value ?? [])
          )
        )
      )
      .subscribe(
        (envolvidosConflitoLitigios: IEnvolvidosConflitoLitigio[]) =>
          (this.envolvidosConflitoLitigiosSharedCollection = envolvidosConflitoLitigios)
      );

    this.terraIndigenaService
      .query()
      .pipe(map((res: HttpResponse<ITerraIndigena[]>) => res.body ?? []))
      .pipe(
        map((terraIndigenas: ITerraIndigena[]) =>
          this.terraIndigenaService.addTerraIndigenaToCollectionIfMissing(
            terraIndigenas,
            ...(this.editForm.get('terraIndigenas')!.value ?? [])
          )
        )
      )
      .subscribe((terraIndigenas: ITerraIndigena[]) => (this.terraIndigenasSharedCollection = terraIndigenas));

    this.processoConflitoService
      .query()
      .pipe(map((res: HttpResponse<IProcessoConflito[]>) => res.body ?? []))
      .pipe(
        map((processoConflitos: IProcessoConflito[]) =>
          this.processoConflitoService.addProcessoConflitoToCollectionIfMissing(
            processoConflitos,
            ...(this.editForm.get('processoConflitos')!.value ?? [])
          )
        )
      )
      .subscribe((processoConflitos: IProcessoConflito[]) => (this.processoConflitosSharedCollection = processoConflitos));

    this.parteInteresssadaService
      .query()
      .pipe(map((res: HttpResponse<IParteInteresssada[]>) => res.body ?? []))
      .pipe(
        map((parteInteresssadas: IParteInteresssada[]) =>
          this.parteInteresssadaService.addParteInteresssadaToCollectionIfMissing(
            parteInteresssadas,
            ...(this.editForm.get('parteInteresssadas')!.value ?? [])
          )
        )
      )
      .subscribe((parteInteresssadas: IParteInteresssada[]) => (this.parteInteresssadasSharedCollection = parteInteresssadas));

    this.relatorService
      .query()
      .pipe(map((res: HttpResponse<IRelator[]>) => res.body ?? []))
      .pipe(
        map((relators: IRelator[]) =>
          this.relatorService.addRelatorToCollectionIfMissing(relators, ...(this.editForm.get('relators')!.value ?? []))
        )
      )
      .subscribe((relators: IRelator[]) => (this.relatorsSharedCollection = relators));

    this.quilomboService
      .query()
      .pipe(map((res: HttpResponse<IQuilombo[]>) => res.body ?? []))
      .pipe(
        map((quilombos: IQuilombo[]) =>
          this.quilomboService.addQuilomboToCollectionIfMissing(quilombos, ...(this.editForm.get('quilombos')!.value ?? []))
        )
      )
      .subscribe((quilombos: IQuilombo[]) => (this.quilombosSharedCollection = quilombos));
  }

  protected createFromForm(): IProcesso {
    return {
      ...new Processo(),
      id: this.editForm.get(['id'])!.value,
      numeroProcesso: this.editForm.get(['numeroProcesso'])!.value,
      oficio: this.editForm.get(['oficio'])!.value,
      assunto: this.editForm.get(['assunto'])!.value,
      linkUnico: this.editForm.get(['linkUnico'])!.value,
      linkTrf: this.editForm.get(['linkTrf'])!.value,
      turmaTrf1: this.editForm.get(['turmaTrf1'])!.value,
      numeroProcessoAdministrativo: this.editForm.get(['numeroProcessoAdministrativo'])!.value,
      numeroProcessoJudicialPrimeiraInstancia: this.editForm.get(['numeroProcessoJudicialPrimeiraInstancia'])!.value,
      numeroProcessoJudicialPrimeiraInstanciaLink: this.editForm.get(['numeroProcessoJudicialPrimeiraInstanciaLink'])!.value,
      numeroProcessoJudicialPrimeiraInstanciaObservacoes: this.editForm.get(['numeroProcessoJudicialPrimeiraInstanciaObservacoes'])!.value,
      parecer: this.editForm.get(['parecer'])!.value,
      folhasProcessoConcessaoLiminar: this.editForm.get(['folhasProcessoConcessaoLiminar'])!.value,
      concessaoLiminarObservacoes: this.editForm.get(['concessaoLiminarObservacoes'])!.value,
      folhasProcessoCassacao: this.editForm.get(['folhasProcessoCassacao'])!.value,
      folhasParecer: this.editForm.get(['folhasParecer'])!.value,
      folhasEmbargo: this.editForm.get(['folhasEmbargo'])!.value,
      acordaoEmbargo: this.editForm.get(['acordaoEmbargo'])!.value,
      folhasCienciaJulgEmbargos: this.editForm.get(['folhasCienciaJulgEmbargos'])!.value,
      apelacao: this.editForm.get(['apelacao'])!.value,
      folhasApelacao: this.editForm.get(['folhasApelacao'])!.value,
      acordaoApelacao: this.editForm.get(['acordaoApelacao'])!.value,
      folhasCienciaJulgApelacao: this.editForm.get(['folhasCienciaJulgApelacao'])!.value,
      embargoDeclaracao: this.editForm.get(['embargoDeclaracao'])!.value,
      embargoRecursoExtraordinario: this.editForm.get(['embargoRecursoExtraordinario'])!.value,
      folhasRecursoEspecial: this.editForm.get(['folhasRecursoEspecial'])!.value,
      acordaoRecursoEspecial: this.editForm.get(['acordaoRecursoEspecial'])!.value,
      folhasCienciaJulgamentoRecursoEspecial: this.editForm.get(['folhasCienciaJulgamentoRecursoEspecial'])!.value,
      embargoRecursoEspecial: this.editForm.get(['embargoRecursoEspecial'])!.value,
      folhasCiencia: this.editForm.get(['folhasCiencia'])!.value,
      agravoRespRe: this.editForm.get(['agravoRespRe'])!.value,
      folhasRespRe: this.editForm.get(['folhasRespRe'])!.value,
      acordaoAgravoRespRe: this.editForm.get(['acordaoAgravoRespRe'])!.value,
      folhasCienciaJulgamentoAgravoRespRe: this.editForm.get(['folhasCienciaJulgamentoAgravoRespRe'])!.value,
      embargoRespRe: this.editForm.get(['embargoRespRe'])!.value,
      agravoInterno: this.editForm.get(['agravoInterno'])!.value,
      folhasAgravoInterno: this.editForm.get(['folhasAgravoInterno'])!.value,
      embargoRecursoAgravo: this.editForm.get(['embargoRecursoAgravo'])!.value,
      observacoes: this.editForm.get(['observacoes'])!.value,
      recursoSTJ: this.editForm.get(['recursoSTJ'])!.value,
      linkRecursoSTJ: this.editForm.get(['linkRecursoSTJ'])!.value,
      folhasRecursoSTJ: this.editForm.get(['folhasRecursoSTJ'])!.value,
      recursoSTF: this.editForm.get(['recursoSTF'])!.value,
      linkRecursoSTF: this.editForm.get(['linkRecursoSTF'])!.value,
      folhasRecursoSTF: this.editForm.get(['folhasRecursoSTF'])!.value,
      folhasMemorialMPF: this.editForm.get(['folhasMemorialMPF'])!.value,
      execusaoProvisoria: this.editForm.get(['execusaoProvisoria'])!.value,
      numeracaoExecusaoProvisoria: this.editForm.get(['numeracaoExecusaoProvisoria'])!.value,
      recuperacaoEfetivaCumprimentoSentenca: this.editForm.get(['recuperacaoEfetivaCumprimentoSentenca'])!.value,
      recuperacaoEfetivaCumprimentoSentencaObservacoes: this.editForm.get(['recuperacaoEfetivaCumprimentoSentencaObservacoes'])!.value,
      envolveEmpreendimento: this.editForm.get(['envolveEmpreendimento'])!.value,
      envolveExploracaoIlegal: this.editForm.get(['envolveExploracaoIlegal'])!.value,
      envolveTerraQuilombola: this.editForm.get(['envolveTerraQuilombola'])!.value,
      envolveTerraComunidadeTradicional: this.editForm.get(['envolveTerraComunidadeTradicional'])!.value,
      envolveTerraIndigena: this.editForm.get(['envolveTerraIndigena'])!.value,
      resumoFatos: this.editForm.get(['resumoFatos'])!.value,
      tamanhoArea: this.editForm.get(['tamanhoArea'])!.value,
      valorArea: this.editForm.get(['valorArea'])!.value,
      tamanhoAreaObservacao: this.editForm.get(['tamanhoAreaObservacao'])!.value,
      dadosGeograficosLitigioConflito: this.editForm.get(['dadosGeograficosLitigioConflito'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      numeroProcessoMPF: this.editForm.get(['numeroProcessoMPF'])!.value,
      numeroEmbargo: this.editForm.get(['numeroEmbargo'])!.value,
      pautaApelacao: this.editForm.get(['pautaApelacao'])!.value,
      numeroRecursoEspecial: this.editForm.get(['numeroRecursoEspecial'])!.value,
      admissiblidade: this.editForm.get(['admissiblidade'])!.value,
      envolveGrandeProjeto: this.editForm.get(['envolveGrandeProjeto'])!.value,
      envolveUnidadeConservacao: this.editForm.get(['envolveUnidadeConservacao'])!.value,
      linkReferencia: this.editForm.get(['linkReferencia'])!.value,
      statusProcesso: this.editForm.get(['statusProcesso'])!.value,
      tipoDecisao: this.editForm.get(['tipoDecisao'])!.value,
      tipoEmpreendimento: this.editForm.get(['tipoEmpreendimento'])!.value,
      secaoJudiciaria: this.editForm.get(['secaoJudiciaria'])!.value,
      comarcas: this.editForm.get(['comarcas'])!.value,
      municipios: this.editForm.get(['municipios'])!.value,
      territorios: this.editForm.get(['territorios'])!.value,
      atividadeExploracaoIlegals: this.editForm.get(['atividadeExploracaoIlegals'])!.value,
      unidadeConservacaos: this.editForm.get(['unidadeConservacaos'])!.value,
      envolvidosConflitoLitigios: this.editForm.get(['envolvidosConflitoLitigios'])!.value,
      terraIndigenas: this.editForm.get(['terraIndigenas'])!.value,
      processoConflitos: this.editForm.get(['processoConflitos'])!.value,
      parteInteresssadas: this.editForm.get(['parteInteresssadas'])!.value,
      relators: this.editForm.get(['relators'])!.value,
      quilombos: this.editForm.get(['quilombos'])!.value,
    };
  }
}
