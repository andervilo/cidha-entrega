import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAtividadeExploracaoIlegal } from '../atividade-exploracao-ilegal.model';
import { AtividadeExploracaoIlegalService } from '../service/atividade-exploracao-ilegal.service';

@Component({
  templateUrl: './atividade-exploracao-ilegal-delete-dialog.component.html',
})
export class AtividadeExploracaoIlegalDeleteDialogComponent {
  atividadeExploracaoIlegal?: IAtividadeExploracaoIlegal;

  constructor(protected atividadeExploracaoIlegalService: AtividadeExploracaoIlegalService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.atividadeExploracaoIlegalService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
