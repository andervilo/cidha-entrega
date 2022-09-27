import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITipoEmpreendimento, TipoEmpreendimento } from '../tipo-empreendimento.model';
import { TipoEmpreendimentoService } from '../service/tipo-empreendimento.service';

@Component({
  selector: 'jhi-tipo-empreendimento-update',
  templateUrl: './tipo-empreendimento-update.component.html',
})
export class TipoEmpreendimentoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [],
  });

  constructor(
    protected tipoEmpreendimentoService: TipoEmpreendimentoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoEmpreendimento }) => {
      this.updateForm(tipoEmpreendimento);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoEmpreendimento = this.createFromForm();
    if (tipoEmpreendimento.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoEmpreendimentoService.update(tipoEmpreendimento));
    } else {
      this.subscribeToSaveResponse(this.tipoEmpreendimentoService.create(tipoEmpreendimento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoEmpreendimento>>): void {
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

  protected updateForm(tipoEmpreendimento: ITipoEmpreendimento): void {
    this.editForm.patchValue({
      id: tipoEmpreendimento.id,
      descricao: tipoEmpreendimento.descricao,
    });
  }

  protected createFromForm(): ITipoEmpreendimento {
    return {
      ...new TipoEmpreendimento(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
    };
  }
}
