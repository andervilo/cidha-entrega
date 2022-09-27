import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IConcessaoLiminar, ConcessaoLiminar } from '../concessao-liminar.model';
import { ConcessaoLiminarService } from '../service/concessao-liminar.service';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

@Component({
  selector: 'jhi-concessao-liminar-update',
  templateUrl: './concessao-liminar-update.component.html',
})
export class ConcessaoLiminarUpdateComponent implements OnInit {
  isSaving = false;

  processosSharedCollection: IProcesso[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    processo: [],
  });

  constructor(
    protected concessaoLiminarService: ConcessaoLiminarService,
    protected processoService: ProcessoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ concessaoLiminar }) => {
      this.updateForm(concessaoLiminar);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const concessaoLiminar = this.createFromForm();
    if (concessaoLiminar.id !== undefined) {
      this.subscribeToSaveResponse(this.concessaoLiminarService.update(concessaoLiminar));
    } else {
      this.subscribeToSaveResponse(this.concessaoLiminarService.create(concessaoLiminar));
    }
  }

  trackProcessoById(_index: number, item: IProcesso): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConcessaoLiminar>>): void {
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

  protected updateForm(concessaoLiminar: IConcessaoLiminar): void {
    this.editForm.patchValue({
      id: concessaoLiminar.id,
      descricao: concessaoLiminar.descricao,
      processo: concessaoLiminar.processo,
    });

    this.processosSharedCollection = this.processoService.addProcessoToCollectionIfMissing(
      this.processosSharedCollection,
      concessaoLiminar.processo
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

  protected createFromForm(): IConcessaoLiminar {
    return {
      ...new ConcessaoLiminar(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      processo: this.editForm.get(['processo'])!.value,
    };
  }
}
