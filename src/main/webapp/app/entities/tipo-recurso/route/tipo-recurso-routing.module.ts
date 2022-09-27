import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TipoRecursoComponent } from '../list/tipo-recurso.component';
import { TipoRecursoDetailComponent } from '../detail/tipo-recurso-detail.component';
import { TipoRecursoUpdateComponent } from '../update/tipo-recurso-update.component';
import { TipoRecursoRoutingResolveService } from './tipo-recurso-routing-resolve.service';

const tipoRecursoRoute: Routes = [
  {
    path: '',
    component: TipoRecursoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoRecursoDetailComponent,
    resolve: {
      tipoRecurso: TipoRecursoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoRecursoUpdateComponent,
    resolve: {
      tipoRecurso: TipoRecursoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoRecursoUpdateComponent,
    resolve: {
      tipoRecurso: TipoRecursoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tipoRecursoRoute)],
  exports: [RouterModule],
})
export class TipoRecursoRoutingModule {}
