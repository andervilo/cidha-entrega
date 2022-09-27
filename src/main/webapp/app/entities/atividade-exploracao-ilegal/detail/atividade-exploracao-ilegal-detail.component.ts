import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAtividadeExploracaoIlegal } from '../atividade-exploracao-ilegal.model';

@Component({
  selector: 'jhi-atividade-exploracao-ilegal-detail',
  templateUrl: './atividade-exploracao-ilegal-detail.component.html',
})
export class AtividadeExploracaoIlegalDetailComponent implements OnInit {
  atividadeExploracaoIlegal: IAtividadeExploracaoIlegal | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ atividadeExploracaoIlegal }) => {
      this.atividadeExploracaoIlegal = atividadeExploracaoIlegal;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
