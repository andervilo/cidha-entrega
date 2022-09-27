import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmbargoRecursoEspecialComponent } from '../list/embargo-recurso-especial.component';
import { EmbargoRecursoEspecialDetailComponent } from '../detail/embargo-recurso-especial-detail.component';
import { EmbargoRecursoEspecialUpdateComponent } from '../update/embargo-recurso-especial-update.component';
import { EmbargoRecursoEspecialRoutingResolveService } from './embargo-recurso-especial-routing-resolve.service';

const embargoRecursoEspecialRoute: Routes = [
  {
    path: '',
    component: EmbargoRecursoEspecialComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmbargoRecursoEspecialDetailComponent,
    resolve: {
      embargoRecursoEspecial: EmbargoRecursoEspecialRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmbargoRecursoEspecialUpdateComponent,
    resolve: {
      embargoRecursoEspecial: EmbargoRecursoEspecialRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmbargoRecursoEspecialUpdateComponent,
    resolve: {
      embargoRecursoEspecial: EmbargoRecursoEspecialRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(embargoRecursoEspecialRoute)],
  exports: [RouterModule],
})
export class EmbargoRecursoEspecialRoutingModule {}
