import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEmbargoRespRe, EmbargoRespRe } from '../embargo-resp-re.model';
import { EmbargoRespReService } from '../service/embargo-resp-re.service';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

@Component({
  selector: 'jhi-embargo-resp-re-update',
  templateUrl: './embargo-resp-re-update.component.html',
})
export class EmbargoRespReUpdateComponent implements OnInit {
  isSaving = false;

  processosSharedCollection: IProcesso[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    processo: [],
  });

  constructor(
    protected embargoRespReService: EmbargoRespReService,
    protected processoService: ProcessoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ embargoRespRe }) => {
      this.updateForm(embargoRespRe);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const embargoRespRe = this.createFromForm();
    if (embargoRespRe.id !== undefined) {
      this.subscribeToSaveResponse(this.embargoRespReService.update(embargoRespRe));
    } else {
      this.subscribeToSaveResponse(this.embargoRespReService.create(embargoRespRe));
    }
  }

  trackProcessoById(_index: number, item: IProcesso): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmbargoRespRe>>): void {
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

  protected updateForm(embargoRespRe: IEmbargoRespRe): void {
    this.editForm.patchValue({
      id: embargoRespRe.id,
      descricao: embargoRespRe.descricao,
      processo: embargoRespRe.processo,
    });

    this.processosSharedCollection = this.processoService.addProcessoToCollectionIfMissing(
      this.processosSharedCollection,
      embargoRespRe.processo
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

  protected createFromForm(): IEmbargoRespRe {
    return {
      ...new EmbargoRespRe(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      processo: this.editForm.get(['processo'])!.value,
    };
  }
}
