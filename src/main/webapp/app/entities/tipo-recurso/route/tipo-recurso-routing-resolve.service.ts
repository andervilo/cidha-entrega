import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoRecurso, TipoRecurso } from '../tipo-recurso.model';
import { TipoRecursoService } from '../service/tipo-recurso.service';

@Injectable({ providedIn: 'root' })
export class TipoRecursoRoutingResolveService implements Resolve<ITipoRecurso> {
  constructor(protected service: TipoRecursoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoRecurso> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tipoRecurso: HttpResponse<TipoRecurso>) => {
          if (tipoRecurso.body) {
            return of(tipoRecurso.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoRecurso());
  }
}
