import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IUnidadeConservacao, UnidadeConservacao } from '../unidade-conservacao.model';
import { UnidadeConservacaoService } from '../service/unidade-conservacao.service';

@Component({
  selector: 'jhi-unidade-conservacao-update',
  templateUrl: './unidade-conservacao-update.component.html',
})
export class UnidadeConservacaoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [],
  });

  constructor(
    protected unidadeConservacaoService: UnidadeConservacaoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unidadeConservacao }) => {
      this.updateForm(unidadeConservacao);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const unidadeConservacao = this.createFromForm();
    if (unidadeConservacao.id !== undefined) {
      this.subscribeToSaveResponse(this.unidadeConservacaoService.update(unidadeConservacao));
    } else {
      this.subscribeToSaveResponse(this.unidadeConservacaoService.create(unidadeConservacao));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUnidadeConservacao>>): void {
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

  protected updateForm(unidadeConservacao: IUnidadeConservacao): void {
    this.editForm.patchValue({
      id: unidadeConservacao.id,
      descricao: unidadeConservacao.descricao,
    });
  }

  protected createFromForm(): IUnidadeConservacao {
    return {
      ...new UnidadeConservacao(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
    };
  }
}
