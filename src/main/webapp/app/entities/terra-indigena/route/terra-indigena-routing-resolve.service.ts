import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITerraIndigena, TerraIndigena } from '../terra-indigena.model';
import { TerraIndigenaService } from '../service/terra-indigena.service';

@Injectable({ providedIn: 'root' })
export class TerraIndigenaRoutingResolveService implements Resolve<ITerraIndigena> {
  constructor(protected service: TerraIndigenaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITerraIndigena> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((terraIndigena: HttpResponse<TerraIndigena>) => {
          if (terraIndigena.body) {
            return of(terraIndigena.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TerraIndigena());
  }
}
