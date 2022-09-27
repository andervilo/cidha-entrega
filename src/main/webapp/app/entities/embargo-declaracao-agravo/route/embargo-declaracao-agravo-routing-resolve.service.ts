import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmbargoDeclaracaoAgravo, EmbargoDeclaracaoAgravo } from '../embargo-declaracao-agravo.model';
import { EmbargoDeclaracaoAgravoService } from '../service/embargo-declaracao-agravo.service';

@Injectable({ providedIn: 'root' })
export class EmbargoDeclaracaoAgravoRoutingResolveService implements Resolve<IEmbargoDeclaracaoAgravo> {
  constructor(protected service: EmbargoDeclaracaoAgravoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmbargoDeclaracaoAgravo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((embargoDeclaracaoAgravo: HttpResponse<EmbargoDeclaracaoAgravo>) => {
          if (embargoDeclaracaoAgravo.body) {
            return of(embargoDeclaracaoAgravo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EmbargoDeclaracaoAgravo());
  }
}
