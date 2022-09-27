import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TipoDataComponent } from '../list/tipo-data.component';
import { TipoDataDetailComponent } from '../detail/tipo-data-detail.component';
import { TipoDataUpdateComponent } from '../update/tipo-data-update.component';
import { TipoDataRoutingResolveService } from './tipo-data-routing-resolve.service';

const tipoDataRoute: Routes = [
  {
    path: '',
    component: TipoDataComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoDataDetailComponent,
    resolve: {
      tipoData: TipoDataRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoDataUpdateComponent,
    resolve: {
      tipoData: TipoDataRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoDataUpdateComponent,
    resolve: {
      tipoData: TipoDataRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tipoDataRoute)],
  exports: [RouterModule],
})
export class TipoDataRoutingModule {}
