import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubsecaoJudiciaria } from '../subsecao-judiciaria.model';
import { SubsecaoJudiciariaService } from '../service/subsecao-judiciaria.service';
import { SubsecaoJudiciariaDeleteDialogComponent } from '../delete/subsecao-judiciaria-delete-dialog.component';

@Component({
  selector: 'jhi-subsecao-judiciaria',
  templateUrl: './subsecao-judiciaria.component.html',
})
export class SubsecaoJudiciariaComponent implements OnInit {
  subsecaoJudiciarias?: ISubsecaoJudiciaria[];
  isLoading = false;

  constructor(protected subsecaoJudiciariaService: SubsecaoJudiciariaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.subsecaoJudiciariaService.query().subscribe({
      next: (res: HttpResponse<ISubsecaoJudiciaria[]>) => {
        this.isLoading = false;
        this.subsecaoJudiciarias = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ISubsecaoJudiciaria): number {
    return item.id!;
  }

  delete(subsecaoJudiciaria: ISubsecaoJudiciaria): void {
    const modalRef = this.modalService.open(SubsecaoJudiciariaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subsecaoJudiciaria = subsecaoJudiciaria;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
