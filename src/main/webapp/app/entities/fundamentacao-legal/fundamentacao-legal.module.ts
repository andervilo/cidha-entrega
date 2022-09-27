import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FundamentacaoLegalComponent } from './list/fundamentacao-legal.component';
import { FundamentacaoLegalDetailComponent } from './detail/fundamentacao-legal-detail.component';
import { FundamentacaoLegalUpdateComponent } from './update/fundamentacao-legal-update.component';
import { FundamentacaoLegalDeleteDialogComponent } from './delete/fundamentacao-legal-delete-dialog.component';
import { FundamentacaoLegalRoutingModule } from './route/fundamentacao-legal-routing.module';

@NgModule({
  imports: [SharedModule, FundamentacaoLegalRoutingModule],
  declarations: [
    FundamentacaoLegalComponent,
    FundamentacaoLegalDetailComponent,
    FundamentacaoLegalUpdateComponent,
    FundamentacaoLegalDeleteDialogComponent,
  ],
  entryComponents: [FundamentacaoLegalDeleteDialogComponent],
})
export class FundamentacaoLegalModule {}
