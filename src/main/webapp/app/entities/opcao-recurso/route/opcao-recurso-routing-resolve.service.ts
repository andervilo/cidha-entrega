import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOpcaoRecurso, OpcaoRecurso } from '../opcao-recurso.model';
import { OpcaoRecursoService } from '../service/opcao-recurso.service';

@Injectable({ providedIn: 'root' })
export class OpcaoRecursoRoutingResolveService implements Resolve<IOpcaoRecurso> {
  constructor(protected service: OpcaoRecursoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOpcaoRecurso> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((opcaoRecurso: HttpResponse<OpcaoRecurso>) => {
          if (opcaoRecurso.body) {
            return of(opcaoRecurso.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OpcaoRecurso());
  }
}
