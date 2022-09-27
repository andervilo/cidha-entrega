import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConcessaoLiminar } from '../concessao-liminar.model';

@Component({
  selector: 'jhi-concessao-liminar-detail',
  templateUrl: './concessao-liminar-detail.component.html',
})
export class ConcessaoLiminarDetailComponent implements OnInit {
  concessaoLiminar: IConcessaoLiminar | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ concessaoLiminar }) => {
      this.concessaoLiminar = concessaoLiminar;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
