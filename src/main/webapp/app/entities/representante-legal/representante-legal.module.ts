import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RepresentanteLegalComponent } from './list/representante-legal.component';
import { RepresentanteLegalDetailComponent } from './detail/representante-legal-detail.component';
import { RepresentanteLegalUpdateComponent } from './update/representante-legal-update.component';
import { RepresentanteLegalDeleteDialogComponent } from './delete/representante-legal-delete-dialog.component';
import { RepresentanteLegalRoutingModule } from './route/representante-legal-routing.module';

@NgModule({
  imports: [SharedModule, RepresentanteLegalRoutingModule],
  declarations: [
    RepresentanteLegalComponent,
    RepresentanteLegalDetailComponent,
    RepresentanteLegalUpdateComponent,
    RepresentanteLegalDeleteDialogComponent,
  ],
  entryComponents: [RepresentanteLegalDeleteDialogComponent],
})
export class RepresentanteLegalModule {}
