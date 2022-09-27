import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IJurisprudencia, Jurisprudencia } from '../jurisprudencia.model';
import { JurisprudenciaService } from '../service/jurisprudencia.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-jurisprudencia-update',
  templateUrl: './jurisprudencia-update.component.html',
})
export class JurisprudenciaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    jurisprudenciaCitadaDescricao: [],
    folhasJurisprudenciaCitada: [],
    jurisprudenciaSugerida: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected jurisprudenciaService: JurisprudenciaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jurisprudencia }) => {
      this.updateForm(jurisprudencia);
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
    const jurisprudencia = this.createFromForm();
    if (jurisprudencia.id !== undefined) {
      this.subscribeToSaveResponse(this.jurisprudenciaService.update(jurisprudencia));
    } else {
      this.subscribeToSaveResponse(this.jurisprudenciaService.create(jurisprudencia));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJurisprudencia>>): void {
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

  protected updateForm(jurisprudencia: IJurisprudencia): void {
    this.editForm.patchValue({
      id: jurisprudencia.id,
      jurisprudenciaCitadaDescricao: jurisprudencia.jurisprudenciaCitadaDescricao,
      folhasJurisprudenciaCitada: jurisprudencia.folhasJurisprudenciaCitada,
      jurisprudenciaSugerida: jurisprudencia.jurisprudenciaSugerida,
    });
  }

  protected createFromForm(): IJurisprudencia {
    return {
      ...new Jurisprudencia(),
      id: this.editForm.get(['id'])!.value,
      jurisprudenciaCitadaDescricao: this.editForm.get(['jurisprudenciaCitadaDescricao'])!.value,
      folhasJurisprudenciaCitada: this.editForm.get(['folhasJurisprudenciaCitada'])!.value,
      jurisprudenciaSugerida: this.editForm.get(['jurisprudenciaSugerida'])!.value,
    };
  }
}
