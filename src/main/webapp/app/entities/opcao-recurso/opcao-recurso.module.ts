import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OpcaoRecursoComponent } from './list/opcao-recurso.component';
import { OpcaoRecursoDetailComponent } from './detail/opcao-recurso-detail.component';
import { OpcaoRecursoUpdateComponent } from './update/opcao-recurso-update.component';
import { OpcaoRecursoDeleteDialogComponent } from './delete/opcao-recurso-delete-dialog.component';
import { OpcaoRecursoRoutingModule } from './route/opcao-recurso-routing.module';

@NgModule({
  imports: [SharedModule, OpcaoRecursoRoutingModule],
  declarations: [OpcaoRecursoComponent, OpcaoRecursoDetailComponent, OpcaoRecursoUpdateComponent, OpcaoRecursoDeleteDialogComponent],
  entryComponents: [OpcaoRecursoDeleteDialogComponent],
})
export class OpcaoRecursoModule {}
