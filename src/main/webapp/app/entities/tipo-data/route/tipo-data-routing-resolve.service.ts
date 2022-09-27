import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoData, TipoData } from '../tipo-data.model';
import { TipoDataService } from '../service/tipo-data.service';

@Injectable({ providedIn: 'root' })
export class TipoDataRoutingResolveService implements Resolve<ITipoData> {
  constructor(protected service: TipoDataService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoData> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tipoData: HttpResponse<TipoData>) => {
          if (tipoData.body) {
            return of(tipoData.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoData());
  }
}
