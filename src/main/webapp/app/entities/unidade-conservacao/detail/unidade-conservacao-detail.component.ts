import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUnidadeConservacao } from '../unidade-conservacao.model';

@Component({
  selector: 'jhi-unidade-conservacao-detail',
  templateUrl: './unidade-conservacao-detail.component.html',
})
export class UnidadeConservacaoDetailComponent implements OnInit {
  unidadeConservacao: IUnidadeConservacao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unidadeConservacao }) => {
      this.unidadeConservacao = unidadeConservacao;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
