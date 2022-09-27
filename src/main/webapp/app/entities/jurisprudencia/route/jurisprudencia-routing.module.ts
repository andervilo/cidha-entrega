import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { JurisprudenciaComponent } from '../list/jurisprudencia.component';
import { JurisprudenciaDetailComponent } from '../detail/jurisprudencia-detail.component';
import { JurisprudenciaUpdateComponent } from '../update/jurisprudencia-update.component';
import { JurisprudenciaRoutingResolveService } from './jurisprudencia-routing-resolve.service';

const jurisprudenciaRoute: Routes = [
  {
    path: '',
    component: JurisprudenciaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: JurisprudenciaDetailComponent,
    resolve: {
      jurisprudencia: JurisprudenciaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: JurisprudenciaUpdateComponent,
    resolve: {
      jurisprudencia: JurisprudenciaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: JurisprudenciaUpdateComponent,
    resolve: {
      jurisprudencia: JurisprudenciaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(jurisprudenciaRoute)],
  exports: [RouterModule],
})
export class JurisprudenciaRoutingModule {}
