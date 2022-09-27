import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoRepresentante } from '../tipo-representante.model';
import { TipoRepresentanteService } from '../service/tipo-representante.service';

@Component({
  templateUrl: './tipo-representante-delete-dialog.component.html',
})
export class TipoRepresentanteDeleteDialogComponent {
  tipoRepresentante?: ITipoRepresentante;

  constructor(protected tipoRepresentanteService: TipoRepresentanteService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoRepresentanteService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
