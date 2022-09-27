import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParteInteresssada } from '../parte-interesssada.model';

@Component({
  selector: 'jhi-parte-interesssada-detail',
  templateUrl: './parte-interesssada-detail.component.html',
})
export class ParteInteresssadaDetailComponent implements OnInit {
  parteInteresssada: IParteInteresssada | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parteInteresssada }) => {
      this.parteInteresssada = parteInteresssada;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
