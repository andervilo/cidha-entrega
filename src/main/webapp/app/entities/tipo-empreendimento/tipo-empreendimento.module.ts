import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TipoEmpreendimentoComponent } from './list/tipo-empreendimento.component';
import { TipoEmpreendimentoDetailComponent } from './detail/tipo-empreendimento-detail.component';
import { TipoEmpreendimentoUpdateComponent } from './update/tipo-empreendimento-update.component';
import { TipoEmpreendimentoDeleteDialogComponent } from './delete/tipo-empreendimento-delete-dialog.component';
import { TipoEmpreendimentoRoutingModule } from './route/tipo-empreendimento-routing.module';

@NgModule({
  imports: [SharedModule, TipoEmpreendimentoRoutingModule],
  declarations: [
    TipoEmpreendimentoComponent,
    TipoEmpreendimentoDetailComponent,
    TipoEmpreendimentoUpdateComponent,
    TipoEmpreendimentoDeleteDialogComponent,
  ],
  entryComponents: [TipoEmpreendimentoDeleteDialogComponent],
})
export class TipoEmpreendimentoModule {}
