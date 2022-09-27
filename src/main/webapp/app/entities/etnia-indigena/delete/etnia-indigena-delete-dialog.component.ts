import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEtniaIndigena } from '../etnia-indigena.model';
import { EtniaIndigenaService } from '../service/etnia-indigena.service';

@Component({
  templateUrl: './etnia-indigena-delete-dialog.component.html',
})
export class EtniaIndigenaDeleteDialogComponent {
  etniaIndigena?: IEtniaIndigena;

  constructor(protected etniaIndigenaService: EtniaIndigenaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.etniaIndigenaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
