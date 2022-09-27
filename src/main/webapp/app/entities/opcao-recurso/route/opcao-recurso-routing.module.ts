import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { OpcaoRecursoComponent } from '../list/opcao-recurso.component';
import { OpcaoRecursoDetailComponent } from '../detail/opcao-recurso-detail.component';
import { OpcaoRecursoUpdateComponent } from '../update/opcao-recurso-update.component';
import { OpcaoRecursoRoutingResolveService } from './opcao-recurso-routing-resolve.service';

const opcaoRecursoRoute: Routes = [
  {
    path: '',
    component: OpcaoRecursoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OpcaoRecursoDetailComponent,
    resolve: {
      opcaoRecurso: OpcaoRecursoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OpcaoRecursoUpdateComponent,
    resolve: {
      opcaoRecurso: OpcaoRecursoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OpcaoRecursoUpdateComponent,
    resolve: {
      opcaoRecurso: OpcaoRecursoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(opcaoRecursoRoute)],
  exports: [RouterModule],
})
export class OpcaoRecursoRoutingModule {}
