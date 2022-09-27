import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProcessoConflitoComponent } from '../list/processo-conflito.component';
import { ProcessoConflitoDetailComponent } from '../detail/processo-conflito-detail.component';
import { ProcessoConflitoUpdateComponent } from '../update/processo-conflito-update.component';
import { ProcessoConflitoRoutingResolveService } from './processo-conflito-routing-resolve.service';

const processoConflitoRoute: Routes = [
  {
    path: '',
    component: ProcessoConflitoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProcessoConflitoDetailComponent,
    resolve: {
      processoConflito: ProcessoConflitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProcessoConflitoUpdateComponent,
    resolve: {
      processoConflito: ProcessoConflitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProcessoConflitoUpdateComponent,
    resolve: {
      processoConflito: ProcessoConflitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(processoConflitoRoute)],
  exports: [RouterModule],
})
export class ProcessoConflitoRoutingModule {}
