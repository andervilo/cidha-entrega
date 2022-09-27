import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EnvolvidosConflitoLitigioComponent } from './list/envolvidos-conflito-litigio.component';
import { EnvolvidosConflitoLitigioDetailComponent } from './detail/envolvidos-conflito-litigio-detail.component';
import { EnvolvidosConflitoLitigioUpdateComponent } from './update/envolvidos-conflito-litigio-update.component';
import { EnvolvidosConflitoLitigioDeleteDialogComponent } from './delete/envolvidos-conflito-litigio-delete-dialog.component';
import { EnvolvidosConflitoLitigioRoutingModule } from './route/envolvidos-conflito-litigio-routing.module';

@NgModule({
  imports: [SharedModule, EnvolvidosConflitoLitigioRoutingModule],
  declarations: [
    EnvolvidosConflitoLitigioComponent,
    EnvolvidosConflitoLitigioDetailComponent,
    EnvolvidosConflitoLitigioUpdateComponent,
    EnvolvidosConflitoLitigioDeleteDialogComponent,
  ],
  entryComponents: [EnvolvidosConflitoLitigioDeleteDialogComponent],
})
export class EnvolvidosConflitoLitigioModule {}
