import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProcessoConflito, ProcessoConflito } from '../processo-conflito.model';
import { ProcessoConflitoService } from '../service/processo-conflito.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IDireito } from 'app/entities/direito/direito.model';
import { DireitoService } from 'app/entities/direito/service/direito.service';

@Component({
  selector: 'jhi-processo-conflito-update',
  templateUrl: './processo-conflito-update.component.html',
})
export class ProcessoConflitoUpdateComponent implements OnInit {
  isSaving = false;

  direitosSharedCollection: IDireito[] = [];

  editForm = this.fb.group({
    id: [],
    inicioConflitoObservacoes: [],
    historicoConlito: [],
    nomeCasoComuidade: [],
    consultaPrevia: [],
    direitos: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected processoConflitoService: ProcessoConflitoService,
    protected direitoService: DireitoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ processoConflito }) => {
      this.updateForm(processoConflito);

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
    const processoConflito = this.createFromForm();
    if (processoConflito.id !== undefined) {
      this.subscribeToSaveResponse(this.processoConflitoService.update(processoConflito));
    } else {
      this.subscribeToSaveResponse(this.processoConflitoService.create(processoConflito));
    }
  }

  trackDireitoById(_index: number, item: IDireito): number {
    return item.id!;
  }

  getSelectedDireito(option: IDireito, selectedVals?: IDireito[]): IDireito {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProcessoConflito>>): void {
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

  protected updateForm(processoConflito: IProcessoConflito): void {
    this.editForm.patchValue({
      id: processoConflito.id,
      inicioConflitoObservacoes: processoConflito.inicioConflitoObservacoes,
      historicoConlito: processoConflito.historicoConlito,
      nomeCasoComuidade: processoConflito.nomeCasoComuidade,
      consultaPrevia: processoConflito.consultaPrevia,
      direitos: processoConflito.direitos,
    });

    this.direitosSharedCollection = this.direitoService.addDireitoToCollectionIfMissing(
      this.direitosSharedCollection,
      ...(processoConflito.direitos ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.direitoService
      .query()
      .pipe(map((res: HttpResponse<IDireito[]>) => res.body ?? []))
      .pipe(
        map((direitos: IDireito[]) =>
          this.direitoService.addDireitoToCollectionIfMissing(direitos, ...(this.editForm.get('direitos')!.value ?? []))
        )
      )
      .subscribe((direitos: IDireito[]) => (this.direitosSharedCollection = direitos));
  }

  protected createFromForm(): IProcessoConflito {
    return {
      ...new ProcessoConflito(),
      id: this.editForm.get(['id'])!.value,
      inicioConflitoObservacoes: this.editForm.get(['inicioConflitoObservacoes'])!.value,
      historicoConlito: this.editForm.get(['historicoConlito'])!.value,
      nomeCasoComuidade: this.editForm.get(['nomeCasoComuidade'])!.value,
      consultaPrevia: this.editForm.get(['consultaPrevia'])!.value,
      direitos: this.editForm.get(['direitos'])!.value,
    };
  }
}
