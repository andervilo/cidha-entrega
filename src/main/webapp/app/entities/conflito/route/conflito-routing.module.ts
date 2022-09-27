import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConflitoComponent } from '../list/conflito.component';
import { ConflitoDetailComponent } from '../detail/conflito-detail.component';
import { ConflitoUpdateComponent } from '../update/conflito-update.component';
import { ConflitoRoutingResolveService } from './conflito-routing-resolve.service';

const conflitoRoute: Routes = [
  {
    path: '',
    component: ConflitoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConflitoDetailComponent,
    resolve: {
      conflito: ConflitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConflitoUpdateComponent,
    resolve: {
      conflito: ConflitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConflitoUpdateComponent,
    resolve: {
      conflito: ConflitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(conflitoRoute)],
  exports: [RouterModule],
})
export class ConflitoRoutingModule {}
