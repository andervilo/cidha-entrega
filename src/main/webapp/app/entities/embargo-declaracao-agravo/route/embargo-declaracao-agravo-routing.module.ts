import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmbargoDeclaracaoAgravoComponent } from '../list/embargo-declaracao-agravo.component';
import { EmbargoDeclaracaoAgravoDetailComponent } from '../detail/embargo-declaracao-agravo-detail.component';
import { EmbargoDeclaracaoAgravoUpdateComponent } from '../update/embargo-declaracao-agravo-update.component';
import { EmbargoDeclaracaoAgravoRoutingResolveService } from './embargo-declaracao-agravo-routing-resolve.service';

const embargoDeclaracaoAgravoRoute: Routes = [
  {
    path: '',
    component: EmbargoDeclaracaoAgravoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmbargoDeclaracaoAgravoDetailComponent,
    resolve: {
      embargoDeclaracaoAgravo: EmbargoDeclaracaoAgravoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmbargoDeclaracaoAgravoUpdateComponent,
    resolve: {
      embargoDeclaracaoAgravo: EmbargoDeclaracaoAgravoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmbargoDeclaracaoAgravoUpdateComponent,
    resolve: {
      embargoDeclaracaoAgravo: EmbargoDeclaracaoAgravoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(embargoDeclaracaoAgravoRoute)],
  exports: [RouterModule],
})
export class EmbargoDeclaracaoAgravoRoutingModule {}
