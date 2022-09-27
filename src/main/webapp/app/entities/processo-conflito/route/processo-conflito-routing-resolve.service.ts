import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProcessoConflito, ProcessoConflito } from '../processo-conflito.model';
import { ProcessoConflitoService } from '../service/processo-conflito.service';

@Injectable({ providedIn: 'root' })
export class ProcessoConflitoRoutingResolveService implements Resolve<IProcessoConflito> {
  constructor(protected service: ProcessoConflitoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProcessoConflito> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((processoConflito: HttpResponse<ProcessoConflito>) => {
          if (processoConflito.body) {
            return of(processoConflito.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProcessoConflito());
  }
}
