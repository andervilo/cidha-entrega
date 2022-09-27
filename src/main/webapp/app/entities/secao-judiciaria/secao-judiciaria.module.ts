import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SecaoJudiciariaComponent } from './list/secao-judiciaria.component';
import { SecaoJudiciariaDetailComponent } from './detail/secao-judiciaria-detail.component';
import { SecaoJudiciariaUpdateComponent } from './update/secao-judiciaria-update.component';
import { SecaoJudiciariaDeleteDialogComponent } from './delete/secao-judiciaria-delete-dialog.component';
import { SecaoJudiciariaRoutingModule } from './route/secao-judiciaria-routing.module';

@NgModule({
  imports: [SharedModule, SecaoJudiciariaRoutingModule],
  declarations: [
    SecaoJudiciariaComponent,
    SecaoJudiciariaDetailComponent,
    SecaoJudiciariaUpdateComponent,
    SecaoJudiciariaDeleteDialogComponent,
  ],
  entryComponents: [SecaoJudiciariaDeleteDialogComponent],
})
export class SecaoJudiciariaModule {}
