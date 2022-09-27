import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITerraIndigena } from '../terra-indigena.model';
import { TerraIndigenaService } from '../service/terra-indigena.service';

@Component({
  templateUrl: './terra-indigena-delete-dialog.component.html',
})
export class TerraIndigenaDeleteDialogComponent {
  terraIndigena?: ITerraIndigena;

  constructor(protected terraIndigenaService: TerraIndigenaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.terraIndigenaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
