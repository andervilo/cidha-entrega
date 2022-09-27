import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOpcaoRecurso } from '../opcao-recurso.model';

@Component({
  selector: 'jhi-opcao-recurso-detail',
  templateUrl: './opcao-recurso-detail.component.html',
})
export class OpcaoRecursoDetailComponent implements OnInit {
  opcaoRecurso: IOpcaoRecurso | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ opcaoRecurso }) => {
      this.opcaoRecurso = opcaoRecurso;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
