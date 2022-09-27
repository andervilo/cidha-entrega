import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EmbargoRespReComponent } from './list/embargo-resp-re.component';
import { EmbargoRespReDetailComponent } from './detail/embargo-resp-re-detail.component';
import { EmbargoRespReUpdateComponent } from './update/embargo-resp-re-update.component';
import { EmbargoRespReDeleteDialogComponent } from './delete/embargo-resp-re-delete-dialog.component';
import { EmbargoRespReRoutingModule } from './route/embargo-resp-re-routing.module';

@NgModule({
  imports: [SharedModule, EmbargoRespReRoutingModule],
  declarations: [EmbargoRespReComponent, EmbargoRespReDetailComponent, EmbargoRespReUpdateComponent, EmbargoRespReDeleteDialogComponent],
  entryComponents: [EmbargoRespReDeleteDialogComponent],
})
export class EmbargoRespReModule {}
