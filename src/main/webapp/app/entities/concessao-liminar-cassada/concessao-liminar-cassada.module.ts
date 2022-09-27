import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ConcessaoLiminarCassadaComponent } from './list/concessao-liminar-cassada.component';
import { ConcessaoLiminarCassadaDetailComponent } from './detail/concessao-liminar-cassada-detail.component';
import { ConcessaoLiminarCassadaUpdateComponent } from './update/concessao-liminar-cassada-update.component';
import { ConcessaoLiminarCassadaDeleteDialogComponent } from './delete/concessao-liminar-cassada-delete-dialog.component';
import { ConcessaoLiminarCassadaRoutingModule } from './route/concessao-liminar-cassada-routing.module';

@NgModule({
  imports: [SharedModule, ConcessaoLiminarCassadaRoutingModule],
  declarations: [
    ConcessaoLiminarCassadaComponent,
    ConcessaoLiminarCassadaDetailComponent,
    ConcessaoLiminarCassadaUpdateComponent,
    ConcessaoLiminarCassadaDeleteDialogComponent,
  ],
  entryComponents: [ConcessaoLiminarCassadaDeleteDialogComponent],
})
export class ConcessaoLiminarCassadaModule {}
