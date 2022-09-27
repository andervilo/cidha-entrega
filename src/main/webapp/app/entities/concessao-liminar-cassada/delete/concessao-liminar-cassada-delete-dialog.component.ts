import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IConcessaoLiminarCassada } from '../concessao-liminar-cassada.model';
import { ConcessaoLiminarCassadaService } from '../service/concessao-liminar-cassada.service';

@Component({
  templateUrl: './concessao-liminar-cassada-delete-dialog.component.html',
})
export class ConcessaoLiminarCassadaDeleteDialogComponent {
  concessaoLiminarCassada?: IConcessaoLiminarCassada;

  constructor(protected concessaoLiminarCassadaService: ConcessaoLiminarCassadaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.concessaoLiminarCassadaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
