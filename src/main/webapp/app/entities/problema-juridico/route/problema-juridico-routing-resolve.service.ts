import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProblemaJuridico, ProblemaJuridico } from '../problema-juridico.model';
import { ProblemaJuridicoService } from '../service/problema-juridico.service';

@Injectable({ providedIn: 'root' })
export class ProblemaJuridicoRoutingResolveService implements Resolve<IProblemaJuridico> {
  constructor(protected service: ProblemaJuridicoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProblemaJuridico> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((problemaJuridico: HttpResponse<ProblemaJuridico>) => {
          if (problemaJuridico.body) {
            return of(problemaJuridico.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProblemaJuridico());
  }
}
