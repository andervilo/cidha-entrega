import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRelator, Relator } from '../relator.model';
import { RelatorService } from '../service/relator.service';

@Injectable({ providedIn: 'root' })
export class RelatorRoutingResolveService implements Resolve<IRelator> {
  constructor(protected service: RelatorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRelator> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((relator: HttpResponse<Relator>) => {
          if (relator.body) {
            return of(relator.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Relator());
  }
}
