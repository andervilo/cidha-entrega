import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IFundamentacaoLegal, FundamentacaoLegal } from '../fundamentacao-legal.model';
import { FundamentacaoLegalService } from '../service/fundamentacao-legal.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-fundamentacao-legal-update',
  templateUrl: './fundamentacao-legal-update.component.html',
})
export class FundamentacaoLegalUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    fundamentacaoLegal: [],
    folhasFundamentacaoLegal: [],
    fundamentacaoLegalSugerida: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected fundamentacaoLegalService: FundamentacaoLegalService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fundamentacaoLegal }) => {
      this.updateForm(fundamentacaoLegal);
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
    const fundamentacaoLegal = this.createFromForm();
    if (fundamentacaoLegal.id !== undefined) {
      this.subscribeToSaveResponse(this.fundamentacaoLegalService.update(fundamentacaoLegal));
    } else {
      this.subscribeToSaveResponse(this.fundamentacaoLegalService.create(fundamentacaoLegal));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFundamentacaoLegal>>): void {
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

  protected updateForm(fundamentacaoLegal: IFundamentacaoLegal): void {
    this.editForm.patchValue({
      id: fundamentacaoLegal.id,
      fundamentacaoLegal: fundamentacaoLegal.fundamentacaoLegal,
      folhasFundamentacaoLegal: fundamentacaoLegal.folhasFundamentacaoLegal,
      fundamentacaoLegalSugerida: fundamentacaoLegal.fundamentacaoLegalSugerida,
    });
  }

  protected createFromForm(): IFundamentacaoLegal {
    return {
      ...new FundamentacaoLegal(),
      id: this.editForm.get(['id'])!.value,
      fundamentacaoLegal: this.editForm.get(['fundamentacaoLegal'])!.value,
      folhasFundamentacaoLegal: this.editForm.get(['folhasFundamentacaoLegal'])!.value,
      fundamentacaoLegalSugerida: this.editForm.get(['fundamentacaoLegalSugerida'])!.value,
    };
  }
}
