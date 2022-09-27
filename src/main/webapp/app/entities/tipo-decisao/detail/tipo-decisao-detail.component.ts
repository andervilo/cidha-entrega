import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoDecisao } from '../tipo-decisao.model';

@Component({
  selector: 'jhi-tipo-decisao-detail',
  templateUrl: './tipo-decisao-detail.component.html',
})
export class TipoDecisaoDetailComponent implements OnInit {
  tipoDecisao: ITipoDecisao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoDecisao }) => {
      this.tipoDecisao = tipoDecisao;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
