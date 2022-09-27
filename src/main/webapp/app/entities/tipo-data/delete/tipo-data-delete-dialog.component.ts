import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoData } from '../tipo-data.model';
import { TipoDataService } from '../service/tipo-data.service';

@Component({
  templateUrl: './tipo-data-delete-dialog.component.html',
})
export class TipoDataDeleteDialogComponent {
  tipoData?: ITipoData;

  constructor(protected tipoDataService: TipoDataService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoDataService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
