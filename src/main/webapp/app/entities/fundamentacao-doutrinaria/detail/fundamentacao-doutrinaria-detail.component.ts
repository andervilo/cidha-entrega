import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFundamentacaoDoutrinaria } from '../fundamentacao-doutrinaria.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-fundamentacao-doutrinaria-detail',
  templateUrl: './fundamentacao-doutrinaria-detail.component.html',
})
export class FundamentacaoDoutrinariaDetailComponent implements OnInit {
  fundamentacaoDoutrinaria: IFundamentacaoDoutrinaria | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fundamentacaoDoutrinaria }) => {
      this.fundamentacaoDoutrinaria = fundamentacaoDoutrinaria;
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
