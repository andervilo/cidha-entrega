import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IParteInteresssada, ParteInteresssada } from '../parte-interesssada.model';
import { ParteInteresssadaService } from '../service/parte-interesssada.service';
import { IRepresentanteLegal } from 'app/entities/representante-legal/representante-legal.model';
import { RepresentanteLegalService } from 'app/entities/representante-legal/service/representante-legal.service';

@Component({
  selector: 'jhi-parte-interesssada-update',
  templateUrl: './parte-interesssada-update.component.html',
})
export class ParteInteresssadaUpdateComponent implements OnInit {
  isSaving = false;

  representanteLegalsSharedCollection: IRepresentanteLegal[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    classificacao: [],
    representanteLegals: [],
  });

  constructor(
    protected parteInteresssadaService: ParteInteresssadaService,
    protected representanteLegalService: RepresentanteLegalService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parteInteresssada }) => {
      this.updateForm(parteInteresssada);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const parteInteresssada = this.createFromForm();
    if (parteInteresssada.id !== undefined) {
      this.subscribeToSaveResponse(this.parteInteresssadaService.update(parteInteresssada));
    } else {
      this.subscribeToSaveResponse(this.parteInteresssadaService.create(parteInteresssada));
    }
  }

  trackRepresentanteLegalById(_index: number, item: IRepresentanteLegal): number {
    return item.id!;
  }

  getSelectedRepresentanteLegal(option: IRepresentanteLegal, selectedVals?: IRepresentanteLegal[]): IRepresentanteLegal {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParteInteresssada>>): void {
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

  protected updateForm(parteInteresssada: IParteInteresssada): void {
    this.editForm.patchValue({
      id: parteInteresssada.id,
      nome: parteInteresssada.nome,
      classificacao: parteInteresssada.classificacao,
      representanteLegals: parteInteresssada.representanteLegals,
    });

    this.representanteLegalsSharedCollection = this.representanteLegalService.addRepresentanteLegalToCollectionIfMissing(
      this.representanteLegalsSharedCollection,
      ...(parteInteresssada.representanteLegals ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.representanteLegalService
      .query()
      .pipe(map((res: HttpResponse<IRepresentanteLegal[]>) => res.body ?? []))
      .pipe(
        map((representanteLegals: IRepresentanteLegal[]) =>
          this.representanteLegalService.addRepresentanteLegalToCollectionIfMissing(
            representanteLegals,
            ...(this.editForm.get('representanteLegals')!.value ?? [])
          )
        )
      )
      .subscribe((representanteLegals: IRepresentanteLegal[]) => (this.representanteLegalsSharedCollection = representanteLegals));
  }

  protected createFromForm(): IParteInteresssada {
    return {
      ...new ParteInteresssada(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      classificacao: this.editForm.get(['classificacao'])!.value,
      representanteLegals: this.editForm.get(['representanteLegals'])!.value,
    };
  }
}
