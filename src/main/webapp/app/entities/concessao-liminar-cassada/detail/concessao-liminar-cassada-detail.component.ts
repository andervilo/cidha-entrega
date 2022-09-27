import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConcessaoLiminarCassada } from '../concessao-liminar-cassada.model';

@Component({
  selector: 'jhi-concessao-liminar-cassada-detail',
  templateUrl: './concessao-liminar-cassada-detail.component.html',
})
export class ConcessaoLiminarCassadaDetailComponent implements OnInit {
  concessaoLiminarCassada: IConcessaoLiminarCassada | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ concessaoLiminarCassada }) => {
      this.concessaoLiminarCassada = concessaoLiminarCassada;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
