import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAtividadeExploracaoIlegal, AtividadeExploracaoIlegal } from '../atividade-exploracao-ilegal.model';
import { AtividadeExploracaoIlegalService } from '../service/atividade-exploracao-ilegal.service';

@Injectable({ providedIn: 'root' })
export class AtividadeExploracaoIlegalRoutingResolveService implements Resolve<IAtividadeExploracaoIlegal> {
  constructor(protected service: AtividadeExploracaoIlegalService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAtividadeExploracaoIlegal> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((atividadeExploracaoIlegal: HttpResponse<AtividadeExploracaoIlegal>) => {
          if (atividadeExploracaoIlegal.body) {
            return of(atividadeExploracaoIlegal.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AtividadeExploracaoIlegal());
  }
}
