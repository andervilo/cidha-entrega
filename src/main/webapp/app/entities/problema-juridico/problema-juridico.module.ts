import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProblemaJuridicoComponent } from './list/problema-juridico.component';
import { ProblemaJuridicoDetailComponent } from './detail/problema-juridico-detail.component';
import { ProblemaJuridicoUpdateComponent } from './update/problema-juridico-update.component';
import { ProblemaJuridicoDeleteDialogComponent } from './delete/problema-juridico-delete-dialog.component';
import { ProblemaJuridicoRoutingModule } from './route/problema-juridico-routing.module';

@NgModule({
  imports: [SharedModule, ProblemaJuridicoRoutingModule],
  declarations: [
    ProblemaJuridicoComponent,
    ProblemaJuridicoDetailComponent,
    ProblemaJuridicoUpdateComponent,
    ProblemaJuridicoDeleteDialogComponent,
  ],
  entryComponents: [ProblemaJuridicoDeleteDialogComponent],
})
export class ProblemaJuridicoModule {}
