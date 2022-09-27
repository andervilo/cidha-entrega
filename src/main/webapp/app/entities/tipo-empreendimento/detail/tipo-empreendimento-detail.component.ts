import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoEmpreendimento } from '../tipo-empreendimento.model';

@Component({
  selector: 'jhi-tipo-empreendimento-detail',
  templateUrl: './tipo-empreendimento-detail.component.html',
})
export class TipoEmpreendimentoDetailComponent implements OnInit {
  tipoEmpreendimento: ITipoEmpreendimento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoEmpreendimento }) => {
      this.tipoEmpreendimento = tipoEmpreendimento;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
