import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoRecurso } from '../tipo-recurso.model';

@Component({
  selector: 'jhi-tipo-recurso-detail',
  templateUrl: './tipo-recurso-detail.component.html',
})
export class TipoRecursoDetailComponent implements OnInit {
  tipoRecurso: ITipoRecurso | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoRecurso }) => {
      this.tipoRecurso = tipoRecurso;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
