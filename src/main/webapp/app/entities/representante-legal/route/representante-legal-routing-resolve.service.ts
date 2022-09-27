import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRepresentanteLegal, RepresentanteLegal } from '../representante-legal.model';
import { RepresentanteLegalService } from '../service/representante-legal.service';

@Injectable({ providedIn: 'root' })
export class RepresentanteLegalRoutingResolveService implements Resolve<IRepresentanteLegal> {
  constructor(protected service: RepresentanteLegalService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRepresentanteLegal> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((representanteLegal: HttpResponse<RepresentanteLegal>) => {
          if (representanteLegal.body) {
            return of(representanteLegal.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RepresentanteLegal());
  }
}
