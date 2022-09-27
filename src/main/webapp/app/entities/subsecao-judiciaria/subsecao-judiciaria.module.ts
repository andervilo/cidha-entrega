import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SubsecaoJudiciariaComponent } from './list/subsecao-judiciaria.component';
import { SubsecaoJudiciariaDetailComponent } from './detail/subsecao-judiciaria-detail.component';
import { SubsecaoJudiciariaUpdateComponent } from './update/subsecao-judiciaria-update.component';
import { SubsecaoJudiciariaDeleteDialogComponent } from './delete/subsecao-judiciaria-delete-dialog.component';
import { SubsecaoJudiciariaRoutingModule } from './route/subsecao-judiciaria-routing.module';

@NgModule({
  imports: [SharedModule, SubsecaoJudiciariaRoutingModule],
  declarations: [
    SubsecaoJudiciariaComponent,
    SubsecaoJudiciariaDetailComponent,
    SubsecaoJudiciariaUpdateComponent,
    SubsecaoJudiciariaDeleteDialogComponent,
  ],
  entryComponents: [SubsecaoJudiciariaDeleteDialogComponent],
})
export class SubsecaoJudiciariaModule {}
