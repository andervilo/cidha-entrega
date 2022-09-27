import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProcessoConflito } from '../processo-conflito.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-processo-conflito-detail',
  templateUrl: './processo-conflito-detail.component.html',
})
export class ProcessoConflitoDetailComponent implements OnInit {
  processoConflito: IProcessoConflito | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ processoConflito }) => {
      this.processoConflito = processoConflito;
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
