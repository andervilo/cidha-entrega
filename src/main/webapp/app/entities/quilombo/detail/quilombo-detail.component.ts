import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuilombo } from '../quilombo.model';

@Component({
  selector: 'jhi-quilombo-detail',
  templateUrl: './quilombo-detail.component.html',
})
export class QuilomboDetailComponent implements OnInit {
  quilombo: IQuilombo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quilombo }) => {
      this.quilombo = quilombo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
