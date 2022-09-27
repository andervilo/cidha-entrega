import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EtniaIndigenaComponent } from '../list/etnia-indigena.component';
import { EtniaIndigenaDetailComponent } from '../detail/etnia-indigena-detail.component';
import { EtniaIndigenaUpdateComponent } from '../update/etnia-indigena-update.component';
import { EtniaIndigenaRoutingResolveService } from './etnia-indigena-routing-resolve.service';

const etniaIndigenaRoute: Routes = [
  {
    path: '',
    component: EtniaIndigenaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EtniaIndigenaDetailComponent,
    resolve: {
      etniaIndigena: EtniaIndigenaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EtniaIndigenaUpdateComponent,
    resolve: {
      etniaIndigena: EtniaIndigenaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EtniaIndigenaUpdateComponent,
    resolve: {
      etniaIndigena: EtniaIndigenaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(etniaIndigenaRoute)],
  exports: [RouterModule],
})
export class EtniaIndigenaRoutingModule {}
