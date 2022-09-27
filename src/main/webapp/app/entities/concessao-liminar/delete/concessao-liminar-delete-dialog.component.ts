import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IConcessaoLiminar } from '../concessao-liminar.model';
import { ConcessaoLiminarService } from '../service/concessao-liminar.service';

@Component({
  templateUrl: './concessao-liminar-delete-dialog.component.html',
})
export class ConcessaoLiminarDeleteDialogComponent {
  concessaoLiminar?: IConcessaoLiminar;

  constructor(protected concessaoLiminarService: ConcessaoLiminarService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.concessaoLiminarService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
