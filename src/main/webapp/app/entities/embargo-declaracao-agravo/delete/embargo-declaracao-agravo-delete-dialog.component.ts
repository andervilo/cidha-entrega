import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmbargoDeclaracaoAgravo } from '../embargo-declaracao-agravo.model';
import { EmbargoDeclaracaoAgravoService } from '../service/embargo-declaracao-agravo.service';

@Component({
  templateUrl: './embargo-declaracao-agravo-delete-dialog.component.html',
})
export class EmbargoDeclaracaoAgravoDeleteDialogComponent {
  embargoDeclaracaoAgravo?: IEmbargoDeclaracaoAgravo;

  constructor(protected embargoDeclaracaoAgravoService: EmbargoDeclaracaoAgravoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.embargoDeclaracaoAgravoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
