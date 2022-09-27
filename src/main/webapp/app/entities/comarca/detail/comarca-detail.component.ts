import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComarca } from '../comarca.model';

@Component({
  selector: 'jhi-comarca-detail',
  templateUrl: './comarca-detail.component.html',
})
export class ComarcaDetailComponent implements OnInit {
  comarca: IComarca | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ comarca }) => {
      this.comarca = comarca;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
