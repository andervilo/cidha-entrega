import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IOpcaoRecurso } from '../opcao-recurso.model';
import { OpcaoRecursoService } from '../service/opcao-recurso.service';

@Component({
  templateUrl: './opcao-recurso-delete-dialog.component.html',
})
export class OpcaoRecursoDeleteDialogComponent {
  opcaoRecurso?: IOpcaoRecurso;

  constructor(protected opcaoRecursoService: OpcaoRecursoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.opcaoRecursoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
