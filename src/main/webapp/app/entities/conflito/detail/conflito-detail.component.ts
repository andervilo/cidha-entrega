import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConflito } from '../conflito.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-conflito-detail',
  templateUrl: './conflito-detail.component.html',
})
export class ConflitoDetailComponent implements OnInit {
  conflito: IConflito | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conflito }) => {
      this.conflito = conflito;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
