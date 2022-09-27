import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SecaoJudiciariaComponent } from '../list/secao-judiciaria.component';
import { SecaoJudiciariaDetailComponent } from '../detail/secao-judiciaria-detail.component';
import { SecaoJudiciariaUpdateComponent } from '../update/secao-judiciaria-update.component';
import { SecaoJudiciariaRoutingResolveService } from './secao-judiciaria-routing-resolve.service';

const secaoJudiciariaRoute: Routes = [
  {
    path: '',
    component: SecaoJudiciariaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SecaoJudiciariaDetailComponent,
    resolve: {
      secaoJudiciaria: SecaoJudiciariaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SecaoJudiciariaUpdateComponent,
    resolve: {
      secaoJudiciaria: SecaoJudiciariaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SecaoJudiciariaUpdateComponent,
    resolve: {
      secaoJudiciaria: SecaoJudiciariaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(secaoJudiciariaRoute)],
  exports: [RouterModule],
})
export class SecaoJudiciariaRoutingModule {}
