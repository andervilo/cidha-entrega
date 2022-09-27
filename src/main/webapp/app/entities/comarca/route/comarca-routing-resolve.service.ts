import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IComarca, Comarca } from '../comarca.model';
import { ComarcaService } from '../service/comarca.service';

@Injectable({ providedIn: 'root' })
export class ComarcaRoutingResolveService implements Resolve<IComarca> {
  constructor(protected service: ComarcaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IComarca> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((comarca: HttpResponse<Comarca>) => {
          if (comarca.body) {
            return of(comarca.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Comarca());
  }
}
