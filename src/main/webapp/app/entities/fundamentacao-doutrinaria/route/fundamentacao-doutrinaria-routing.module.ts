import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FundamentacaoDoutrinariaComponent } from '../list/fundamentacao-doutrinaria.component';
import { FundamentacaoDoutrinariaDetailComponent } from '../detail/fundamentacao-doutrinaria-detail.component';
import { FundamentacaoDoutrinariaUpdateComponent } from '../update/fundamentacao-doutrinaria-update.component';
import { FundamentacaoDoutrinariaRoutingResolveService } from './fundamentacao-doutrinaria-routing-resolve.service';

const fundamentacaoDoutrinariaRoute: Routes = [
  {
    path: '',
    component: FundamentacaoDoutrinariaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FundamentacaoDoutrinariaDetailComponent,
    resolve: {
      fundamentacaoDoutrinaria: FundamentacaoDoutrinariaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FundamentacaoDoutrinariaUpdateComponent,
    resolve: {
      fundamentacaoDoutrinaria: FundamentacaoDoutrinariaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FundamentacaoDoutrinariaUpdateComponent,
    resolve: {
      fundamentacaoDoutrinaria: FundamentacaoDoutrinariaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fundamentacaoDoutrinariaRoute)],
  exports: [RouterModule],
})
export class FundamentacaoDoutrinariaRoutingModule {}
