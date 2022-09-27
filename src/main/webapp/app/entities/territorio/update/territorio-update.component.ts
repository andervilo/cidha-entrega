import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITerritorio, Territorio } from '../territorio.model';
import { TerritorioService } from '../service/territorio.service';

@Component({
  selector: 'jhi-territorio-update',
  templateUrl: './territorio-update.component.html',
})
export class TerritorioUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
  });

  constructor(protected territorioService: TerritorioService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ territorio }) => {
      this.updateForm(territorio);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const territorio = this.createFromForm();
    if (territorio.id !== undefined) {
      this.subscribeToSaveResponse(this.territorioService.update(territorio));
    } else {
      this.subscribeToSaveResponse(this.territorioService.create(territorio));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITerritorio>>): void {
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

  protected updateForm(territorio: ITerritorio): void {
    this.editForm.patchValue({
      id: territorio.id,
      nome: territorio.nome,
    });
  }

  protected createFromForm(): ITerritorio {
    return {
      ...new Territorio(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
    };
  }
}
