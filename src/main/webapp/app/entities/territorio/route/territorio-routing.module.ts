import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TerritorioComponent } from '../list/territorio.component';
import { TerritorioDetailComponent } from '../detail/territorio-detail.component';
import { TerritorioUpdateComponent } from '../update/territorio-update.component';
import { TerritorioRoutingResolveService } from './territorio-routing-resolve.service';

const territorioRoute: Routes = [
  {
    path: '',
    component: TerritorioComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TerritorioDetailComponent,
    resolve: {
      territorio: TerritorioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TerritorioUpdateComponent,
    resolve: {
      territorio: TerritorioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TerritorioUpdateComponent,
    resolve: {
      territorio: TerritorioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(territorioRoute)],
  exports: [RouterModule],
})
export class TerritorioRoutingModule {}
