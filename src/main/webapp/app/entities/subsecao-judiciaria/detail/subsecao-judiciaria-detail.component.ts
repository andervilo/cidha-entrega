import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubsecaoJudiciaria } from '../subsecao-judiciaria.model';

@Component({
  selector: 'jhi-subsecao-judiciaria-detail',
  templateUrl: './subsecao-judiciaria-detail.component.html',
})
export class SubsecaoJudiciariaDetailComponent implements OnInit {
  subsecaoJudiciaria: ISubsecaoJudiciaria | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subsecaoJudiciaria }) => {
      this.subsecaoJudiciaria = subsecaoJudiciaria;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
