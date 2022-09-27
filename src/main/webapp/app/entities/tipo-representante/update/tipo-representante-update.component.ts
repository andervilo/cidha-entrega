import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITipoRepresentante, TipoRepresentante } from '../tipo-representante.model';
import { TipoRepresentanteService } from '../service/tipo-representante.service';

@Component({
  selector: 'jhi-tipo-representante-update',
  templateUrl: './tipo-representante-update.component.html',
})
export class TipoRepresentanteUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [],
  });

  constructor(
    protected tipoRepresentanteService: TipoRepresentanteService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoRepresentante }) => {
      this.updateForm(tipoRepresentante);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoRepresentante = this.createFromForm();
    if (tipoRepresentante.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoRepresentanteService.update(tipoRepresentante));
    } else {
      this.subscribeToSaveResponse(this.tipoRepresentanteService.create(tipoRepresentante));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoRepresentante>>): void {
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

  protected updateForm(tipoRepresentante: ITipoRepresentante): void {
    this.editForm.patchValue({
      id: tipoRepresentante.id,
      descricao: tipoRepresentante.descricao,
    });
  }

  protected createFromForm(): ITipoRepresentante {
    return {
      ...new TipoRepresentante(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
    };
  }
}
