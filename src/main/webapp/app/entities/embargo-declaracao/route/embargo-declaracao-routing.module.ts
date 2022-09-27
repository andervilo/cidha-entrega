import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmbargoDeclaracaoComponent } from '../list/embargo-declaracao.component';
import { EmbargoDeclaracaoDetailComponent } from '../detail/embargo-declaracao-detail.component';
import { EmbargoDeclaracaoUpdateComponent } from '../update/embargo-declaracao-update.component';
import { EmbargoDeclaracaoRoutingResolveService } from './embargo-declaracao-routing-resolve.service';

const embargoDeclaracaoRoute: Routes = [
  {
    path: '',
    component: EmbargoDeclaracaoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmbargoDeclaracaoDetailComponent,
    resolve: {
      embargoDeclaracao: EmbargoDeclaracaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmbargoDeclaracaoUpdateComponent,
    resolve: {
      embargoDeclaracao: EmbargoDeclaracaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmbargoDeclaracaoUpdateComponent,
    resolve: {
      embargoDeclaracao: EmbargoDeclaracaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(embargoDeclaracaoRoute)],
  exports: [RouterModule],
})
export class EmbargoDeclaracaoRoutingModule {}
