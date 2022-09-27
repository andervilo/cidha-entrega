import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { JurisprudenciaComponent } from './list/jurisprudencia.component';
import { JurisprudenciaDetailComponent } from './detail/jurisprudencia-detail.component';
import { JurisprudenciaUpdateComponent } from './update/jurisprudencia-update.component';
import { JurisprudenciaDeleteDialogComponent } from './delete/jurisprudencia-delete-dialog.component';
import { JurisprudenciaRoutingModule } from './route/jurisprudencia-routing.module';

@NgModule({
  imports: [SharedModule, JurisprudenciaRoutingModule],
  declarations: [
    JurisprudenciaComponent,
    JurisprudenciaDetailComponent,
    JurisprudenciaUpdateComponent,
    JurisprudenciaDeleteDialogComponent,
  ],
  entryComponents: [JurisprudenciaDeleteDialogComponent],
})
export class JurisprudenciaModule {}
