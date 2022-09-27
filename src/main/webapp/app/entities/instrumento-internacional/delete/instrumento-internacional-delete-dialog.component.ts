import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInstrumentoInternacional } from '../instrumento-internacional.model';
import { InstrumentoInternacionalService } from '../service/instrumento-internacional.service';

@Component({
  templateUrl: './instrumento-internacional-delete-dialog.component.html',
})
export class InstrumentoInternacionalDeleteDialogComponent {
  instrumentoInternacional?: IInstrumentoInternacional;

  constructor(protected instrumentoInternacionalService: InstrumentoInternacionalService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.instrumentoInternacionalService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
