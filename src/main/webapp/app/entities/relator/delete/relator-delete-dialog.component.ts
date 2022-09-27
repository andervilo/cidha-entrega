import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRelator } from '../relator.model';
import { RelatorService } from '../service/relator.service';

@Component({
  templateUrl: './relator-delete-dialog.component.html',
})
export class RelatorDeleteDialogComponent {
  relator?: IRelator;

  constructor(protected relatorService: RelatorService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.relatorService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
