import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DataComponent } from '../list/data.component';
import { DataDetailComponent } from '../detail/data-detail.component';
import { DataUpdateComponent } from '../update/data-update.component';
import { DataRoutingResolveService } from './data-routing-resolve.service';

const dataRoute: Routes = [
  {
    path: '',
    component: DataComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DataDetailComponent,
    resolve: {
      data: DataRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DataUpdateComponent,
    resolve: {
      data: DataRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DataUpdateComponent,
    resolve: {
      data: DataRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dataRoute)],
  exports: [RouterModule],
})
export class DataRoutingModule {}
