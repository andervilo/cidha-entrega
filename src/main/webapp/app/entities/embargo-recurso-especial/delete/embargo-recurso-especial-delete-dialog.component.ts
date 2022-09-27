import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmbargoRecursoEspecial } from '../embargo-recurso-especial.model';
import { EmbargoRecursoEspecialService } from '../service/embargo-recurso-especial.service';

@Component({
  templateUrl: './embargo-recurso-especial-delete-dialog.component.html',
})
export class EmbargoRecursoEspecialDeleteDialogComponent {
  embargoRecursoEspecial?: IEmbargoRecursoEspecial;

  constructor(protected embargoRecursoEspecialService: EmbargoRecursoEspecialService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.embargoRecursoEspecialService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
