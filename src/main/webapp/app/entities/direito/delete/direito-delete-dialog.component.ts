import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDireito } from '../direito.model';
import { DireitoService } from '../service/direito.service';

@Component({
  templateUrl: './direito-delete-dialog.component.html',
})
export class DireitoDeleteDialogComponent {
  direito?: IDireito;

  constructor(protected direitoService: DireitoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.direitoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
