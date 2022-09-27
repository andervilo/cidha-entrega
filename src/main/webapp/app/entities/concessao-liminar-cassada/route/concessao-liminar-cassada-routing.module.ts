import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConcessaoLiminarCassadaComponent } from '../list/concessao-liminar-cassada.component';
import { ConcessaoLiminarCassadaDetailComponent } from '../detail/concessao-liminar-cassada-detail.component';
import { ConcessaoLiminarCassadaUpdateComponent } from '../update/concessao-liminar-cassada-update.component';
import { ConcessaoLiminarCassadaRoutingResolveService } from './concessao-liminar-cassada-routing-resolve.service';

const concessaoLiminarCassadaRoute: Routes = [
  {
    path: '',
    component: ConcessaoLiminarCassadaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConcessaoLiminarCassadaDetailComponent,
    resolve: {
      concessaoLiminarCassada: ConcessaoLiminarCassadaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConcessaoLiminarCassadaUpdateComponent,
    resolve: {
      concessaoLiminarCassada: ConcessaoLiminarCassadaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConcessaoLiminarCassadaUpdateComponent,
    resolve: {
      concessaoLiminarCassada: ConcessaoLiminarCassadaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(concessaoLiminarCassadaRoute)],
  exports: [RouterModule],
})
export class ConcessaoLiminarCassadaRoutingModule {}
