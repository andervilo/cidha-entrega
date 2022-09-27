import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IAtividadeExploracaoIlegal, AtividadeExploracaoIlegal } from '../atividade-exploracao-ilegal.model';
import { AtividadeExploracaoIlegalService } from '../service/atividade-exploracao-ilegal.service';

@Component({
  selector: 'jhi-atividade-exploracao-ilegal-update',
  templateUrl: './atividade-exploracao-ilegal-update.component.html',
})
export class AtividadeExploracaoIlegalUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [],
  });

  constructor(
    protected atividadeExploracaoIlegalService: AtividadeExploracaoIlegalService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ atividadeExploracaoIlegal }) => {
      this.updateForm(atividadeExploracaoIlegal);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const atividadeExploracaoIlegal = this.createFromForm();
    if (atividadeExploracaoIlegal.id !== undefined) {
      this.subscribeToSaveResponse(this.atividadeExploracaoIlegalService.update(atividadeExploracaoIlegal));
    } else {
      this.subscribeToSaveResponse(this.atividadeExploracaoIlegalService.create(atividadeExploracaoIlegal));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAtividadeExploracaoIlegal>>): void {
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

  protected updateForm(atividadeExploracaoIlegal: IAtividadeExploracaoIlegal): void {
    this.editForm.patchValue({
      id: atividadeExploracaoIlegal.id,
      descricao: atividadeExploracaoIlegal.descricao,
    });
  }

  protected createFromForm(): IAtividadeExploracaoIlegal {
    return {
      ...new AtividadeExploracaoIlegal(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
    };
  }
}
