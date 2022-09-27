import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RelatorComponent } from './list/relator.component';
import { RelatorDetailComponent } from './detail/relator-detail.component';
import { RelatorUpdateComponent } from './update/relator-update.component';
import { RelatorDeleteDialogComponent } from './delete/relator-delete-dialog.component';
import { RelatorRoutingModule } from './route/relator-routing.module';

@NgModule({
  imports: [SharedModule, RelatorRoutingModule],
  declarations: [RelatorComponent, RelatorDetailComponent, RelatorUpdateComponent, RelatorDeleteDialogComponent],
  entryComponents: [RelatorDeleteDialogComponent],
})
export class RelatorModule {}
