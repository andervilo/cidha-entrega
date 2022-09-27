import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TipoRecursoComponent } from './list/tipo-recurso.component';
import { TipoRecursoDetailComponent } from './detail/tipo-recurso-detail.component';
import { TipoRecursoUpdateComponent } from './update/tipo-recurso-update.component';
import { TipoRecursoDeleteDialogComponent } from './delete/tipo-recurso-delete-dialog.component';
import { TipoRecursoRoutingModule } from './route/tipo-recurso-routing.module';

@NgModule({
  imports: [SharedModule, TipoRecursoRoutingModule],
  declarations: [TipoRecursoComponent, TipoRecursoDetailComponent, TipoRecursoUpdateComponent, TipoRecursoDeleteDialogComponent],
  entryComponents: [TipoRecursoDeleteDialogComponent],
})
export class TipoRecursoModule {}
