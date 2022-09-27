import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISecaoJudiciaria, SecaoJudiciaria } from '../secao-judiciaria.model';
import { SecaoJudiciariaService } from '../service/secao-judiciaria.service';
import { ISubsecaoJudiciaria } from 'app/entities/subsecao-judiciaria/subsecao-judiciaria.model';
import { SubsecaoJudiciariaService } from 'app/entities/subsecao-judiciaria/service/subsecao-judiciaria.service';

@Component({
  selector: 'jhi-secao-judiciaria-update',
  templateUrl: './secao-judiciaria-update.component.html',
})
export class SecaoJudiciariaUpdateComponent implements OnInit {
  isSaving = false;

  subsecaoJudiciariasSharedCollection: ISubsecaoJudiciaria[] = [];

  editForm = this.fb.group({
    id: [],
    sigla: [],
    nome: [],
    subsecaoJudiciaria: [],
  });

  constructor(
    protected secaoJudiciariaService: SecaoJudiciariaService,
    protected subsecaoJudiciariaService: SubsecaoJudiciariaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ secaoJudiciaria }) => {
      this.updateForm(secaoJudiciaria);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const secaoJudiciaria = this.createFromForm();
    if (secaoJudiciaria.id !== undefined) {
      this.subscribeToSaveResponse(this.secaoJudiciariaService.update(secaoJudiciaria));
    } else {
      this.subscribeToSaveResponse(this.secaoJudiciariaService.create(secaoJudiciaria));
    }
  }

  trackSubsecaoJudiciariaById(_index: number, item: ISubsecaoJudiciaria): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISecaoJudiciaria>>): void {
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

  protected updateForm(secaoJudiciaria: ISecaoJudiciaria): void {
    this.editForm.patchValue({
      id: secaoJudiciaria.id,
      sigla: secaoJudiciaria.sigla,
      nome: secaoJudiciaria.nome,
      subsecaoJudiciaria: secaoJudiciaria.subsecaoJudiciaria,
    });

    this.subsecaoJudiciariasSharedCollection = this.subsecaoJudiciariaService.addSubsecaoJudiciariaToCollectionIfMissing(
      this.subsecaoJudiciariasSharedCollection,
      secaoJudiciaria.subsecaoJudiciaria
    );
  }

  protected loadRelationshipsOptions(): void {
    this.subsecaoJudiciariaService
      .query()
      .pipe(map((res: HttpResponse<ISubsecaoJudiciaria[]>) => res.body ?? []))
      .pipe(
        map((subsecaoJudiciarias: ISubsecaoJudiciaria[]) =>
          this.subsecaoJudiciariaService.addSubsecaoJudiciariaToCollectionIfMissing(
            subsecaoJudiciarias,
            this.editForm.get('subsecaoJudiciaria')!.value
          )
        )
      )
      .subscribe((subsecaoJudiciarias: ISubsecaoJudiciaria[]) => (this.subsecaoJudiciariasSharedCollection = subsecaoJudiciarias));
  }

  protected createFromForm(): ISecaoJudiciaria {
    return {
      ...new SecaoJudiciaria(),
      id: this.editForm.get(['id'])!.value,
      sigla: this.editForm.get(['sigla'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      subsecaoJudiciaria: this.editForm.get(['subsecaoJudiciaria'])!.value,
    };
  }
}
