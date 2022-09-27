import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ParteInteresssadaComponent } from '../list/parte-interesssada.component';
import { ParteInteresssadaDetailComponent } from '../detail/parte-interesssada-detail.component';
import { ParteInteresssadaUpdateComponent } from '../update/parte-interesssada-update.component';
import { ParteInteresssadaRoutingResolveService } from './parte-interesssada-routing-resolve.service';

const parteInteresssadaRoute: Routes = [
  {
    path: '',
    component: ParteInteresssadaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ParteInteresssadaDetailComponent,
    resolve: {
      parteInteresssada: ParteInteresssadaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ParteInteresssadaUpdateComponent,
    resolve: {
      parteInteresssada: ParteInteresssadaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ParteInteresssadaUpdateComponent,
    resolve: {
      parteInteresssada: ParteInteresssadaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(parteInteresssadaRoute)],
  exports: [RouterModule],
})
export class ParteInteresssadaRoutingModule {}
