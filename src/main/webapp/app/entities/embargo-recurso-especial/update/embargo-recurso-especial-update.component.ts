import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEmbargoRecursoEspecial, EmbargoRecursoEspecial } from '../embargo-recurso-especial.model';
import { EmbargoRecursoEspecialService } from '../service/embargo-recurso-especial.service';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

@Component({
  selector: 'jhi-embargo-recurso-especial-update',
  templateUrl: './embargo-recurso-especial-update.component.html',
})
export class EmbargoRecursoEspecialUpdateComponent implements OnInit {
  isSaving = false;

  processosSharedCollection: IProcesso[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    processo: [],
  });

  constructor(
    protected embargoRecursoEspecialService: EmbargoRecursoEspecialService,
    protected processoService: ProcessoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ embargoRecursoEspecial }) => {
      this.updateForm(embargoRecursoEspecial);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const embargoRecursoEspecial = this.createFromForm();
    if (embargoRecursoEspecial.id !== undefined) {
      this.subscribeToSaveResponse(this.embargoRecursoEspecialService.update(embargoRecursoEspecial));
    } else {
      this.subscribeToSaveResponse(this.embargoRecursoEspecialService.create(embargoRecursoEspecial));
    }
  }

  trackProcessoById(_index: number, item: IProcesso): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmbargoRecursoEspecial>>): void {
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

  protected updateForm(embargoRecursoEspecial: IEmbargoRecursoEspecial): void {
    this.editForm.patchValue({
      id: embargoRecursoEspecial.id,
      descricao: embargoRecursoEspecial.descricao,
      processo: embargoRecursoEspecial.processo,
    });

    this.processosSharedCollection = this.processoService.addProcessoToCollectionIfMissing(
      this.processosSharedCollection,
      embargoRecursoEspecial.processo
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

  protected createFromForm(): IEmbargoRecursoEspecial {
    return {
      ...new EmbargoRecursoEspecial(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      processo: this.editForm.get(['processo'])!.value,
    };
  }
}
