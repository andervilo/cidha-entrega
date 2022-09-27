import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SubsecaoJudiciariaComponent } from '../list/subsecao-judiciaria.component';
import { SubsecaoJudiciariaDetailComponent } from '../detail/subsecao-judiciaria-detail.component';
import { SubsecaoJudiciariaUpdateComponent } from '../update/subsecao-judiciaria-update.component';
import { SubsecaoJudiciariaRoutingResolveService } from './subsecao-judiciaria-routing-resolve.service';

const subsecaoJudiciariaRoute: Routes = [
  {
    path: '',
    component: SubsecaoJudiciariaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SubsecaoJudiciariaDetailComponent,
    resolve: {
      subsecaoJudiciaria: SubsecaoJudiciariaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SubsecaoJudiciariaUpdateComponent,
    resolve: {
      subsecaoJudiciaria: SubsecaoJudiciariaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SubsecaoJudiciariaUpdateComponent,
    resolve: {
      subsecaoJudiciaria: SubsecaoJudiciariaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(subsecaoJudiciariaRoute)],
  exports: [RouterModule],
})
export class SubsecaoJudiciariaRoutingModule {}
