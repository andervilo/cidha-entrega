import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubsecaoJudiciaria } from '../subsecao-judiciaria.model';
import { SubsecaoJudiciariaService } from '../service/subsecao-judiciaria.service';

@Component({
  templateUrl: './subsecao-judiciaria-delete-dialog.component.html',
})
export class SubsecaoJudiciariaDeleteDialogComponent {
  subsecaoJudiciaria?: ISubsecaoJudiciaria;

  constructor(protected subsecaoJudiciariaService: SubsecaoJudiciariaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.subsecaoJudiciariaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
