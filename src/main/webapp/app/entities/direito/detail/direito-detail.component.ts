import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDireito } from '../direito.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-direito-detail',
  templateUrl: './direito-detail.component.html',
})
export class DireitoDetailComponent implements OnInit {
  direito: IDireito | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ direito }) => {
      this.direito = direito;
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
