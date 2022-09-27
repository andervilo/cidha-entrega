import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TerraIndigenaComponent } from './list/terra-indigena.component';
import { TerraIndigenaDetailComponent } from './detail/terra-indigena-detail.component';
import { TerraIndigenaUpdateComponent } from './update/terra-indigena-update.component';
import { TerraIndigenaDeleteDialogComponent } from './delete/terra-indigena-delete-dialog.component';
import { TerraIndigenaRoutingModule } from './route/terra-indigena-routing.module';

@NgModule({
  imports: [SharedModule, TerraIndigenaRoutingModule],
  declarations: [TerraIndigenaComponent, TerraIndigenaDetailComponent, TerraIndigenaUpdateComponent, TerraIndigenaDeleteDialogComponent],
  entryComponents: [TerraIndigenaDeleteDialogComponent],
})
export class TerraIndigenaModule {}
