import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoEmpreendimento, TipoEmpreendimento } from '../tipo-empreendimento.model';
import { TipoEmpreendimentoService } from '../service/tipo-empreendimento.service';

@Injectable({ providedIn: 'root' })
export class TipoEmpreendimentoRoutingResolveService implements Resolve<ITipoEmpreendimento> {
  constructor(protected service: TipoEmpreendimentoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoEmpreendimento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tipoEmpreendimento: HttpResponse<TipoEmpreendimento>) => {
          if (tipoEmpreendimento.body) {
            return of(tipoEmpreendimento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoEmpreendimento());
  }
}
