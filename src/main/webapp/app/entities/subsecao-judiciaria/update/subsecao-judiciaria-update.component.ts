import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ISubsecaoJudiciaria, SubsecaoJudiciaria } from '../subsecao-judiciaria.model';
import { SubsecaoJudiciariaService } from '../service/subsecao-judiciaria.service';

@Component({
  selector: 'jhi-subsecao-judiciaria-update',
  templateUrl: './subsecao-judiciaria-update.component.html',
})
export class SubsecaoJudiciariaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    sigla: [],
    nome: [],
  });

  constructor(
    protected subsecaoJudiciariaService: SubsecaoJudiciariaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subsecaoJudiciaria }) => {
      this.updateForm(subsecaoJudiciaria);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subsecaoJudiciaria = this.createFromForm();
    if (subsecaoJudiciaria.id !== undefined) {
      this.subscribeToSaveResponse(this.subsecaoJudiciariaService.update(subsecaoJudiciaria));
    } else {
      this.subscribeToSaveResponse(this.subsecaoJudiciariaService.create(subsecaoJudiciaria));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubsecaoJudiciaria>>): void {
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

  protected updateForm(subsecaoJudiciaria: ISubsecaoJudiciaria): void {
    this.editForm.patchValue({
      id: subsecaoJudiciaria.id,
      sigla: subsecaoJudiciaria.sigla,
      nome: subsecaoJudiciaria.nome,
    });
  }

  protected createFromForm(): ISubsecaoJudiciaria {
    return {
      ...new SubsecaoJudiciaria(),
      id: this.editForm.get(['id'])!.value,
      sigla: this.editForm.get(['sigla'])!.value,
      nome: this.editForm.get(['nome'])!.value,
    };
  }
}
