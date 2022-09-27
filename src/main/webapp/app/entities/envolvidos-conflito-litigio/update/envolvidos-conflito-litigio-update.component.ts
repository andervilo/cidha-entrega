import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEnvolvidosConflitoLitigio, EnvolvidosConflitoLitigio } from '../envolvidos-conflito-litigio.model';
import { EnvolvidosConflitoLitigioService } from '../service/envolvidos-conflito-litigio.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-envolvidos-conflito-litigio-update',
  templateUrl: './envolvidos-conflito-litigio-update.component.html',
})
export class EnvolvidosConflitoLitigioUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    numeroIndividuos: [],
    fonteInformacaoQtde: [],
    observacoes: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected envolvidosConflitoLitigioService: EnvolvidosConflitoLitigioService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ envolvidosConflitoLitigio }) => {
      this.updateForm(envolvidosConflitoLitigio);
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
    const envolvidosConflitoLitigio = this.createFromForm();
    if (envolvidosConflitoLitigio.id !== undefined) {
      this.subscribeToSaveResponse(this.envolvidosConflitoLitigioService.update(envolvidosConflitoLitigio));
    } else {
      this.subscribeToSaveResponse(this.envolvidosConflitoLitigioService.create(envolvidosConflitoLitigio));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEnvolvidosConflitoLitigio>>): void {
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

  protected updateForm(envolvidosConflitoLitigio: IEnvolvidosConflitoLitigio): void {
    this.editForm.patchValue({
      id: envolvidosConflitoLitigio.id,
      numeroIndividuos: envolvidosConflitoLitigio.numeroIndividuos,
      fonteInformacaoQtde: envolvidosConflitoLitigio.fonteInformacaoQtde,
      observacoes: envolvidosConflitoLitigio.observacoes,
    });
  }

  protected createFromForm(): IEnvolvidosConflitoLitigio {
    return {
      ...new EnvolvidosConflitoLitigio(),
      id: this.editForm.get(['id'])!.value,
      numeroIndividuos: this.editForm.get(['numeroIndividuos'])!.value,
      fonteInformacaoQtde: this.editForm.get(['fonteInformacaoQtde'])!.value,
      observacoes: this.editForm.get(['observacoes'])!.value,
    };
  }
}
