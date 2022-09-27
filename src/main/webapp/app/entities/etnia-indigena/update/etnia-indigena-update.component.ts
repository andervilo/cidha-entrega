import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEtniaIndigena, EtniaIndigena } from '../etnia-indigena.model';
import { EtniaIndigenaService } from '../service/etnia-indigena.service';

@Component({
  selector: 'jhi-etnia-indigena-update',
  templateUrl: './etnia-indigena-update.component.html',
})
export class EtniaIndigenaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
  });

  constructor(protected etniaIndigenaService: EtniaIndigenaService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etniaIndigena }) => {
      this.updateForm(etniaIndigena);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const etniaIndigena = this.createFromForm();
    if (etniaIndigena.id !== undefined) {
      this.subscribeToSaveResponse(this.etniaIndigenaService.update(etniaIndigena));
    } else {
      this.subscribeToSaveResponse(this.etniaIndigenaService.create(etniaIndigena));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtniaIndigena>>): void {
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

  protected updateForm(etniaIndigena: IEtniaIndigena): void {
    this.editForm.patchValue({
      id: etniaIndigena.id,
      nome: etniaIndigena.nome,
    });
  }

  protected createFromForm(): IEtniaIndigena {
    return {
      ...new EtniaIndigena(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
    };
  }
}
