import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EtniaIndigenaComponent } from './list/etnia-indigena.component';
import { EtniaIndigenaDetailComponent } from './detail/etnia-indigena-detail.component';
import { EtniaIndigenaUpdateComponent } from './update/etnia-indigena-update.component';
import { EtniaIndigenaDeleteDialogComponent } from './delete/etnia-indigena-delete-dialog.component';
import { EtniaIndigenaRoutingModule } from './route/etnia-indigena-routing.module';

@NgModule({
  imports: [SharedModule, EtniaIndigenaRoutingModule],
  declarations: [EtniaIndigenaComponent, EtniaIndigenaDetailComponent, EtniaIndigenaUpdateComponent, EtniaIndigenaDeleteDialogComponent],
  entryComponents: [EtniaIndigenaDeleteDialogComponent],
})
export class EtniaIndigenaModule {}
