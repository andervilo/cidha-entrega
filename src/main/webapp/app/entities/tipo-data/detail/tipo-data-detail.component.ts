import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoData } from '../tipo-data.model';

@Component({
  selector: 'jhi-tipo-data-detail',
  templateUrl: './tipo-data-detail.component.html',
})
export class TipoDataDetailComponent implements OnInit {
  tipoData: ITipoData | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoData }) => {
      this.tipoData = tipoData;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
