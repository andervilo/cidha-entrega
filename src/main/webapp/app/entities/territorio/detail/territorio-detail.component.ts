import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITerritorio } from '../territorio.model';

@Component({
  selector: 'jhi-territorio-detail',
  templateUrl: './territorio-detail.component.html',
})
export class TerritorioDetailComponent implements OnInit {
  territorio: ITerritorio | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ territorio }) => {
      this.territorio = territorio;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
