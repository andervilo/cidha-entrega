import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IParteInteresssada, ParteInteresssada } from '../parte-interesssada.model';
import { ParteInteresssadaService } from '../service/parte-interesssada.service';

@Injectable({ providedIn: 'root' })
export class ParteInteresssadaRoutingResolveService implements Resolve<IParteInteresssada> {
  constructor(protected service: ParteInteresssadaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParteInteresssada> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((parteInteresssada: HttpResponse<ParteInteresssada>) => {
          if (parteInteresssada.body) {
            return of(parteInteresssada.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ParteInteresssada());
  }
}
