import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEmbargoDeclaracaoAgravo, EmbargoDeclaracaoAgravo } from '../embargo-declaracao-agravo.model';
import { EmbargoDeclaracaoAgravoService } from '../service/embargo-declaracao-agravo.service';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

@Component({
  selector: 'jhi-embargo-declaracao-agravo-update',
  templateUrl: './embargo-declaracao-agravo-update.component.html',
})
export class EmbargoDeclaracaoAgravoUpdateComponent implements OnInit {
  isSaving = false;

  processosSharedCollection: IProcesso[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    processo: [],
  });

  constructor(
    protected embargoDeclaracaoAgravoService: EmbargoDeclaracaoAgravoService,
    protected processoService: ProcessoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ embargoDeclaracaoAgravo }) => {
      this.updateForm(embargoDeclaracaoAgravo);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const embargoDeclaracaoAgravo = this.createFromForm();
    if (embargoDeclaracaoAgravo.id !== undefined) {
      this.subscribeToSaveResponse(this.embargoDeclaracaoAgravoService.update(embargoDeclaracaoAgravo));
    } else {
      this.subscribeToSaveResponse(this.embargoDeclaracaoAgravoService.create(embargoDeclaracaoAgravo));
    }
  }

  trackProcessoById(_index: number, item: IProcesso): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmbargoDeclaracaoAgravo>>): void {
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

  protected updateForm(embargoDeclaracaoAgravo: IEmbargoDeclaracaoAgravo): void {
    this.editForm.patchValue({
      id: embargoDeclaracaoAgravo.id,
      descricao: embargoDeclaracaoAgravo.descricao,
      processo: embargoDeclaracaoAgravo.processo,
    });

    this.processosSharedCollection = this.processoService.addProcessoToCollectionIfMissing(
      this.processosSharedCollection,
      embargoDeclaracaoAgravo.processo
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

  protected createFromForm(): IEmbargoDeclaracaoAgravo {
    return {
      ...new EmbargoDeclaracaoAgravo(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      processo: this.editForm.get(['processo'])!.value,
    };
  }
}
