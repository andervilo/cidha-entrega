import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TerraIndigenaComponent } from '../list/terra-indigena.component';
import { TerraIndigenaDetailComponent } from '../detail/terra-indigena-detail.component';
import { TerraIndigenaUpdateComponent } from '../update/terra-indigena-update.component';
import { TerraIndigenaRoutingResolveService } from './terra-indigena-routing-resolve.service';

const terraIndigenaRoute: Routes = [
  {
    path: '',
    component: TerraIndigenaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TerraIndigenaDetailComponent,
    resolve: {
      terraIndigena: TerraIndigenaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TerraIndigenaUpdateComponent,
    resolve: {
      terraIndigena: TerraIndigenaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TerraIndigenaUpdateComponent,
    resolve: {
      terraIndigena: TerraIndigenaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(terraIndigenaRoute)],
  exports: [RouterModule],
})
export class TerraIndigenaRoutingModule {}
