import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmbargoRespRe, EmbargoRespRe } from '../embargo-resp-re.model';
import { EmbargoRespReService } from '../service/embargo-resp-re.service';

@Injectable({ providedIn: 'root' })
export class EmbargoRespReRoutingResolveService implements Resolve<IEmbargoRespRe> {
  constructor(protected service: EmbargoRespReService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmbargoRespRe> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((embargoRespRe: HttpResponse<EmbargoRespRe>) => {
          if (embargoRespRe.body) {
            return of(embargoRespRe.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EmbargoRespRe());
  }
}
