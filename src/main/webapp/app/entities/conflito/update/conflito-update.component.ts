import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IConflito, Conflito } from '../conflito.model';
import { ConflitoService } from '../service/conflito.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IProcessoConflito } from 'app/entities/processo-conflito/processo-conflito.model';
import { ProcessoConflitoService } from 'app/entities/processo-conflito/service/processo-conflito.service';

@Component({
  selector: 'jhi-conflito-update',
  templateUrl: './conflito-update.component.html',
})
export class ConflitoUpdateComponent implements OnInit {
  isSaving = false;

  processoConflitosSharedCollection: IProcessoConflito[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    processoConflito: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected conflitoService: ConflitoService,
    protected processoConflitoService: ProcessoConflitoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conflito }) => {
      this.updateForm(conflito);

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
    const conflito = this.createFromForm();
    if (conflito.id !== undefined) {
      this.subscribeToSaveResponse(this.conflitoService.update(conflito));
    } else {
      this.subscribeToSaveResponse(this.conflitoService.create(conflito));
    }
  }

  trackProcessoConflitoById(_index: number, item: IProcessoConflito): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConflito>>): void {
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

  protected updateForm(conflito: IConflito): void {
    this.editForm.patchValue({
      id: conflito.id,
      descricao: conflito.descricao,
      processoConflito: conflito.processoConflito,
    });

    this.processoConflitosSharedCollection = this.processoConflitoService.addProcessoConflitoToCollectionIfMissing(
      this.processoConflitosSharedCollection,
      conflito.processoConflito
    );
  }

  protected loadRelationshipsOptions(): void {
    this.processoConflitoService
      .query()
      .pipe(map((res: HttpResponse<IProcessoConflito[]>) => res.body ?? []))
      .pipe(
        map((processoConflitos: IProcessoConflito[]) =>
          this.processoConflitoService.addProcessoConflitoToCollectionIfMissing(
            processoConflitos,
            this.editForm.get('processoConflito')!.value
          )
        )
      )
      .subscribe((processoConflitos: IProcessoConflito[]) => (this.processoConflitosSharedCollection = processoConflitos));
  }

  protected createFromForm(): IConflito {
    return {
      ...new Conflito(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      processoConflito: this.editForm.get(['processoConflito'])!.value,
    };
  }
}
