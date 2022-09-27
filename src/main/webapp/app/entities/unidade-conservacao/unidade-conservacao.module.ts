import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UnidadeConservacaoComponent } from './list/unidade-conservacao.component';
import { UnidadeConservacaoDetailComponent } from './detail/unidade-conservacao-detail.component';
import { UnidadeConservacaoUpdateComponent } from './update/unidade-conservacao-update.component';
import { UnidadeConservacaoDeleteDialogComponent } from './delete/unidade-conservacao-delete-dialog.component';
import { UnidadeConservacaoRoutingModule } from './route/unidade-conservacao-routing.module';

@NgModule({
  imports: [SharedModule, UnidadeConservacaoRoutingModule],
  declarations: [
    UnidadeConservacaoComponent,
    UnidadeConservacaoDetailComponent,
    UnidadeConservacaoUpdateComponent,
    UnidadeConservacaoDeleteDialogComponent,
  ],
  entryComponents: [UnidadeConservacaoDeleteDialogComponent],
})
export class UnidadeConservacaoModule {}
