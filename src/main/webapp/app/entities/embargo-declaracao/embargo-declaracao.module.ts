import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EmbargoDeclaracaoComponent } from './list/embargo-declaracao.component';
import { EmbargoDeclaracaoDetailComponent } from './detail/embargo-declaracao-detail.component';
import { EmbargoDeclaracaoUpdateComponent } from './update/embargo-declaracao-update.component';
import { EmbargoDeclaracaoDeleteDialogComponent } from './delete/embargo-declaracao-delete-dialog.component';
import { EmbargoDeclaracaoRoutingModule } from './route/embargo-declaracao-routing.module';

@NgModule({
  imports: [SharedModule, EmbargoDeclaracaoRoutingModule],
  declarations: [
    EmbargoDeclaracaoComponent,
    EmbargoDeclaracaoDetailComponent,
    EmbargoDeclaracaoUpdateComponent,
    EmbargoDeclaracaoDeleteDialogComponent,
  ],
  entryComponents: [EmbargoDeclaracaoDeleteDialogComponent],
})
export class EmbargoDeclaracaoModule {}
