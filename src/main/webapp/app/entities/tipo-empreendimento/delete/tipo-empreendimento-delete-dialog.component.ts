import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoEmpreendimento } from '../tipo-empreendimento.model';
import { TipoEmpreendimentoService } from '../service/tipo-empreendimento.service';

@Component({
  templateUrl: './tipo-empreendimento-delete-dialog.component.html',
})
export class TipoEmpreendimentoDeleteDialogComponent {
  tipoEmpreendimento?: ITipoEmpreendimento;

  constructor(protected tipoEmpreendimentoService: TipoEmpreendimentoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoEmpreendimentoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
