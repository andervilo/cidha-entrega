import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITerritorio } from '../territorio.model';
import { TerritorioService } from '../service/territorio.service';

@Component({
  templateUrl: './territorio-delete-dialog.component.html',
})
export class TerritorioDeleteDialogComponent {
  territorio?: ITerritorio;

  constructor(protected territorioService: TerritorioService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.territorioService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
