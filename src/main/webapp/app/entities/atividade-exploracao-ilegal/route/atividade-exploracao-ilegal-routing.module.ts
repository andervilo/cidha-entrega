import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AtividadeExploracaoIlegalComponent } from '../list/atividade-exploracao-ilegal.component';
import { AtividadeExploracaoIlegalDetailComponent } from '../detail/atividade-exploracao-ilegal-detail.component';
import { AtividadeExploracaoIlegalUpdateComponent } from '../update/atividade-exploracao-ilegal-update.component';
import { AtividadeExploracaoIlegalRoutingResolveService } from './atividade-exploracao-ilegal-routing-resolve.service';

const atividadeExploracaoIlegalRoute: Routes = [
  {
    path: '',
    component: AtividadeExploracaoIlegalComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AtividadeExploracaoIlegalDetailComponent,
    resolve: {
      atividadeExploracaoIlegal: AtividadeExploracaoIlegalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AtividadeExploracaoIlegalUpdateComponent,
    resolve: {
      atividadeExploracaoIlegal: AtividadeExploracaoIlegalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AtividadeExploracaoIlegalUpdateComponent,
    resolve: {
      atividadeExploracaoIlegal: AtividadeExploracaoIlegalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(atividadeExploracaoIlegalRoute)],
  exports: [RouterModule],
})
export class AtividadeExploracaoIlegalRoutingModule {}
