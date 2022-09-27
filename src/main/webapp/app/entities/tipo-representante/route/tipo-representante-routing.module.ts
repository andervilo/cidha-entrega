import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TipoRepresentanteComponent } from '../list/tipo-representante.component';
import { TipoRepresentanteDetailComponent } from '../detail/tipo-representante-detail.component';
import { TipoRepresentanteUpdateComponent } from '../update/tipo-representante-update.component';
import { TipoRepresentanteRoutingResolveService } from './tipo-representante-routing-resolve.service';

const tipoRepresentanteRoute: Routes = [
  {
    path: '',
    component: TipoRepresentanteComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoRepresentanteDetailComponent,
    resolve: {
      tipoRepresentante: TipoRepresentanteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoRepresentanteUpdateComponent,
    resolve: {
      tipoRepresentante: TipoRepresentanteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoRepresentanteUpdateComponent,
    resolve: {
      tipoRepresentante: TipoRepresentanteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tipoRepresentanteRoute)],
  exports: [RouterModule],
})
export class TipoRepresentanteRoutingModule {}
