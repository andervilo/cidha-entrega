import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TerritorioComponent } from './list/territorio.component';
import { TerritorioDetailComponent } from './detail/territorio-detail.component';
import { TerritorioUpdateComponent } from './update/territorio-update.component';
import { TerritorioDeleteDialogComponent } from './delete/territorio-delete-dialog.component';
import { TerritorioRoutingModule } from './route/territorio-routing.module';

@NgModule({
  imports: [SharedModule, TerritorioRoutingModule],
  declarations: [TerritorioComponent, TerritorioDetailComponent, TerritorioUpdateComponent, TerritorioDeleteDialogComponent],
  entryComponents: [TerritorioDeleteDialogComponent],
})
export class TerritorioModule {}
