import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IJurisprudencia, Jurisprudencia } from '../jurisprudencia.model';
import { JurisprudenciaService } from '../service/jurisprudencia.service';

@Injectable({ providedIn: 'root' })
export class JurisprudenciaRoutingResolveService implements Resolve<IJurisprudencia> {
  constructor(protected service: JurisprudenciaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJurisprudencia> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((jurisprudencia: HttpResponse<Jurisprudencia>) => {
          if (jurisprudencia.body) {
            return of(jurisprudencia.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Jurisprudencia());
  }
}
