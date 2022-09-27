import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEtniaIndigena } from '../etnia-indigena.model';

@Component({
  selector: 'jhi-etnia-indigena-detail',
  templateUrl: './etnia-indigena-detail.component.html',
})
export class EtniaIndigenaDetailComponent implements OnInit {
  etniaIndigena: IEtniaIndigena | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etniaIndigena }) => {
      this.etniaIndigena = etniaIndigena;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
