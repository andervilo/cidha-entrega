import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITipoDecisao, TipoDecisao } from '../tipo-decisao.model';
import { TipoDecisaoService } from '../service/tipo-decisao.service';

@Component({
  selector: 'jhi-tipo-decisao-update',
  templateUrl: './tipo-decisao-update.component.html',
})
export class TipoDecisaoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [],
  });

  constructor(protected tipoDecisaoService: TipoDecisaoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoDecisao }) => {
      this.updateForm(tipoDecisao);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoDecisao = this.createFromForm();
    if (tipoDecisao.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoDecisaoService.update(tipoDecisao));
    } else {
      this.subscribeToSaveResponse(this.tipoDecisaoService.create(tipoDecisao));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoDecisao>>): void {
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

  protected updateForm(tipoDecisao: ITipoDecisao): void {
    this.editForm.patchValue({
      id: tipoDecisao.id,
      descricao: tipoDecisao.descricao,
    });
  }

  protected createFromForm(): ITipoDecisao {
    return {
      ...new TipoDecisao(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
    };
  }
}
