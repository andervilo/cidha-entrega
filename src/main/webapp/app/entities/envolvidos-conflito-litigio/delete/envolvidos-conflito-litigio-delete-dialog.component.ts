import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEnvolvidosConflitoLitigio } from '../envolvidos-conflito-litigio.model';
import { EnvolvidosConflitoLitigioService } from '../service/envolvidos-conflito-litigio.service';

@Component({
  templateUrl: './envolvidos-conflito-litigio-delete-dialog.component.html',
})
export class EnvolvidosConflitoLitigioDeleteDialogComponent {
  envolvidosConflitoLitigio?: IEnvolvidosConflitoLitigio;

  constructor(protected envolvidosConflitoLitigioService: EnvolvidosConflitoLitigioService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.envolvidosConflitoLitigioService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
