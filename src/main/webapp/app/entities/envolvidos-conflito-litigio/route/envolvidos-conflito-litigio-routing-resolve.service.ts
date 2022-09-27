import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEnvolvidosConflitoLitigio, EnvolvidosConflitoLitigio } from '../envolvidos-conflito-litigio.model';
import { EnvolvidosConflitoLitigioService } from '../service/envolvidos-conflito-litigio.service';

@Injectable({ providedIn: 'root' })
export class EnvolvidosConflitoLitigioRoutingResolveService implements Resolve<IEnvolvidosConflitoLitigio> {
  constructor(protected service: EnvolvidosConflitoLitigioService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEnvolvidosConflitoLitigio> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((envolvidosConflitoLitigio: HttpResponse<EnvolvidosConflitoLitigio>) => {
          if (envolvidosConflitoLitigio.body) {
            return of(envolvidosConflitoLitigio.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EnvolvidosConflitoLitigio());
  }
}
