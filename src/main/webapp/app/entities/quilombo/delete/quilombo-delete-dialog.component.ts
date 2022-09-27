import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuilombo } from '../quilombo.model';
import { QuilomboService } from '../service/quilombo.service';

@Component({
  templateUrl: './quilombo-delete-dialog.component.html',
})
export class QuilomboDeleteDialogComponent {
  quilombo?: IQuilombo;

  constructor(protected quilomboService: QuilomboService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.quilomboService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
