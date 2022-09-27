import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRepresentanteLegal } from '../representante-legal.model';
import { RepresentanteLegalService } from '../service/representante-legal.service';

@Component({
  templateUrl: './representante-legal-delete-dialog.component.html',
})
export class RepresentanteLegalDeleteDialogComponent {
  representanteLegal?: IRepresentanteLegal;

  constructor(protected representanteLegalService: RepresentanteLegalService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.representanteLegalService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
