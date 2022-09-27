import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FundamentacaoDoutrinariaComponent } from './list/fundamentacao-doutrinaria.component';
import { FundamentacaoDoutrinariaDetailComponent } from './detail/fundamentacao-doutrinaria-detail.component';
import { FundamentacaoDoutrinariaUpdateComponent } from './update/fundamentacao-doutrinaria-update.component';
import { FundamentacaoDoutrinariaDeleteDialogComponent } from './delete/fundamentacao-doutrinaria-delete-dialog.component';
import { FundamentacaoDoutrinariaRoutingModule } from './route/fundamentacao-doutrinaria-routing.module';

@NgModule({
  imports: [SharedModule, FundamentacaoDoutrinariaRoutingModule],
  declarations: [
    FundamentacaoDoutrinariaComponent,
    FundamentacaoDoutrinariaDetailComponent,
    FundamentacaoDoutrinariaUpdateComponent,
    FundamentacaoDoutrinariaDeleteDialogComponent,
  ],
  entryComponents: [FundamentacaoDoutrinariaDeleteDialogComponent],
})
export class FundamentacaoDoutrinariaModule {}
