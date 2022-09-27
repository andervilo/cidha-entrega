import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmbargoRespRe } from '../embargo-resp-re.model';
import { EmbargoRespReService } from '../service/embargo-resp-re.service';

@Component({
  templateUrl: './embargo-resp-re-delete-dialog.component.html',
})
export class EmbargoRespReDeleteDialogComponent {
  embargoRespRe?: IEmbargoRespRe;

  constructor(protected embargoRespReService: EmbargoRespReService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.embargoRespReService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
