import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ComarcaComponent } from './list/comarca.component';
import { ComarcaDetailComponent } from './detail/comarca-detail.component';
import { ComarcaUpdateComponent } from './update/comarca-update.component';
import { ComarcaDeleteDialogComponent } from './delete/comarca-delete-dialog.component';
import { ComarcaRoutingModule } from './route/comarca-routing.module';

@NgModule({
  imports: [SharedModule, ComarcaRoutingModule],
  declarations: [ComarcaComponent, ComarcaDetailComponent, ComarcaUpdateComponent, ComarcaDeleteDialogComponent],
  entryComponents: [ComarcaDeleteDialogComponent],
})
export class ComarcaModule {}
