import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoRepresentante, TipoRepresentante } from '../tipo-representante.model';
import { TipoRepresentanteService } from '../service/tipo-representante.service';

@Injectable({ providedIn: 'root' })
export class TipoRepresentanteRoutingResolveService implements Resolve<ITipoRepresentante> {
  constructor(protected service: TipoRepresentanteService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoRepresentante> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tipoRepresentante: HttpResponse<TipoRepresentante>) => {
          if (tipoRepresentante.body) {
            return of(tipoRepresentante.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoRepresentante());
  }
}
