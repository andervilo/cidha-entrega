import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DataComponent } from './list/data.component';
import { DataDetailComponent } from './detail/data-detail.component';
import { DataUpdateComponent } from './update/data-update.component';
import { DataDeleteDialogComponent } from './delete/data-delete-dialog.component';
import { DataRoutingModule } from './route/data-routing.module';

@NgModule({
  imports: [SharedModule, DataRoutingModule],
  declarations: [DataComponent, DataDetailComponent, DataUpdateComponent, DataDeleteDialogComponent],
  entryComponents: [DataDeleteDialogComponent],
})
export class DataModule {}
