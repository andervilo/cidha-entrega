import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ITipoRecurso, TipoRecurso } from '../tipo-recurso.model';
import { TipoRecursoService } from '../service/tipo-recurso.service';

import { TipoRecursoRoutingResolveService } from './tipo-recurso-routing-resolve.service';

describe('TipoRecurso routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TipoRecursoRoutingResolveService;
  let service: TipoRecursoService;
  let resultTipoRecurso: ITipoRecurso | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(TipoRecursoRoutingResolveService);
    service = TestBed.inject(TipoRecursoService);
    resultTipoRecurso = undefined;
  });

  describe('resolve', () => {
    it('should return ITipoRecurso returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTipoRecurso = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTipoRecurso).toEqual({ id: 123 });
    });

    it('should return new ITipoRecurso if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTipoRecurso = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTipoRecurso).toEqual(new TipoRecurso());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TipoRecurso })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTipoRecurso = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTipoRecurso).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
