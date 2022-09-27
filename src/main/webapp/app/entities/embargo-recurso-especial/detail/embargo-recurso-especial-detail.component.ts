import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmbargoRecursoEspecial } from '../embargo-recurso-especial.model';

@Component({
  selector: 'jhi-embargo-recurso-especial-detail',
  templateUrl: './embargo-recurso-especial-detail.component.html',
})
export class EmbargoRecursoEspecialDetailComponent implements OnInit {
  embargoRecursoEspecial: IEmbargoRecursoEspecial | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ embargoRecursoEspecial }) => {
      this.embargoRecursoEspecial = embargoRecursoEspecial;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
