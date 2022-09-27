import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecurso } from '../recurso.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-recurso-detail',
  templateUrl: './recurso-detail.component.html',
})
export class RecursoDetailComponent implements OnInit {
  recurso: IRecurso | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recurso }) => {
      this.recurso = recurso;
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
