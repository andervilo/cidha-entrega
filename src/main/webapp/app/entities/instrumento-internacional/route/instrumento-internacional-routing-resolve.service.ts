import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInstrumentoInternacional, InstrumentoInternacional } from '../instrumento-internacional.model';
import { InstrumentoInternacionalService } from '../service/instrumento-internacional.service';

@Injectable({ providedIn: 'root' })
export class InstrumentoInternacionalRoutingResolveService implements Resolve<IInstrumentoInternacional> {
  constructor(protected service: InstrumentoInternacionalService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInstrumentoInternacional> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((instrumentoInternacional: HttpResponse<InstrumentoInternacional>) => {
          if (instrumentoInternacional.body) {
            return of(instrumentoInternacional.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InstrumentoInternacional());
  }
}
