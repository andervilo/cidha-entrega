import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IOpcaoRecurso, OpcaoRecurso } from '../opcao-recurso.model';
import { OpcaoRecursoService } from '../service/opcao-recurso.service';

@Component({
  selector: 'jhi-opcao-recurso-update',
  templateUrl: './opcao-recurso-update.component.html',
})
export class OpcaoRecursoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [],
  });

  constructor(protected opcaoRecursoService: OpcaoRecursoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ opcaoRecurso }) => {
      this.updateForm(opcaoRecurso);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const opcaoRecurso = this.createFromForm();
    if (opcaoRecurso.id !== undefined) {
      this.subscribeToSaveResponse(this.opcaoRecursoService.update(opcaoRecurso));
    } else {
      this.subscribeToSaveResponse(this.opcaoRecursoService.create(opcaoRecurso));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOpcaoRecurso>>): void {
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

  protected updateForm(opcaoRecurso: IOpcaoRecurso): void {
    this.editForm.patchValue({
      id: opcaoRecurso.id,
      descricao: opcaoRecurso.descricao,
    });
  }

  protected createFromForm(): IOpcaoRecurso {
    return {
      ...new OpcaoRecurso(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
    };
  }
}
