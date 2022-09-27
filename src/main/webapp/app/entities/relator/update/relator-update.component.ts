import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IRelator, Relator } from '../relator.model';
import { RelatorService } from '../service/relator.service';

@Component({
  selector: 'jhi-relator-update',
  templateUrl: './relator-update.component.html',
})
export class RelatorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
  });

  constructor(protected relatorService: RelatorService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ relator }) => {
      this.updateForm(relator);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const relator = this.createFromForm();
    if (relator.id !== undefined) {
      this.subscribeToSaveResponse(this.relatorService.update(relator));
    } else {
      this.subscribeToSaveResponse(this.relatorService.create(relator));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRelator>>): void {
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

  protected updateForm(relator: IRelator): void {
    this.editForm.patchValue({
      id: relator.id,
      nome: relator.nome,
    });
  }

  protected createFromForm(): IRelator {
    return {
      ...new Relator(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
    };
  }
}
