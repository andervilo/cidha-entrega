import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEtniaIndigena, EtniaIndigena } from '../etnia-indigena.model';
import { EtniaIndigenaService } from '../service/etnia-indigena.service';

@Injectable({ providedIn: 'root' })
export class EtniaIndigenaRoutingResolveService implements Resolve<IEtniaIndigena> {
  constructor(protected service: EtniaIndigenaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEtniaIndigena> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((etniaIndigena: HttpResponse<EtniaIndigena>) => {
          if (etniaIndigena.body) {
            return of(etniaIndigena.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EtniaIndigena());
  }
}
