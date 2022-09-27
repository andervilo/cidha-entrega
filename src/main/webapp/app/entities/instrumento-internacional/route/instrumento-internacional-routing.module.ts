import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InstrumentoInternacionalComponent } from '../list/instrumento-internacional.component';
import { InstrumentoInternacionalDetailComponent } from '../detail/instrumento-internacional-detail.component';
import { InstrumentoInternacionalUpdateComponent } from '../update/instrumento-internacional-update.component';
import { InstrumentoInternacionalRoutingResolveService } from './instrumento-internacional-routing-resolve.service';

const instrumentoInternacionalRoute: Routes = [
  {
    path: '',
    component: InstrumentoInternacionalComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InstrumentoInternacionalDetailComponent,
    resolve: {
      instrumentoInternacional: InstrumentoInternacionalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InstrumentoInternacionalUpdateComponent,
    resolve: {
      instrumentoInternacional: InstrumentoInternacionalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InstrumentoInternacionalUpdateComponent,
    resolve: {
      instrumentoInternacional: InstrumentoInternacionalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(instrumentoInternacionalRoute)],
  exports: [RouterModule],
})
export class InstrumentoInternacionalRoutingModule {}
