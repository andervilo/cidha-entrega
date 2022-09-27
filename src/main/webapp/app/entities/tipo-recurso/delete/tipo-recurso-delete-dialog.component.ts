import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoRecurso } from '../tipo-recurso.model';
import { TipoRecursoService } from '../service/tipo-recurso.service';

@Component({
  templateUrl: './tipo-recurso-delete-dialog.component.html',
})
export class TipoRecursoDeleteDialogComponent {
  tipoRecurso?: ITipoRecurso;

  constructor(protected tipoRecursoService: TipoRecursoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoRecursoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
