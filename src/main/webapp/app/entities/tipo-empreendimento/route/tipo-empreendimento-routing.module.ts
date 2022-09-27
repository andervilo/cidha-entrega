import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TipoEmpreendimentoComponent } from '../list/tipo-empreendimento.component';
import { TipoEmpreendimentoDetailComponent } from '../detail/tipo-empreendimento-detail.component';
import { TipoEmpreendimentoUpdateComponent } from '../update/tipo-empreendimento-update.component';
import { TipoEmpreendimentoRoutingResolveService } from './tipo-empreendimento-routing-resolve.service';

const tipoEmpreendimentoRoute: Routes = [
  {
    path: '',
    component: TipoEmpreendimentoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoEmpreendimentoDetailComponent,
    resolve: {
      tipoEmpreendimento: TipoEmpreendimentoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoEmpreendimentoUpdateComponent,
    resolve: {
      tipoEmpreendimento: TipoEmpreendimentoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoEmpreendimentoUpdateComponent,
    resolve: {
      tipoEmpreendimento: TipoEmpreendimentoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tipoEmpreendimentoRoute)],
  exports: [RouterModule],
})
export class TipoEmpreendimentoRoutingModule {}
