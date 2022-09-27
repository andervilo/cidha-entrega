import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISubsecaoJudiciaria, SubsecaoJudiciaria } from '../subsecao-judiciaria.model';
import { SubsecaoJudiciariaService } from '../service/subsecao-judiciaria.service';

@Injectable({ providedIn: 'root' })
export class SubsecaoJudiciariaRoutingResolveService implements Resolve<ISubsecaoJudiciaria> {
  constructor(protected service: SubsecaoJudiciariaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubsecaoJudiciaria> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((subsecaoJudiciaria: HttpResponse<SubsecaoJudiciaria>) => {
          if (subsecaoJudiciaria.body) {
            return of(subsecaoJudiciaria.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SubsecaoJudiciaria());
  }
}
