import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FundamentacaoLegalComponent } from '../list/fundamentacao-legal.component';
import { FundamentacaoLegalDetailComponent } from '../detail/fundamentacao-legal-detail.component';
import { FundamentacaoLegalUpdateComponent } from '../update/fundamentacao-legal-update.component';
import { FundamentacaoLegalRoutingResolveService } from './fundamentacao-legal-routing-resolve.service';

const fundamentacaoLegalRoute: Routes = [
  {
    path: '',
    component: FundamentacaoLegalComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FundamentacaoLegalDetailComponent,
    resolve: {
      fundamentacaoLegal: FundamentacaoLegalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FundamentacaoLegalUpdateComponent,
    resolve: {
      fundamentacaoLegal: FundamentacaoLegalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FundamentacaoLegalUpdateComponent,
    resolve: {
      fundamentacaoLegal: FundamentacaoLegalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fundamentacaoLegalRoute)],
  exports: [RouterModule],
})
export class FundamentacaoLegalRoutingModule {}
