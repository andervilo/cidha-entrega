import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmbargoDeclaracao } from '../embargo-declaracao.model';
import { EmbargoDeclaracaoService } from '../service/embargo-declaracao.service';

@Component({
  templateUrl: './embargo-declaracao-delete-dialog.component.html',
})
export class EmbargoDeclaracaoDeleteDialogComponent {
  embargoDeclaracao?: IEmbargoDeclaracao;

  constructor(protected embargoDeclaracaoService: EmbargoDeclaracaoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.embargoDeclaracaoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
