import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISecaoJudiciaria } from '../secao-judiciaria.model';

@Component({
  selector: 'jhi-secao-judiciaria-detail',
  templateUrl: './secao-judiciaria-detail.component.html',
})
export class SecaoJudiciariaDetailComponent implements OnInit {
  secaoJudiciaria: ISecaoJudiciaria | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ secaoJudiciaria }) => {
      this.secaoJudiciaria = secaoJudiciaria;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
