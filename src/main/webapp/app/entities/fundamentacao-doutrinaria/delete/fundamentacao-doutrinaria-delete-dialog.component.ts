import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFundamentacaoDoutrinaria } from '../fundamentacao-doutrinaria.model';
import { FundamentacaoDoutrinariaService } from '../service/fundamentacao-doutrinaria.service';

@Component({
  templateUrl: './fundamentacao-doutrinaria-delete-dialog.component.html',
})
export class FundamentacaoDoutrinariaDeleteDialogComponent {
  fundamentacaoDoutrinaria?: IFundamentacaoDoutrinaria;

  constructor(protected fundamentacaoDoutrinariaService: FundamentacaoDoutrinariaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fundamentacaoDoutrinariaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
