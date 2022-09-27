import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ITipoRepresentante, TipoRepresentante } from '../tipo-representante.model';
import { TipoRepresentanteService } from '../service/tipo-representante.service';

import { TipoRepresentanteRoutingResolveService } from './tipo-representante-routing-resolve.service';

describe('TipoRepresentante routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TipoRepresentanteRoutingResolveService;
  let service: TipoRepresentanteService;
  let resultTipoRepresentante: ITipoRepresentante | undefined;

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
    routingResolveService = TestBed.inject(TipoRepresentanteRoutingResolveService);
    service = TestBed.inject(TipoRepresentanteService);
    resultTipoRepresentante = undefined;
  });

  describe('resolve', () => {
    it('should return ITipoRepresentante returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTipoRepresentante = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTipoRepresentante).toEqual({ id: 123 });
    });

    it('should return new ITipoRepresentante if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTipoRepresentante = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTipoRepresentante).toEqual(new TipoRepresentante());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TipoRepresentante })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTipoRepresentante = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTipoRepresentante).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
