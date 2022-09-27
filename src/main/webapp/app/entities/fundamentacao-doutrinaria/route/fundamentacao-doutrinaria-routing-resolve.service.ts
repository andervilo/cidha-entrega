import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFundamentacaoDoutrinaria, FundamentacaoDoutrinaria } from '../fundamentacao-doutrinaria.model';
import { FundamentacaoDoutrinariaService } from '../service/fundamentacao-doutrinaria.service';

@Injectable({ providedIn: 'root' })
export class FundamentacaoDoutrinariaRoutingResolveService implements Resolve<IFundamentacaoDoutrinaria> {
  constructor(protected service: FundamentacaoDoutrinariaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFundamentacaoDoutrinaria> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fundamentacaoDoutrinaria: HttpResponse<FundamentacaoDoutrinaria>) => {
          if (fundamentacaoDoutrinaria.body) {
            return of(fundamentacaoDoutrinaria.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FundamentacaoDoutrinaria());
  }
}
