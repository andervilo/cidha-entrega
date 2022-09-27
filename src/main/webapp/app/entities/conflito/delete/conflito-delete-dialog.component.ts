import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IConflito } from '../conflito.model';
import { ConflitoService } from '../service/conflito.service';

@Component({
  templateUrl: './conflito-delete-dialog.component.html',
})
export class ConflitoDeleteDialogComponent {
  conflito?: IConflito;

  constructor(protected conflitoService: ConflitoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.conflitoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
