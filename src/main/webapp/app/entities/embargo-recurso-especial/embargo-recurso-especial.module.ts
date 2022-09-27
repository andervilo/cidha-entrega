import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EmbargoRecursoEspecialComponent } from './list/embargo-recurso-especial.component';
import { EmbargoRecursoEspecialDetailComponent } from './detail/embargo-recurso-especial-detail.component';
import { EmbargoRecursoEspecialUpdateComponent } from './update/embargo-recurso-especial-update.component';
import { EmbargoRecursoEspecialDeleteDialogComponent } from './delete/embargo-recurso-especial-delete-dialog.component';
import { EmbargoRecursoEspecialRoutingModule } from './route/embargo-recurso-especial-routing.module';

@NgModule({
  imports: [SharedModule, EmbargoRecursoEspecialRoutingModule],
  declarations: [
    EmbargoRecursoEspecialComponent,
    EmbargoRecursoEspecialDetailComponent,
    EmbargoRecursoEspecialUpdateComponent,
    EmbargoRecursoEspecialDeleteDialogComponent,
  ],
  entryComponents: [EmbargoRecursoEspecialDeleteDialogComponent],
})
export class EmbargoRecursoEspecialModule {}
