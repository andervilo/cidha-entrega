import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DireitoComponent } from './list/direito.component';
import { DireitoDetailComponent } from './detail/direito-detail.component';
import { DireitoUpdateComponent } from './update/direito-update.component';
import { DireitoDeleteDialogComponent } from './delete/direito-delete-dialog.component';
import { DireitoRoutingModule } from './route/direito-routing.module';

@NgModule({
  imports: [SharedModule, DireitoRoutingModule],
  declarations: [DireitoComponent, DireitoDetailComponent, DireitoUpdateComponent, DireitoDeleteDialogComponent],
  entryComponents: [DireitoDeleteDialogComponent],
})
export class DireitoModule {}
