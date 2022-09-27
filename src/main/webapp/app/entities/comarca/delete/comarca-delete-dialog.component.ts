import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IComarca } from '../comarca.model';
import { ComarcaService } from '../service/comarca.service';

@Component({
  templateUrl: './comarca-delete-dialog.component.html',
})
export class ComarcaDeleteDialogComponent {
  comarca?: IComarca;

  constructor(protected comarcaService: ComarcaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.comarcaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
