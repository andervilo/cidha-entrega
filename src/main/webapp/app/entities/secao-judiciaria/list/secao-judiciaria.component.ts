import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISecaoJudiciaria } from '../secao-judiciaria.model';
import { SecaoJudiciariaService } from '../service/secao-judiciaria.service';
import { SecaoJudiciariaDeleteDialogComponent } from '../delete/secao-judiciaria-delete-dialog.component';

@Component({
  selector: 'jhi-secao-judiciaria',
  templateUrl: './secao-judiciaria.component.html',
})
export class SecaoJudiciariaComponent implements OnInit {
  secaoJudiciarias?: ISecaoJudiciaria[];
  isLoading = false;

  constructor(protected secaoJudiciariaService: SecaoJudiciariaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.secaoJudiciariaService.query().subscribe({
      next: (res: HttpResponse<ISecaoJudiciaria[]>) => {
        this.isLoading = false;
        this.secaoJudiciarias = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ISecaoJudiciaria): number {
    return item.id!;
  }

  delete(secaoJudiciaria: ISecaoJudiciaria): void {
    const modalRef = this.modalService.open(SecaoJudiciariaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.secaoJudiciaria = secaoJudiciaria;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
