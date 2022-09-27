import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFundamentacaoLegal, FundamentacaoLegal } from '../fundamentacao-legal.model';
import { FundamentacaoLegalService } from '../service/fundamentacao-legal.service';

@Injectable({ providedIn: 'root' })
export class FundamentacaoLegalRoutingResolveService implements Resolve<IFundamentacaoLegal> {
  constructor(protected service: FundamentacaoLegalService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFundamentacaoLegal> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fundamentacaoLegal: HttpResponse<FundamentacaoLegal>) => {
          if (fundamentacaoLegal.body) {
            return of(fundamentacaoLegal.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FundamentacaoLegal());
  }
}
