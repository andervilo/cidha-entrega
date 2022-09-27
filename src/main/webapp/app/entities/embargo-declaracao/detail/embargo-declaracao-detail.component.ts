import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmbargoDeclaracao } from '../embargo-declaracao.model';

@Component({
  selector: 'jhi-embargo-declaracao-detail',
  templateUrl: './embargo-declaracao-detail.component.html',
})
export class EmbargoDeclaracaoDetailComponent implements OnInit {
  embargoDeclaracao: IEmbargoDeclaracao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ embargoDeclaracao }) => {
      this.embargoDeclaracao = embargoDeclaracao;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
