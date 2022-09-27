import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InstrumentoInternacionalComponent } from './list/instrumento-internacional.component';
import { InstrumentoInternacionalDetailComponent } from './detail/instrumento-internacional-detail.component';
import { InstrumentoInternacionalUpdateComponent } from './update/instrumento-internacional-update.component';
import { InstrumentoInternacionalDeleteDialogComponent } from './delete/instrumento-internacional-delete-dialog.component';
import { InstrumentoInternacionalRoutingModule } from './route/instrumento-internacional-routing.module';

@NgModule({
  imports: [SharedModule, InstrumentoInternacionalRoutingModule],
  declarations: [
    InstrumentoInternacionalComponent,
    InstrumentoInternacionalDetailComponent,
    InstrumentoInternacionalUpdateComponent,
    InstrumentoInternacionalDeleteDialogComponent,
  ],
  entryComponents: [InstrumentoInternacionalDeleteDialogComponent],
})
export class InstrumentoInternacionalModule {}
