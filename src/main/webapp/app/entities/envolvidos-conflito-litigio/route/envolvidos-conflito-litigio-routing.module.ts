import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EnvolvidosConflitoLitigioComponent } from '../list/envolvidos-conflito-litigio.component';
import { EnvolvidosConflitoLitigioDetailComponent } from '../detail/envolvidos-conflito-litigio-detail.component';
import { EnvolvidosConflitoLitigioUpdateComponent } from '../update/envolvidos-conflito-litigio-update.component';
import { EnvolvidosConflitoLitigioRoutingResolveService } from './envolvidos-conflito-litigio-routing-resolve.service';

const envolvidosConflitoLitigioRoute: Routes = [
  {
    path: '',
    component: EnvolvidosConflitoLitigioComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EnvolvidosConflitoLitigioDetailComponent,
    resolve: {
      envolvidosConflitoLitigio: EnvolvidosConflitoLitigioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EnvolvidosConflitoLitigioUpdateComponent,
    resolve: {
      envolvidosConflitoLitigio: EnvolvidosConflitoLitigioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EnvolvidosConflitoLitigioUpdateComponent,
    resolve: {
      envolvidosConflitoLitigio: EnvolvidosConflitoLitigioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(envolvidosConflitoLitigioRoute)],
  exports: [RouterModule],
})
export class EnvolvidosConflitoLitigioRoutingModule {}
