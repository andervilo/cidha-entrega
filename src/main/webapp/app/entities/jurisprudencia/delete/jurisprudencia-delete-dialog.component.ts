import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IJurisprudencia } from '../jurisprudencia.model';
import { JurisprudenciaService } from '../service/jurisprudencia.service';

@Component({
  templateUrl: './jurisprudencia-delete-dialog.component.html',
})
export class JurisprudenciaDeleteDialogComponent {
  jurisprudencia?: IJurisprudencia;

  constructor(protected jurisprudenciaService: JurisprudenciaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jurisprudenciaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
