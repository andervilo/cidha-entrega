import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IData } from '../data.model';
import { DataService } from '../service/data.service';

@Component({
  templateUrl: './data-delete-dialog.component.html',
})
export class DataDeleteDialogComponent {
  data?: IData;

  constructor(protected dataService: DataService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dataService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
