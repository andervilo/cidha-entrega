import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EmbargoDeclaracaoAgravoComponent } from './list/embargo-declaracao-agravo.component';
import { EmbargoDeclaracaoAgravoDetailComponent } from './detail/embargo-declaracao-agravo-detail.component';
import { EmbargoDeclaracaoAgravoUpdateComponent } from './update/embargo-declaracao-agravo-update.component';
import { EmbargoDeclaracaoAgravoDeleteDialogComponent } from './delete/embargo-declaracao-agravo-delete-dialog.component';
import { EmbargoDeclaracaoAgravoRoutingModule } from './route/embargo-declaracao-agravo-routing.module';

@NgModule({
  imports: [SharedModule, EmbargoDeclaracaoAgravoRoutingModule],
  declarations: [
    EmbargoDeclaracaoAgravoComponent,
    EmbargoDeclaracaoAgravoDetailComponent,
    EmbargoDeclaracaoAgravoUpdateComponent,
    EmbargoDeclaracaoAgravoDeleteDialogComponent,
  ],
  entryComponents: [EmbargoDeclaracaoAgravoDeleteDialogComponent],
})
export class EmbargoDeclaracaoAgravoModule {}
