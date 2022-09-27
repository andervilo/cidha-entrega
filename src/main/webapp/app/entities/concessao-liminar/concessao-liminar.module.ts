import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ConcessaoLiminarComponent } from './list/concessao-liminar.component';
import { ConcessaoLiminarDetailComponent } from './detail/concessao-liminar-detail.component';
import { ConcessaoLiminarUpdateComponent } from './update/concessao-liminar-update.component';
import { ConcessaoLiminarDeleteDialogComponent } from './delete/concessao-liminar-delete-dialog.component';
import { ConcessaoLiminarRoutingModule } from './route/concessao-liminar-routing.module';

@NgModule({
  imports: [SharedModule, ConcessaoLiminarRoutingModule],
  declarations: [
    ConcessaoLiminarComponent,
    ConcessaoLiminarDetailComponent,
    ConcessaoLiminarUpdateComponent,
    ConcessaoLiminarDeleteDialogComponent,
  ],
  entryComponents: [ConcessaoLiminarDeleteDialogComponent],
})
export class ConcessaoLiminarModule {}
