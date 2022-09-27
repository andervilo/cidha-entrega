import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmbargoRecursoEspecial, EmbargoRecursoEspecial } from '../embargo-recurso-especial.model';
import { EmbargoRecursoEspecialService } from '../service/embargo-recurso-especial.service';

@Injectable({ providedIn: 'root' })
export class EmbargoRecursoEspecialRoutingResolveService implements Resolve<IEmbargoRecursoEspecial> {
  constructor(protected service: EmbargoRecursoEspecialService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmbargoRecursoEspecial> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((embargoRecursoEspecial: HttpResponse<EmbargoRecursoEspecial>) => {
          if (embargoRecursoEspecial.body) {
            return of(embargoRecursoEspecial.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EmbargoRecursoEspecial());
  }
}
