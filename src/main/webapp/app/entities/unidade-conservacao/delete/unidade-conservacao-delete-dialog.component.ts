import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUnidadeConservacao } from '../unidade-conservacao.model';
import { UnidadeConservacaoService } from '../service/unidade-conservacao.service';

@Component({
  templateUrl: './unidade-conservacao-delete-dialog.component.html',
})
export class UnidadeConservacaoDeleteDialogComponent {
  unidadeConservacao?: IUnidadeConservacao;

  constructor(protected unidadeConservacaoService: UnidadeConservacaoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.unidadeConservacaoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
