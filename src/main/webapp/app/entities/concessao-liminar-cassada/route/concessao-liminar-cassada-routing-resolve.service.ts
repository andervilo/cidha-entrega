import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConcessaoLiminarCassada, ConcessaoLiminarCassada } from '../concessao-liminar-cassada.model';
import { ConcessaoLiminarCassadaService } from '../service/concessao-liminar-cassada.service';

@Injectable({ providedIn: 'root' })
export class ConcessaoLiminarCassadaRoutingResolveService implements Resolve<IConcessaoLiminarCassada> {
  constructor(protected service: ConcessaoLiminarCassadaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConcessaoLiminarCassada> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((concessaoLiminarCassada: HttpResponse<ConcessaoLiminarCassada>) => {
          if (concessaoLiminarCassada.body) {
            return of(concessaoLiminarCassada.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ConcessaoLiminarCassada());
  }
}
