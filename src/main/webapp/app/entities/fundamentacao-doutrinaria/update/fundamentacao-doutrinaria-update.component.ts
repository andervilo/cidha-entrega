import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IFundamentacaoDoutrinaria, FundamentacaoDoutrinaria } from '../fundamentacao-doutrinaria.model';
import { FundamentacaoDoutrinariaService } from '../service/fundamentacao-doutrinaria.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-fundamentacao-doutrinaria-update',
  templateUrl: './fundamentacao-doutrinaria-update.component.html',
})
export class FundamentacaoDoutrinariaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    fundamentacaoDoutrinariaCitada: [],
    folhasFundamentacaoDoutrinaria: [],
    fundamentacaoDoutrinariaSugerida: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected fundamentacaoDoutrinariaService: FundamentacaoDoutrinariaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fundamentacaoDoutrinaria }) => {
      this.updateForm(fundamentacaoDoutrinaria);
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
    const fundamentacaoDoutrinaria = this.createFromForm();
    if (fundamentacaoDoutrinaria.id !== undefined) {
      this.subscribeToSaveResponse(this.fundamentacaoDoutrinariaService.update(fundamentacaoDoutrinaria));
    } else {
      this.subscribeToSaveResponse(this.fundamentacaoDoutrinariaService.create(fundamentacaoDoutrinaria));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFundamentacaoDoutrinaria>>): void {
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

  protected updateForm(fundamentacaoDoutrinaria: IFundamentacaoDoutrinaria): void {
    this.editForm.patchValue({
      id: fundamentacaoDoutrinaria.id,
      fundamentacaoDoutrinariaCitada: fundamentacaoDoutrinaria.fundamentacaoDoutrinariaCitada,
      folhasFundamentacaoDoutrinaria: fundamentacaoDoutrinaria.folhasFundamentacaoDoutrinaria,
      fundamentacaoDoutrinariaSugerida: fundamentacaoDoutrinaria.fundamentacaoDoutrinariaSugerida,
    });
  }

  protected createFromForm(): IFundamentacaoDoutrinaria {
    return {
      ...new FundamentacaoDoutrinaria(),
      id: this.editForm.get(['id'])!.value,
      fundamentacaoDoutrinariaCitada: this.editForm.get(['fundamentacaoDoutrinariaCitada'])!.value,
      folhasFundamentacaoDoutrinaria: this.editForm.get(['folhasFundamentacaoDoutrinaria'])!.value,
      fundamentacaoDoutrinariaSugerida: this.editForm.get(['fundamentacaoDoutrinariaSugerida'])!.value,
    };
  }
}
