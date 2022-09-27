import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmbargoRespReComponent } from '../list/embargo-resp-re.component';
import { EmbargoRespReDetailComponent } from '../detail/embargo-resp-re-detail.component';
import { EmbargoRespReUpdateComponent } from '../update/embargo-resp-re-update.component';
import { EmbargoRespReRoutingResolveService } from './embargo-resp-re-routing-resolve.service';

const embargoRespReRoute: Routes = [
  {
    path: '',
    component: EmbargoRespReComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmbargoRespReDetailComponent,
    resolve: {
      embargoRespRe: EmbargoRespReRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmbargoRespReUpdateComponent,
    resolve: {
      embargoRespRe: EmbargoRespReRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmbargoRespReUpdateComponent,
    resolve: {
      embargoRespRe: EmbargoRespReRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(embargoRespReRoute)],
  exports: [RouterModule],
})
export class EmbargoRespReRoutingModule {}
