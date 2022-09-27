import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IComarca, Comarca } from '../comarca.model';
import { ComarcaService } from '../service/comarca.service';

@Component({
  selector: 'jhi-comarca-update',
  templateUrl: './comarca-update.component.html',
})
export class ComarcaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
    codigoCnj: [],
  });

  constructor(protected comarcaService: ComarcaService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ comarca }) => {
      this.updateForm(comarca);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const comarca = this.createFromForm();
    if (comarca.id !== undefined) {
      this.subscribeToSaveResponse(this.comarcaService.update(comarca));
    } else {
      this.subscribeToSaveResponse(this.comarcaService.create(comarca));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComarca>>): void {
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

  protected updateForm(comarca: IComarca): void {
    this.editForm.patchValue({
      id: comarca.id,
      nome: comarca.nome,
      codigoCnj: comarca.codigoCnj,
    });
  }

  protected createFromForm(): IComarca {
    return {
      ...new Comarca(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      codigoCnj: this.editForm.get(['codigoCnj'])!.value,
    };
  }
}
