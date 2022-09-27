import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmbargoRespRe } from '../embargo-resp-re.model';

@Component({
  selector: 'jhi-embargo-resp-re-detail',
  templateUrl: './embargo-resp-re-detail.component.html',
})
export class EmbargoRespReDetailComponent implements OnInit {
  embargoRespRe: IEmbargoRespRe | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ embargoRespRe }) => {
      this.embargoRespRe = embargoRespRe;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
