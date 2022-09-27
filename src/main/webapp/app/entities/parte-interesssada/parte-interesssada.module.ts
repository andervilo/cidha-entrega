import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ParteInteresssadaComponent } from './list/parte-interesssada.component';
import { ParteInteresssadaDetailComponent } from './detail/parte-interesssada-detail.component';
import { ParteInteresssadaUpdateComponent } from './update/parte-interesssada-update.component';
import { ParteInteresssadaDeleteDialogComponent } from './delete/parte-interesssada-delete-dialog.component';
import { ParteInteresssadaRoutingModule } from './route/parte-interesssada-routing.module';

@NgModule({
  imports: [SharedModule, ParteInteresssadaRoutingModule],
  declarations: [
    ParteInteresssadaComponent,
    ParteInteresssadaDetailComponent,
    ParteInteresssadaUpdateComponent,
    ParteInteresssadaDeleteDialogComponent,
  ],
  entryComponents: [ParteInteresssadaDeleteDialogComponent],
})
export class ParteInteresssadaModule {}
