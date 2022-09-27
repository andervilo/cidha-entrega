import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUnidadeConservacao, UnidadeConservacao } from '../unidade-conservacao.model';
import { UnidadeConservacaoService } from '../service/unidade-conservacao.service';

@Injectable({ providedIn: 'root' })
export class UnidadeConservacaoRoutingResolveService implements Resolve<IUnidadeConservacao> {
  constructor(protected service: UnidadeConservacaoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUnidadeConservacao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((unidadeConservacao: HttpResponse<UnidadeConservacao>) => {
          if (unidadeConservacao.body) {
            return of(unidadeConservacao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UnidadeConservacao());
  }
}
