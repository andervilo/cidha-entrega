import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProblemaJuridico } from '../problema-juridico.model';
import { ProblemaJuridicoService } from '../service/problema-juridico.service';

@Component({
  templateUrl: './problema-juridico-delete-dialog.component.html',
})
export class ProblemaJuridicoDeleteDialogComponent {
  problemaJuridico?: IProblemaJuridico;

  constructor(protected problemaJuridicoService: ProblemaJuridicoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.problemaJuridicoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
