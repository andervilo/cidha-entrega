import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProblemaJuridico, ProblemaJuridico } from '../problema-juridico.model';
import { ProblemaJuridicoService } from '../service/problema-juridico.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IFundamentacaoDoutrinaria } from 'app/entities/fundamentacao-doutrinaria/fundamentacao-doutrinaria.model';
import { FundamentacaoDoutrinariaService } from 'app/entities/fundamentacao-doutrinaria/service/fundamentacao-doutrinaria.service';
import { IJurisprudencia } from 'app/entities/jurisprudencia/jurisprudencia.model';
import { JurisprudenciaService } from 'app/entities/jurisprudencia/service/jurisprudencia.service';
import { IFundamentacaoLegal } from 'app/entities/fundamentacao-legal/fundamentacao-legal.model';
import { FundamentacaoLegalService } from 'app/entities/fundamentacao-legal/service/fundamentacao-legal.service';
import { IInstrumentoInternacional } from 'app/entities/instrumento-internacional/instrumento-internacional.model';
import { InstrumentoInternacionalService } from 'app/entities/instrumento-internacional/service/instrumento-internacional.service';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

@Component({
  selector: 'jhi-problema-juridico-update',
  templateUrl: './problema-juridico-update.component.html',
})
export class ProblemaJuridicoUpdateComponent implements OnInit {
  isSaving = false;

  fundamentacaoDoutrinariasSharedCollection: IFundamentacaoDoutrinaria[] = [];
  jurisprudenciasSharedCollection: IJurisprudencia[] = [];
  fundamentacaoLegalsSharedCollection: IFundamentacaoLegal[] = [];
  instrumentoInternacionalsSharedCollection: IInstrumentoInternacional[] = [];
  processosSharedCollection: IProcesso[] = [];

  editForm = this.fb.group({
    id: [],
    prolemaJuridicoRespondido: [],
    folhasProblemaJuridico: [],
    fundamentacaoDoutrinarias: [],
    jurisprudencias: [],
    fundamentacaoLegals: [],
    instrumentoInternacionals: [],
    processos: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected problemaJuridicoService: ProblemaJuridicoService,
    protected fundamentacaoDoutrinariaService: FundamentacaoDoutrinariaService,
    protected jurisprudenciaService: JurisprudenciaService,
    protected fundamentacaoLegalService: FundamentacaoLegalService,
    protected instrumentoInternacionalService: InstrumentoInternacionalService,
    protected processoService: ProcessoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ problemaJuridico }) => {
      this.updateForm(problemaJuridico);

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
    const problemaJuridico = this.createFromForm();
    if (problemaJuridico.id !== undefined) {
      this.subscribeToSaveResponse(this.problemaJuridicoService.update(problemaJuridico));
    } else {
      this.subscribeToSaveResponse(this.problemaJuridicoService.create(problemaJuridico));
    }
  }

  trackFundamentacaoDoutrinariaById(_index: number, item: IFundamentacaoDoutrinaria): number {
    return item.id!;
  }

  trackJurisprudenciaById(_index: number, item: IJurisprudencia): number {
    return item.id!;
  }

  trackFundamentacaoLegalById(_index: number, item: IFundamentacaoLegal): number {
    return item.id!;
  }

  trackInstrumentoInternacionalById(_index: number, item: IInstrumentoInternacional): number {
    return item.id!;
  }

  trackProcessoById(_index: number, item: IProcesso): number {
    return item.id!;
  }

