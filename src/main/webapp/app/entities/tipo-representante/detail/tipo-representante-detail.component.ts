import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoRepresentante } from '../tipo-representante.model';

@Component({
  selector: 'jhi-tipo-representante-detail',
  templateUrl: './tipo-representante-detail.component.html',
})
export class TipoRepresentanteDetailComponent implements OnInit {
  tipoRepresentante: ITipoRepresentante | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoRepresentante }) => {
      this.tipoRepresentante = tipoRepresentante;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
