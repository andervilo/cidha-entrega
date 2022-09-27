import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IRecurso, Recurso } from '../recurso.model';
import { RecursoService } from '../service/recurso.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ITipoRecurso } from 'app/entities/tipo-recurso/tipo-recurso.model';
import { TipoRecursoService } from 'app/entities/tipo-recurso/service/tipo-recurso.service';
import { IOpcaoRecurso } from 'app/entities/opcao-recurso/opcao-recurso.model';
import { OpcaoRecursoService } from 'app/entities/opcao-recurso/service/opcao-recurso.service';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

@Component({
  selector: 'jhi-recurso-update',
  templateUrl: './recurso-update.component.html',
})
export class RecursoUpdateComponent implements OnInit {
  isSaving = false;

  tipoRecursosCollection: ITipoRecurso[] = [];
  opcaoRecursosCollection: IOpcaoRecurso[] = [];
  processosSharedCollection: IProcesso[] = [];

  editForm = this.fb.group({
    id: [],
    observacoes: [],
    tipoRecurso: [],
    opcaoRecurso: [],
    processo: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected recursoService: RecursoService,
    protected tipoRecursoService: TipoRecursoService,
    protected opcaoRecursoService: OpcaoRecursoService,
    protected processoService: ProcessoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recurso }) => {
      this.updateForm(recurso);

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('cidhaApp.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const recurso = this.createFromForm();
    if (recurso.id !== undefined) {
      this.subscribeToSaveResponse(this.recursoService.update(recurso));
    } else {
      this.subscribeToSaveResponse(this.recursoService.create(recurso));
    }
  }

  trackTipoRecursoById(_index: number, item: ITipoRecurso): number {
    return item.id!;
  }

  trackOpcaoRecursoById(_index: number, item: IOpcaoRecurso): number {
    return item.id!;
  }

  trackProcessoById(_index: number, item: IProcesso): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecurso>>): void {
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

  protected updateForm(recurso: IRecurso): void {
    this.editForm.patchValue({
      id: recurso.id,
      observacoes: recurso.observacoes,
      tipoRecurso: recurso.tipoRecurso,
      opcaoRecurso: recurso.opcaoRecurso,
      processo: recurso.processo,
    });

    this.tipoRecursosCollection = this.tipoRecursoService.addTipoRecursoToCollectionIfMissing(
      this.tipoRecursosCollection,
      recurso.tipoRecurso
    );
    this.opcaoRecursosCollection = this.opcaoRecursoService.addOpcaoRecursoToCollectionIfMissing(
      this.opcaoRecursosCollection,
      recurso.opcaoRecurso
    );
    this.processosSharedCollection = this.processoService.addProcessoToCollectionIfMissing(
      this.processosSharedCollection,
      recurso.processo
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tipoRecursoService
      .query({ 'recursoId.specified': 'false' })
      .pipe(map((res: HttpResponse<ITipoRecurso[]>) => res.body ?? []))
      .pipe(
        map((tipoRecursos: ITipoRecurso[]) =>
          this.tipoRecursoService.addTipoRecursoToCollectionIfMissing(tipoRecursos, this.editForm.get('tipoRecurso')!.value)
        )
      )
      .subscribe((tipoRecursos: ITipoRecurso[]) => (this.tipoRecursosCollection = tipoRecursos));

    this.opcaoRecursoService
      .query({ 'recursoId.specified': 'false' })
      .pipe(map((res: HttpResponse<IOpcaoRecurso[]>) => res.body ?? []))
      .pipe(
        map((opcaoRecursos: IOpcaoRecurso[]) =>
          this.opcaoRecursoService.addOpcaoRecursoToCollectionIfMissing(opcaoRecursos, this.editForm.get('opcaoRecurso')!.value)
        )
      )
      .subscribe((opcaoRecursos: IOpcaoRecurso[]) => (this.opcaoRecursosCollection = opcaoRecursos));

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

  protected createFromForm(): IRecurso {
    return {
      ...new Recurso(),
      id: this.editForm.get(['id'])!.value,
      observacoes: this.editForm.get(['observacoes'])!.value,
      tipoRecurso: this.editForm.get(['tipoRecurso'])!.value,
      opcaoRecurso: this.editForm.get(['opcaoRecurso'])!.value,
      processo: this.editForm.get(['processo'])!.value,
    };
  }
}
