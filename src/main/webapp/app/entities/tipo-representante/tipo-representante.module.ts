import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TipoRepresentanteComponent } from './list/tipo-representante.component';
import { TipoRepresentanteDetailComponent } from './detail/tipo-representante-detail.component';
import { TipoRepresentanteUpdateComponent } from './update/tipo-representante-update.component';
import { TipoRepresentanteDeleteDialogComponent } from './delete/tipo-representante-delete-dialog.component';
import { TipoRepresentanteRoutingModule } from './route/tipo-representante-routing.module';

@NgModule({
  imports: [SharedModule, TipoRepresentanteRoutingModule],
  declarations: [
    TipoRepresentanteComponent,
    TipoRepresentanteDetailComponent,
    TipoRepresentanteUpdateComponent,
    TipoRepresentanteDeleteDialogComponent,
  ],
  entryComponents: [TipoRepresentanteDeleteDialogComponent],
})
export class TipoRepresentanteModule {}
