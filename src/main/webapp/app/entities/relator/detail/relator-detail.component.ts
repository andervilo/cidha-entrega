import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRelator } from '../relator.model';

@Component({
  selector: 'jhi-relator-detail',
  templateUrl: './relator-detail.component.html',
})
export class RelatorDetailComponent implements OnInit {
  relator: IRelator | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ relator }) => {
      this.relator = relator;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
