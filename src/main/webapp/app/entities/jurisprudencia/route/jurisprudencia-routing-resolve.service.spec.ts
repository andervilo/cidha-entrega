import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IJurisprudencia, Jurisprudencia } from '../jurisprudencia.model';
import { JurisprudenciaService } from '../service/jurisprudencia.service';

import { JurisprudenciaRoutingResolveService } from './jurisprudencia-routing-resolve.service';

describe('Jurisprudencia routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: JurisprudenciaRoutingResolveService;
  let service: JurisprudenciaService;
  let resultJurisprudencia: IJurisprudencia | undefined;

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
    routingResolveService = TestBed.inject(JurisprudenciaRoutingResolveService);
    service = TestBed.inject(JurisprudenciaService);
    resultJurisprudencia = undefined;
  });

  describe('resolve', () => {
    it('should return IJurisprudencia returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultJurisprudencia = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultJurisprudencia).toEqual({ id: 123 });
    });

    it('should return new IJurisprudencia if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultJurisprudencia = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultJurisprudencia).toEqual(new Jurisprudencia());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Jurisprudencia })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultJurisprudencia = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultJurisprudencia).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
