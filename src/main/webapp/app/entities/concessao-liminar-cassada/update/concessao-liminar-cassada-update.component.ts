import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IConcessaoLiminarCassada, ConcessaoLiminarCassada } from '../concessao-liminar-cassada.model';
import { ConcessaoLiminarCassadaService } from '../service/concessao-liminar-cassada.service';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

@Component({
  selector: 'jhi-concessao-liminar-cassada-update',
  templateUrl: './concessao-liminar-cassada-update.component.html',
})
export class ConcessaoLiminarCassadaUpdateComponent implements OnInit {
  isSaving = false;

  processosSharedCollection: IProcesso[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    processo: [],
  });

  constructor(
    protected concessaoLiminarCassadaService: ConcessaoLiminarCassadaService,
    protected processoService: ProcessoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ concessaoLiminarCassada }) => {
      this.updateForm(concessaoLiminarCassada);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const concessaoLiminarCassada = this.createFromForm();
    if (concessaoLiminarCassada.id !== undefined) {
      this.subscribeToSaveResponse(this.concessaoLiminarCassadaService.update(concessaoLiminarCassada));
    } else {
      this.subscribeToSaveResponse(this.concessaoLiminarCassadaService.create(concessaoLiminarCassada));
    }
  }

  trackProcessoById(_index: number, item: IProcesso): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConcessaoLiminarCassada>>): void {
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

  protected updateForm(concessaoLiminarCassada: IConcessaoLiminarCassada): void {
    this.editForm.patchValue({
      id: concessaoLiminarCassada.id,
      descricao: concessaoLiminarCassada.descricao,
      processo: concessaoLiminarCassada.processo,
    });

    this.processosSharedCollection = this.processoService.addProcessoToCollectionIfMissing(
      this.processosSharedCollection,
      concessaoLiminarCassada.processo
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

  protected createFromForm(): IConcessaoLiminarCassada {
    return {
      ...new ConcessaoLiminarCassada(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      processo: this.editForm.get(['processo'])!.value,
    };
  }
}
