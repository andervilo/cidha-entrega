import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TipoDecisaoComponent } from './list/tipo-decisao.component';
import { TipoDecisaoDetailComponent } from './detail/tipo-decisao-detail.component';
import { TipoDecisaoUpdateComponent } from './update/tipo-decisao-update.component';
import { TipoDecisaoDeleteDialogComponent } from './delete/tipo-decisao-delete-dialog.component';
import { TipoDecisaoRoutingModule } from './route/tipo-decisao-routing.module';

@NgModule({
  imports: [SharedModule, TipoDecisaoRoutingModule],
  declarations: [TipoDecisaoComponent, TipoDecisaoDetailComponent, TipoDecisaoUpdateComponent, TipoDecisaoDeleteDialogComponent],
  entryComponents: [TipoDecisaoDeleteDialogComponent],
})
export class TipoDecisaoModule {}
