import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ComarcaComponent } from '../list/comarca.component';
import { ComarcaDetailComponent } from '../detail/comarca-detail.component';
import { ComarcaUpdateComponent } from '../update/comarca-update.component';
import { ComarcaRoutingResolveService } from './comarca-routing-resolve.service';

const comarcaRoute: Routes = [
  {
    path: '',
    component: ComarcaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ComarcaDetailComponent,
    resolve: {
      comarca: ComarcaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ComarcaUpdateComponent,
    resolve: {
      comarca: ComarcaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ComarcaUpdateComponent,
    resolve: {
      comarca: ComarcaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(comarcaRoute)],
  exports: [RouterModule],
})
export class ComarcaRoutingModule {}
