import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmbargoDeclaracaoAgravo } from '../embargo-declaracao-agravo.model';

@Component({
  selector: 'jhi-embargo-declaracao-agravo-detail',
  templateUrl: './embargo-declaracao-agravo-detail.component.html',
})
export class EmbargoDeclaracaoAgravoDetailComponent implements OnInit {
  embargoDeclaracaoAgravo: IEmbargoDeclaracaoAgravo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ embargoDeclaracaoAgravo }) => {
      this.embargoDeclaracaoAgravo = embargoDeclaracaoAgravo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
