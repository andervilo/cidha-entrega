import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { QuilomboComponent } from './list/quilombo.component';
import { QuilomboDetailComponent } from './detail/quilombo-detail.component';
import { QuilomboUpdateComponent } from './update/quilombo-update.component';
import { QuilomboDeleteDialogComponent } from './delete/quilombo-delete-dialog.component';
import { QuilomboRoutingModule } from './route/quilombo-routing.module';

@NgModule({
  imports: [SharedModule, QuilomboRoutingModule],
  declarations: [QuilomboComponent, QuilomboDetailComponent, QuilomboUpdateComponent, QuilomboDeleteDialogComponent],
  entryComponents: [QuilomboDeleteDialogComponent],
})
export class QuilomboModule {}
