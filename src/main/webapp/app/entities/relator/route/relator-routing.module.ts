import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RelatorComponent } from '../list/relator.component';
import { RelatorDetailComponent } from '../detail/relator-detail.component';
import { RelatorUpdateComponent } from '../update/relator-update.component';
import { RelatorRoutingResolveService } from './relator-routing-resolve.service';

const relatorRoute: Routes = [
  {
    path: '',
    component: RelatorComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RelatorDetailComponent,
    resolve: {
      relator: RelatorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RelatorUpdateComponent,
    resolve: {
      relator: RelatorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RelatorUpdateComponent,
    resolve: {
      relator: RelatorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(relatorRoute)],
  exports: [RouterModule],
})
export class RelatorRoutingModule {}