  getSelectedFundamentacaoDoutrinaria(
    option: IFundamentacaoDoutrinaria,
    selectedVals?: IFundamentacaoDoutrinaria[]
  ): IFundamentacaoDoutrinaria {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedJurisprudencia(option: IJurisprudencia, selectedVals?: IJurisprudencia[]): IJurisprudencia {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedFundamentacaoLegal(option: IFundamentacaoLegal, selectedVals?: IFundamentacaoLegal[]): IFundamentacaoLegal {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedInstrumentoInternacional(
    option: IInstrumentoInternacional,
    selectedVals?: IInstrumentoInternacional[]
  ): IInstrumentoInternacional {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedProcesso(option: IProcesso, selectedVals?: IProcesso[]): IProcesso {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProblemaJuridico>>): void {
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

  protected updateForm(problemaJuridico: IProblemaJuridico): void {
    this.editForm.patchValue({
      id: problemaJuridico.id,
      prolemaJuridicoRespondido: problemaJuridico.prolemaJuridicoRespondido,
      folhasProblemaJuridico: problemaJuridico.folhasProblemaJuridico,
      fundamentacaoDoutrinarias: problemaJuridico.fundamentacaoDoutrinarias,
      jurisprudencias: problemaJuridico.jurisprudencias,
      fundamentacaoLegals: problemaJuridico.fundamentacaoLegals,
      instrumentoInternacionals: problemaJuridico.instrumentoInternacionals,
      processos: problemaJuridico.processos,
    });

    this.fundamentacaoDoutrinariasSharedCollection = this.fundamentacaoDoutrinariaService.addFundamentacaoDoutrinariaToCollectionIfMissing(
      this.fundamentacaoDoutrinariasSharedCollection,
      ...(problemaJuridico.fundamentacaoDoutrinarias ?? [])
    );
    this.jurisprudenciasSharedCollection = this.jurisprudenciaService.addJurisprudenciaToCollectionIfMissing(
      this.jurisprudenciasSharedCollection,
      ...(problemaJuridico.jurisprudencias ?? [])
    );
    this.fundamentacaoLegalsSharedCollection = this.fundamentacaoLegalService.addFundamentacaoLegalToCollectionIfMissing(
      this.fundamentacaoLegalsSharedCollection,
      ...(problemaJuridico.fundamentacaoLegals ?? [])
    );
    this.instrumentoInternacionalsSharedCollection = this.instrumentoInternacionalService.addInstrumentoInternacionalToCollectionIfMissing(
      this.instrumentoInternacionalsSharedCollection,
      ...(problemaJuridico.instrumentoInternacionals ?? [])
    );
    this.processosSharedCollection = this.processoService.addProcessoToCollectionIfMissing(
      this.processosSharedCollection,
      ...(problemaJuridico.processos ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.fundamentacaoDoutrinariaService
      .query()
      .pipe(map((res: HttpResponse<IFundamentacaoDoutrinaria[]>) => res.body ?? []))
      .pipe(
        map((fundamentacaoDoutrinarias: IFundamentacaoDoutrinaria[]) =>
          this.fundamentacaoDoutrinariaService.addFundamentacaoDoutrinariaToCollectionIfMissing(
            fundamentacaoDoutrinarias,
            ...(this.editForm.get('fundamentacaoDoutrinarias')!.value ?? [])
          )
        )
      )
      .subscribe(
        (fundamentacaoDoutrinarias: IFundamentacaoDoutrinaria[]) =>
          (this.fundamentacaoDoutrinariasSharedCollection = fundamentacaoDoutrinarias)
      );

    this.jurisprudenciaService
      .query()
      .pipe(map((res: HttpResponse<IJurisprudencia[]>) => res.body ?? []))
      .pipe(
        map((jurisprudencias: IJurisprudencia[]) =>
          this.jurisprudenciaService.addJurisprudenciaToCollectionIfMissing(
            jurisprudencias,
            ...(this.editForm.get('jurisprudencias')!.value ?? [])
          )
        )
      )
      .subscribe((jurisprudencias: IJurisprudencia[]) => (this.jurisprudenciasSharedCollection = jurisprudencias));

    this.fundamentacaoLegalService
      .query()
      .pipe(map((res: HttpResponse<IFundamentacaoLegal[]>) => res.body ?? []))
      .pipe(
        map((fundamentacaoLegals: IFundamentacaoLegal[]) =>
          this.fundamentacaoLegalService.addFundamentacaoLegalToCollectionIfMissing(
            fundamentacaoLegals,
            ...(this.editForm.get('fundamentacaoLegals')!.value ?? [])
          )
        )
      )
      .subscribe((fundamentacaoLegals: IFundamentacaoLegal[]) => (this.fundamentacaoLegalsSharedCollection = fundamentacaoLegals));

    this.instrumentoInternacionalService
      .query()
      .pipe(map((res: HttpResponse<IInstrumentoInternacional[]>) => res.body ?? []))
      .pipe(
        map((instrumentoInternacionals: IInstrumentoInternacional[]) =>
          this.instrumentoInternacionalService.addInstrumentoInternacionalToCollectionIfMissing(
            instrumentoInternacionals,
            ...(this.editForm.get('instrumentoInternacionals')!.value ?? [])
          )
        )
      )
      .subscribe(
        (instrumentoInternacionals: IInstrumentoInternacional[]) =>
          (this.instrumentoInternacionalsSharedCollection = instrumentoInternacionals)
      );

    this.processoService
      .query()
      .pipe(map((res: HttpResponse<IProcesso[]>) => res.body ?? []))
      .pipe(
        map((processos: IProcesso[]) =>
          this.processoService.addProcessoToCollectionIfMissing(processos, ...(this.editForm.get('processos')!.value ?? []))
        )
      )
      .subscribe((processos: IProcesso[]) => (this.processosSharedCollection = processos));
  }

  protected createFromForm(): IProblemaJuridico {
    return {
      ...new ProblemaJuridico(),
      id: this.editForm.get(['id'])!.value,
      prolemaJuridicoRespondido: this.editForm.get(['prolemaJuridicoRespondido'])!.value,
      folhasProblemaJuridico: this.editForm.get(['folhasProblemaJuridico'])!.value,
      fundamentacaoDoutrinarias: this.editForm.get(['fundamentacaoDoutrinarias'])!.value,
      jurisprudencias: this.editForm.get(['jurisprudencias'])!.value,
      fundamentacaoLegals: this.editForm.get(['fundamentacaoLegals'])!.value,
      instrumentoInternacionals: this.editForm.get(['instrumentoInternacionals'])!.value,
      processos: this.editForm.get(['processos'])!.value,
    };
  }
}
