import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConcessaoLiminar, ConcessaoLiminar } from '../concessao-liminar.model';
import { ConcessaoLiminarService } from '../service/concessao-liminar.service';

@Injectable({ providedIn: 'root' })
export class ConcessaoLiminarRoutingResolveService implements Resolve<IConcessaoLiminar> {
  constructor(protected service: ConcessaoLiminarService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConcessaoLiminar> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((concessaoLiminar: HttpResponse<ConcessaoLiminar>) => {
          if (concessaoLiminar.body) {
            return of(concessaoLiminar.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ConcessaoLiminar());
  }
}
