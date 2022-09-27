import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITipoRecurso, TipoRecurso } from '../tipo-recurso.model';
import { TipoRecursoService } from '../service/tipo-recurso.service';

@Component({
  selector: 'jhi-tipo-recurso-update',
  templateUrl: './tipo-recurso-update.component.html',
})
export class TipoRecursoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [],
  });

  constructor(protected tipoRecursoService: TipoRecursoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoRecurso }) => {
      this.updateForm(tipoRecurso);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoRecurso = this.createFromForm();
    if (tipoRecurso.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoRecursoService.update(tipoRecurso));
    } else {
      this.subscribeToSaveResponse(this.tipoRecursoService.create(tipoRecurso));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoRecurso>>): void {
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

  protected updateForm(tipoRecurso: ITipoRecurso): void {
    this.editForm.patchValue({
      id: tipoRecurso.id,
      descricao: tipoRecurso.descricao,
    });
  }

  protected createFromForm(): ITipoRecurso {
    return {
      ...new TipoRecurso(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
    };
  }
}
