import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DireitoComponent } from '../list/direito.component';
import { DireitoDetailComponent } from '../detail/direito-detail.component';
import { DireitoUpdateComponent } from '../update/direito-update.component';
import { DireitoRoutingResolveService } from './direito-routing-resolve.service';

const direitoRoute: Routes = [
  {
    path: '',
    component: DireitoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DireitoDetailComponent,
    resolve: {
      direito: DireitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DireitoUpdateComponent,
    resolve: {
      direito: DireitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DireitoUpdateComponent,
    resolve: {
      direito: DireitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(direitoRoute)],
  exports: [RouterModule],
})
export class DireitoRoutingModule {}
