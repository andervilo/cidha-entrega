import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITerritorio, Territorio } from '../territorio.model';
import { TerritorioService } from '../service/territorio.service';

@Injectable({ providedIn: 'root' })
export class TerritorioRoutingResolveService implements Resolve<ITerritorio> {
  constructor(protected service: TerritorioService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITerritorio> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((territorio: HttpResponse<Territorio>) => {
          if (territorio.body) {
            return of(territorio.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Territorio());
  }
}
