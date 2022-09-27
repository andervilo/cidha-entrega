import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFundamentacaoLegal } from '../fundamentacao-legal.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-fundamentacao-legal-detail',
  templateUrl: './fundamentacao-legal-detail.component.html',
})
export class FundamentacaoLegalDetailComponent implements OnInit {
  fundamentacaoLegal: IFundamentacaoLegal | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fundamentacaoLegal }) => {
      this.fundamentacaoLegal = fundamentacaoLegal;
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
