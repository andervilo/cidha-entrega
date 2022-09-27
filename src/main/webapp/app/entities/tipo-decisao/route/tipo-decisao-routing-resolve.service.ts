import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoDecisao, TipoDecisao } from '../tipo-decisao.model';
import { TipoDecisaoService } from '../service/tipo-decisao.service';

@Injectable({ providedIn: 'root' })
export class TipoDecisaoRoutingResolveService implements Resolve<ITipoDecisao> {
  constructor(protected service: TipoDecisaoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoDecisao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tipoDecisao: HttpResponse<TipoDecisao>) => {
          if (tipoDecisao.body) {
            return of(tipoDecisao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoDecisao());
  }
}
