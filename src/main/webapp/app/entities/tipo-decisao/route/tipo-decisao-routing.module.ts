import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TipoDecisaoComponent } from '../list/tipo-decisao.component';
import { TipoDecisaoDetailComponent } from '../detail/tipo-decisao-detail.component';
import { TipoDecisaoUpdateComponent } from '../update/tipo-decisao-update.component';
import { TipoDecisaoRoutingResolveService } from './tipo-decisao-routing-resolve.service';

const tipoDecisaoRoute: Routes = [
  {
    path: '',
    component: TipoDecisaoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoDecisaoDetailComponent,
    resolve: {
      tipoDecisao: TipoDecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoDecisaoUpdateComponent,
    resolve: {
      tipoDecisao: TipoDecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoDecisaoUpdateComponent,
    resolve: {
      tipoDecisao: TipoDecisaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tipoDecisaoRoute)],
  exports: [RouterModule],
})
export class TipoDecisaoRoutingModule {}
