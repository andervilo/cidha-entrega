import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TipoDataComponent } from './list/tipo-data.component';
import { TipoDataDetailComponent } from './detail/tipo-data-detail.component';
import { TipoDataUpdateComponent } from './update/tipo-data-update.component';
import { TipoDataDeleteDialogComponent } from './delete/tipo-data-delete-dialog.component';
import { TipoDataRoutingModule } from './route/tipo-data-routing.module';

@NgModule({
  imports: [SharedModule, TipoDataRoutingModule],
  declarations: [TipoDataComponent, TipoDataDetailComponent, TipoDataUpdateComponent, TipoDataDeleteDialogComponent],
  entryComponents: [TipoDataDeleteDialogComponent],
})
export class TipoDataModule {}
