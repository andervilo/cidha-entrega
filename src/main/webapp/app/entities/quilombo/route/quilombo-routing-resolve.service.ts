import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuilombo, Quilombo } from '../quilombo.model';
import { QuilomboService } from '../service/quilombo.service';

@Injectable({ providedIn: 'root' })
export class QuilomboRoutingResolveService implements Resolve<IQuilombo> {
  constructor(protected service: QuilomboService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IQuilombo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((quilombo: HttpResponse<Quilombo>) => {
          if (quilombo.body) {
            return of(quilombo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Quilombo());
  }
}
