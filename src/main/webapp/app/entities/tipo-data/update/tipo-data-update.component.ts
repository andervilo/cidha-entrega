import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITipoData, TipoData } from '../tipo-data.model';
import { TipoDataService } from '../service/tipo-data.service';

@Component({
  selector: 'jhi-tipo-data-update',
  templateUrl: './tipo-data-update.component.html',
})
export class TipoDataUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [],
  });

  constructor(protected tipoDataService: TipoDataService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoData }) => {
      this.updateForm(tipoData);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoData = this.createFromForm();
    if (tipoData.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoDataService.update(tipoData));
    } else {
      this.subscribeToSaveResponse(this.tipoDataService.create(tipoData));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoData>>): void {
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

  protected updateForm(tipoData: ITipoData): void {
    this.editForm.patchValue({
      id: tipoData.id,
      descricao: tipoData.descricao,
    });
  }

  protected createFromForm(): ITipoData {
    return {
      ...new TipoData(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
    };
  }
}
