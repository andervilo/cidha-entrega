import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFundamentacaoLegal } from '../fundamentacao-legal.model';
import { FundamentacaoLegalService } from '../service/fundamentacao-legal.service';

@Component({
  templateUrl: './fundamentacao-legal-delete-dialog.component.html',
})
export class FundamentacaoLegalDeleteDialogComponent {
  fundamentacaoLegal?: IFundamentacaoLegal;

  constructor(protected fundamentacaoLegalService: FundamentacaoLegalService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fundamentacaoLegalService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
