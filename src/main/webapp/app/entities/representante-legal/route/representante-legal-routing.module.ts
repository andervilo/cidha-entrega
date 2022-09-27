import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RepresentanteLegalComponent } from '../list/representante-legal.component';
import { RepresentanteLegalDetailComponent } from '../detail/representante-legal-detail.component';
import { RepresentanteLegalUpdateComponent } from '../update/representante-legal-update.component';
import { RepresentanteLegalRoutingResolveService } from './representante-legal-routing-resolve.service';

const representanteLegalRoute: Routes = [
  {
    path: '',
    component: RepresentanteLegalComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RepresentanteLegalDetailComponent,
    resolve: {
      representanteLegal: RepresentanteLegalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RepresentanteLegalUpdateComponent,
    resolve: {
      representanteLegal: RepresentanteLegalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RepresentanteLegalUpdateComponent,
    resolve: {
      representanteLegal: RepresentanteLegalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(representanteLegalRoute)],
  exports: [RouterModule],
})
export class RepresentanteLegalRoutingModule {}
