import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISecaoJudiciaria } from '../secao-judiciaria.model';
import { SecaoJudiciariaService } from '../service/secao-judiciaria.service';

@Component({
  templateUrl: './secao-judiciaria-delete-dialog.component.html',
})
export class SecaoJudiciariaDeleteDialogComponent {
  secaoJudiciaria?: ISecaoJudiciaria;

  constructor(protected secaoJudiciariaService: SecaoJudiciariaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.secaoJudiciariaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
