import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { QuilomboComponent } from '../list/quilombo.component';
import { QuilomboDetailComponent } from '../detail/quilombo-detail.component';
import { QuilomboUpdateComponent } from '../update/quilombo-update.component';
import { QuilomboRoutingResolveService } from './quilombo-routing-resolve.service';

const quilomboRoute: Routes = [
  {
    path: '',
    component: QuilomboComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuilomboDetailComponent,
    resolve: {
      quilombo: QuilomboRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuilomboUpdateComponent,
    resolve: {
      quilombo: QuilomboRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuilomboUpdateComponent,
    resolve: {
      quilombo: QuilomboRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(quilomboRoute)],
  exports: [RouterModule],
})
export class QuilomboRoutingModule {}
