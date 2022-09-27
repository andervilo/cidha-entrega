import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IRepresentanteLegal, RepresentanteLegal } from '../representante-legal.model';
import { RepresentanteLegalService } from '../service/representante-legal.service';
import { ITipoRepresentante } from 'app/entities/tipo-representante/tipo-representante.model';
import { TipoRepresentanteService } from 'app/entities/tipo-representante/service/tipo-representante.service';

@Component({
  selector: 'jhi-representante-legal-update',
  templateUrl: './representante-legal-update.component.html',
})
export class RepresentanteLegalUpdateComponent implements OnInit {
  isSaving = false;

  tipoRepresentantesSharedCollection: ITipoRepresentante[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    tipoRepresentante: [],
  });

  constructor(
    protected representanteLegalService: RepresentanteLegalService,
    protected tipoRepresentanteService: TipoRepresentanteService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ representanteLegal }) => {
      this.updateForm(representanteLegal);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const representanteLegal = this.createFromForm();
    if (representanteLegal.id !== undefined) {
      this.subscribeToSaveResponse(this.representanteLegalService.update(representanteLegal));
    } else {
      this.subscribeToSaveResponse(this.representanteLegalService.create(representanteLegal));
    }
  }

  trackTipoRepresentanteById(_index: number, item: ITipoRepresentante): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRepresentanteLegal>>): void {
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

  protected updateForm(representanteLegal: IRepresentanteLegal): void {
    this.editForm.patchValue({
      id: representanteLegal.id,
      nome: representanteLegal.nome,
      tipoRepresentante: representanteLegal.tipoRepresentante,
    });

    this.tipoRepresentantesSharedCollection = this.tipoRepresentanteService.addTipoRepresentanteToCollectionIfMissing(
      this.tipoRepresentantesSharedCollection,
      representanteLegal.tipoRepresentante
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tipoRepresentanteService
      .query()
      .pipe(map((res: HttpResponse<ITipoRepresentante[]>) => res.body ?? []))
      .pipe(
        map((tipoRepresentantes: ITipoRepresentante[]) =>
          this.tipoRepresentanteService.addTipoRepresentanteToCollectionIfMissing(
            tipoRepresentantes,
            this.editForm.get('tipoRepresentante')!.value
          )
        )
      )
      .subscribe((tipoRepresentantes: ITipoRepresentante[]) => (this.tipoRepresentantesSharedCollection = tipoRepresentantes));
  }

  protected createFromForm(): IRepresentanteLegal {
    return {
      ...new RepresentanteLegal(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      tipoRepresentante: this.editForm.get(['tipoRepresentante'])!.value,
    };
  }
}
