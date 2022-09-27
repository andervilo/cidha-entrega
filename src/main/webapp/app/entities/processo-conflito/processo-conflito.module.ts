import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProcessoConflitoComponent } from './list/processo-conflito.component';
import { ProcessoConflitoDetailComponent } from './detail/processo-conflito-detail.component';
import { ProcessoConflitoUpdateComponent } from './update/processo-conflito-update.component';
import { ProcessoConflitoDeleteDialogComponent } from './delete/processo-conflito-delete-dialog.component';
import { ProcessoConflitoRoutingModule } from './route/processo-conflito-routing.module';

@NgModule({
  imports: [SharedModule, ProcessoConflitoRoutingModule],
  declarations: [
    ProcessoConflitoComponent,
    ProcessoConflitoDetailComponent,
    ProcessoConflitoUpdateComponent,
    ProcessoConflitoDeleteDialogComponent,
  ],
  entryComponents: [ProcessoConflitoDeleteDialogComponent],
})
export class ProcessoConflitoModule {}
