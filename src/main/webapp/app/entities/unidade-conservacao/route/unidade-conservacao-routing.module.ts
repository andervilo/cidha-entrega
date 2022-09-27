import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UnidadeConservacaoComponent } from '../list/unidade-conservacao.component';
import { UnidadeConservacaoDetailComponent } from '../detail/unidade-conservacao-detail.component';
import { UnidadeConservacaoUpdateComponent } from '../update/unidade-conservacao-update.component';
import { UnidadeConservacaoRoutingResolveService } from './unidade-conservacao-routing-resolve.service';

const unidadeConservacaoRoute: Routes = [
  {
    path: '',
    component: UnidadeConservacaoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UnidadeConservacaoDetailComponent,
    resolve: {
      unidadeConservacao: UnidadeConservacaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UnidadeConservacaoUpdateComponent,
    resolve: {
      unidadeConservacao: UnidadeConservacaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UnidadeConservacaoUpdateComponent,
    resolve: {
      unidadeConservacao: UnidadeConservacaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(unidadeConservacaoRoute)],
  exports: [RouterModule],
})
export class UnidadeConservacaoRoutingModule {}
