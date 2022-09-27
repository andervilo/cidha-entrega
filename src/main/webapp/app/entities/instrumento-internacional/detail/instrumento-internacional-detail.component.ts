import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInstrumentoInternacional } from '../instrumento-internacional.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-instrumento-internacional-detail',
  templateUrl: './instrumento-internacional-detail.component.html',
})
export class InstrumentoInternacionalDetailComponent implements OnInit {
  instrumentoInternacional: IInstrumentoInternacional | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ instrumentoInternacional }) => {
      this.instrumentoInternacional = instrumentoInternacional;
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
