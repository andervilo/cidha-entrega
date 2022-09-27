import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITerraIndigena, TerraIndigena } from '../terra-indigena.model';
import { TerraIndigenaService } from '../service/terra-indigena.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IEtniaIndigena } from 'app/entities/etnia-indigena/etnia-indigena.model';
import { EtniaIndigenaService } from 'app/entities/etnia-indigena/service/etnia-indigena.service';

@Component({
  selector: 'jhi-terra-indigena-update',
  templateUrl: './terra-indigena-update.component.html',
})
export class TerraIndigenaUpdateComponent implements OnInit {
  isSaving = false;

  etniaIndigenasSharedCollection: IEtniaIndigena[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    etnias: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected terraIndigenaService: TerraIndigenaService,
    protected etniaIndigenaService: EtniaIndigenaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ terraIndigena }) => {
      this.updateForm(terraIndigena);

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
    const terraIndigena = this.createFromForm();
    if (terraIndigena.id !== undefined) {
      this.subscribeToSaveResponse(this.terraIndigenaService.update(terraIndigena));
    } else {
      this.subscribeToSaveResponse(this.terraIndigenaService.create(terraIndigena));
    }
  }

  trackEtniaIndigenaById(_index: number, item: IEtniaIndigena): number {
    return item.id!;
  }

  getSelectedEtniaIndigena(option: IEtniaIndigena, selectedVals?: IEtniaIndigena[]): IEtniaIndigena {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITerraIndigena>>): void {
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

  protected updateForm(terraIndigena: ITerraIndigena): void {
    this.editForm.patchValue({
      id: terraIndigena.id,
      descricao: terraIndigena.descricao,
      etnias: terraIndigena.etnias,
    });

    this.etniaIndigenasSharedCollection = this.etniaIndigenaService.addEtniaIndigenaToCollectionIfMissing(
      this.etniaIndigenasSharedCollection,
      ...(terraIndigena.etnias ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.etniaIndigenaService
      .query()
      .pipe(map((res: HttpResponse<IEtniaIndigena[]>) => res.body ?? []))
      .pipe(
        map((etniaIndigenas: IEtniaIndigena[]) =>
          this.etniaIndigenaService.addEtniaIndigenaToCollectionIfMissing(etniaIndigenas, ...(this.editForm.get('etnias')!.value ?? []))
        )
      )
      .subscribe((etniaIndigenas: IEtniaIndigena[]) => (this.etniaIndigenasSharedCollection = etniaIndigenas));
  }

  protected createFromForm(): ITerraIndigena {
    return {
      ...new TerraIndigena(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      etnias: this.editForm.get(['etnias'])!.value,
    };
  }
}
