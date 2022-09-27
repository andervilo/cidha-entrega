import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IData, Data } from '../data.model';
import { DataService } from '../service/data.service';
import { ITipoData } from 'app/entities/tipo-data/tipo-data.model';
import { TipoDataService } from 'app/entities/tipo-data/service/tipo-data.service';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

@Component({
  selector: 'jhi-data-update',
  templateUrl: './data-update.component.html',
})
export class DataUpdateComponent implements OnInit {
  isSaving = false;

  tipoDataCollection: ITipoData[] = [];
  processosSharedCollection: IProcesso[] = [];

  editForm = this.fb.group({
    id: [],
    data: [],
    tipoData: [],
    processo: [],
  });

  constructor(
    protected dataService: DataService,
    protected tipoDataService: TipoDataService,
    protected processoService: ProcessoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.updateForm(data);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const data = this.createFromForm();
    if (data.id !== undefined) {
      this.subscribeToSaveResponse(this.dataService.update(data));
    } else {
      this.subscribeToSaveResponse(this.dataService.create(data));
    }
  }

  trackTipoDataById(_index: number, item: ITipoData): number {
    return item.id!;
  }

  trackProcessoById(_index: number, item: IProcesso): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IData>>): void {
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

  protected updateForm(data: IData): void {
    this.editForm.patchValue({
      id: data.id,
      data: data.data,
      tipoData: data.tipoData,
      processo: data.processo,
    });

    this.tipoDataCollection = this.tipoDataService.addTipoDataToCollectionIfMissing(this.tipoDataCollection, data.tipoData);
    this.processosSharedCollection = this.processoService.addProcessoToCollectionIfMissing(this.processosSharedCollection, data.processo);
  }

  protected loadRelationshipsOptions(): void {
    this.tipoDataService
      .query({ 'dataId.specified': 'false' })
      .pipe(map((res: HttpResponse<ITipoData[]>) => res.body ?? []))
      .pipe(
        map((tipoData: ITipoData[]) =>
          this.tipoDataService.addTipoDataToCollectionIfMissing(tipoData, this.editForm.get('tipoData')!.value)
        )
      )
      .subscribe((tipoData: ITipoData[]) => (this.tipoDataCollection = tipoData));

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

  protected createFromForm(): IData {
    return {
      ...new Data(),
      id: this.editForm.get(['id'])!.value,
      data: this.editForm.get(['data'])!.value,
      tipoData: this.editForm.get(['tipoData'])!.value,
      processo: this.editForm.get(['processo'])!.value,
    };
  }
}
