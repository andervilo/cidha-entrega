import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoDecisao } from '../tipo-decisao.model';
import { TipoDecisaoService } from '../service/tipo-decisao.service';

@Component({
  templateUrl: './tipo-decisao-delete-dialog.component.html',
})
export class TipoDecisaoDeleteDialogComponent {
  tipoDecisao?: ITipoDecisao;

  constructor(protected tipoDecisaoService: TipoDecisaoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoDecisaoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
