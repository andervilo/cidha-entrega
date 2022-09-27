import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProcessoConflito } from '../processo-conflito.model';
import { ProcessoConflitoService } from '../service/processo-conflito.service';

@Component({
  templateUrl: './processo-conflito-delete-dialog.component.html',
})
export class ProcessoConflitoDeleteDialogComponent {
  processoConflito?: IProcessoConflito;

  constructor(protected processoConflitoService: ProcessoConflitoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.processoConflitoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
