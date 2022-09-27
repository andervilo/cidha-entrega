import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AtividadeExploracaoIlegalComponent } from './list/atividade-exploracao-ilegal.component';
import { AtividadeExploracaoIlegalDetailComponent } from './detail/atividade-exploracao-ilegal-detail.component';
import { AtividadeExploracaoIlegalUpdateComponent } from './update/atividade-exploracao-ilegal-update.component';
import { AtividadeExploracaoIlegalDeleteDialogComponent } from './delete/atividade-exploracao-ilegal-delete-dialog.component';
import { AtividadeExploracaoIlegalRoutingModule } from './route/atividade-exploracao-ilegal-routing.module';

@NgModule({
  imports: [SharedModule, AtividadeExploracaoIlegalRoutingModule],
  declarations: [
    AtividadeExploracaoIlegalComponent,
    AtividadeExploracaoIlegalDetailComponent,
    AtividadeExploracaoIlegalUpdateComponent,
    AtividadeExploracaoIlegalDeleteDialogComponent,
  ],
  entryComponents: [AtividadeExploracaoIlegalDeleteDialogComponent],
})
export class AtividadeExploracaoIlegalModule {}
