import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmbargoDeclaracao, EmbargoDeclaracao } from '../embargo-declaracao.model';
import { EmbargoDeclaracaoService } from '../service/embargo-declaracao.service';

@Injectable({ providedIn: 'root' })
export class EmbargoDeclaracaoRoutingResolveService implements Resolve<IEmbargoDeclaracao> {
  constructor(protected service: EmbargoDeclaracaoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmbargoDeclaracao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((embargoDeclaracao: HttpResponse<EmbargoDeclaracao>) => {
          if (embargoDeclaracao.body) {
            return of(embargoDeclaracao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EmbargoDeclaracao());
  }
}
