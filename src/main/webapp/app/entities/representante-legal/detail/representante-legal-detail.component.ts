import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepresentanteLegal } from '../representante-legal.model';

@Component({
  selector: 'jhi-representante-legal-detail',
  templateUrl: './representante-legal-detail.component.html',
})
export class RepresentanteLegalDetailComponent implements OnInit {
  representanteLegal: IRepresentanteLegal | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ representanteLegal }) => {
      this.representanteLegal = representanteLegal;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
