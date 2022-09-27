import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IData } from '../data.model';

@Component({
  selector: 'jhi-data-detail',
  templateUrl: './data-detail.component.html',
})
export class DataDetailComponent implements OnInit {
  data: IData | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.data = data;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
