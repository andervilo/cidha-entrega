import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISecaoJudiciaria, SecaoJudiciaria } from '../secao-judiciaria.model';
import { SecaoJudiciariaService } from '../service/secao-judiciaria.service';

@Injectable({ providedIn: 'root' })
export class SecaoJudiciariaRoutingResolveService implements Resolve<ISecaoJudiciaria> {
  constructor(protected service: SecaoJudiciariaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISecaoJudiciaria> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((secaoJudiciaria: HttpResponse<SecaoJudiciaria>) => {
          if (secaoJudiciaria.body) {
            return of(secaoJudiciaria.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SecaoJudiciaria());
  }
}
