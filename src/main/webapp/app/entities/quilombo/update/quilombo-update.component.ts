import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IQuilombo, Quilombo } from '../quilombo.model';
import { QuilomboService } from '../service/quilombo.service';
import { TipoQuilombo } from 'app/entities/enumerations/tipo-quilombo.model';

@Component({
  selector: 'jhi-quilombo-update',
  templateUrl: './quilombo-update.component.html',
})
export class QuilomboUpdateComponent implements OnInit {
  isSaving = false;
  tipoQuilomboValues = Object.keys(TipoQuilombo);

  editForm = this.fb.group({
    id: [],
    nome: [],
    tipoQuilombo: [],
  });

  constructor(protected quilomboService: QuilomboService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quilombo }) => {
      this.updateForm(quilombo);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const quilombo = this.createFromForm();
    if (quilombo.id !== undefined) {
      this.subscribeToSaveResponse(this.quilomboService.update(quilombo));
    } else {
      this.subscribeToSaveResponse(this.quilomboService.create(quilombo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuilombo>>): void {
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

  protected updateForm(quilombo: IQuilombo): void {
    this.editForm.patchValue({
      id: quilombo.id,
      nome: quilombo.nome,
      tipoQuilombo: quilombo.tipoQuilombo,
    });
  }

  protected createFromForm(): IQuilombo {
    return {
      ...new Quilombo(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      tipoQuilombo: this.editForm.get(['tipoQuilombo'])!.value,
    };
  }
}
