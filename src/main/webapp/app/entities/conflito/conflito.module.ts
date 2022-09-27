import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ConflitoComponent } from './list/conflito.component';
import { ConflitoDetailComponent } from './detail/conflito-detail.component';
import { ConflitoUpdateComponent } from './update/conflito-update.component';
import { ConflitoDeleteDialogComponent } from './delete/conflito-delete-dialog.component';
import { ConflitoRoutingModule } from './route/conflito-routing.module';

@NgModule({
  imports: [SharedModule, ConflitoRoutingModule],
  declarations: [ConflitoComponent, ConflitoDetailComponent, ConflitoUpdateComponent, ConflitoDeleteDialogComponent],
  entryComponents: [ConflitoDeleteDialogComponent],
})
export class ConflitoModule {}
