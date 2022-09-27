import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConcessaoLiminarComponent } from '../list/concessao-liminar.component';
import { ConcessaoLiminarDetailComponent } from '../detail/concessao-liminar-detail.component';
import { ConcessaoLiminarUpdateComponent } from '../update/concessao-liminar-update.component';
import { ConcessaoLiminarRoutingResolveService } from './concessao-liminar-routing-resolve.service';

const concessaoLiminarRoute: Routes = [
  {
    path: '',
    component: ConcessaoLiminarComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConcessaoLiminarDetailComponent,
    resolve: {
      concessaoLiminar: ConcessaoLiminarRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConcessaoLiminarUpdateComponent,
    resolve: {
      concessaoLiminar: ConcessaoLiminarRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConcessaoLiminarUpdateComponent,
    resolve: {
      concessaoLiminar: ConcessaoLiminarRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(concessaoLiminarRoute)],
  exports: [RouterModule],
})
export class ConcessaoLiminarRoutingModule {}
