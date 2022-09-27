import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConflito, Conflito } from '../conflito.model';
import { ConflitoService } from '../service/conflito.service';

@Injectable({ providedIn: 'root' })
export class ConflitoRoutingResolveService implements Resolve<IConflito> {
  constructor(protected service: ConflitoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConflito> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((conflito: HttpResponse<Conflito>) => {
          if (conflito.body) {
            return of(conflito.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Conflito());
  }
}
