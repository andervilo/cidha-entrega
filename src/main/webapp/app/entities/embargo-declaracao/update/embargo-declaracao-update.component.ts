import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEmbargoDeclaracao, EmbargoDeclaracao } from '../embargo-declaracao.model';
import { EmbargoDeclaracaoService } from '../service/embargo-declaracao.service';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

@Component({
  selector: 'jhi-embargo-declaracao-update',
  templateUrl: './embargo-declaracao-update.component.html',
})
export class EmbargoDeclaracaoUpdateComponent implements OnInit {
  isSaving = false;

  processosSharedCollection: IProcesso[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    processo: [],
  });

  constructor(
    protected embargoDeclaracaoService: EmbargoDeclaracaoService,
    protected processoService: ProcessoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ embargoDeclaracao }) => {
      this.updateForm(embargoDeclaracao);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const embargoDeclaracao = this.createFromForm();
    if (embargoDeclaracao.id !== undefined) {
      this.subscribeToSaveResponse(this.embargoDeclaracaoService.update(embargoDeclaracao));
    } else {
      this.subscribeToSaveResponse(this.embargoDeclaracaoService.create(embargoDeclaracao));
    }
  }

  trackProcessoById(_index: number, item: IProcesso): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmbargoDeclaracao>>): void {
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

  protected updateForm(embargoDeclaracao: IEmbargoDeclaracao): void {
    this.editForm.patchValue({
      id: embargoDeclaracao.id,
      descricao: embargoDeclaracao.descricao,
      processo: embargoDeclaracao.processo,
    });

    this.processosSharedCollection = this.processoService.addProcessoToCollectionIfMissing(
      this.processosSharedCollection,
      embargoDeclaracao.processo
    );
  }

  protected loadRelationshipsOptions(): void {
    this.processoService
      .query()
      .pipe(map((res: HttpResponse<IProcesso[]>) => res.body ?? []))
      .pipe(
        map((processos: IProcesso[]) =>
          this.processoService.addProcessoToCollectionIfMissing(processos, this.editForm.get('processo')!.value)
        )
      )
      .subscribe((processos: IProcesso[]) => (this.processosSharedCollection = processos));
  }

  protected createFromForm(): IEmbargoDeclaracao {
    return {
      ...new EmbargoDeclaracao(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      processo: this.editForm.get(['processo'])!.value,
    };
  }
}
