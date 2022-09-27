import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProblemaJuridicoComponent } from '../list/problema-juridico.component';
import { ProblemaJuridicoDetailComponent } from '../detail/problema-juridico-detail.component';
import { ProblemaJuridicoUpdateComponent } from '../update/problema-juridico-update.component';
import { ProblemaJuridicoRoutingResolveService } from './problema-juridico-routing-resolve.service';

const problemaJuridicoRoute: Routes = [
  {
    path: '',
    component: ProblemaJuridicoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProblemaJuridicoDetailComponent,
    resolve: {
      problemaJuridico: ProblemaJuridicoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProblemaJuridicoUpdateComponent,
    resolve: {
      problemaJuridico: ProblemaJuridicoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProblemaJuridicoUpdateComponent,
    resolve: {
      problemaJuridico: ProblemaJuridicoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(problemaJuridicoRoute)],
  exports: [RouterModule],
})
export class ProblemaJuridicoRoutingModule {}
