import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IParteInteresssada } from '../parte-interesssada.model';
import { ParteInteresssadaService } from '../service/parte-interesssada.service';

@Component({
  templateUrl: './parte-interesssada-delete-dialog.component.html',
})
export class ParteInteresssadaDeleteDialogComponent {
  parteInteresssada?: IParteInteresssada;

  constructor(protected parteInteresssadaService: ParteInteresssadaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.parteInteresssadaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
