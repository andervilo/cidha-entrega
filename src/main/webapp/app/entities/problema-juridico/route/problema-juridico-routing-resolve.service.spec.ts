import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IProblemaJuridico, ProblemaJuridico } from '../problema-juridico.model';
import { ProblemaJuridicoService } from '../service/problema-juridico.service';

import { ProblemaJuridicoRoutingResolveService } from './problema-juridico-routing-resolve.service';

describe('ProblemaJuridico routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ProblemaJuridicoRoutingResolveService;
  let service: ProblemaJuridicoService;
  let resultProblemaJuridico: IProblemaJuridico | undefined;

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
    routingResolveService = TestBed.inject(ProblemaJuridicoRoutingResolveService);
    service = TestBed.inject(ProblemaJuridicoService);
    resultProblemaJuridico = undefined;
  });

  describe('resolve', () => {
    it('should return IProblemaJuridico returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProblemaJuridico = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultProblemaJuridico).toEqual({ id: 123 });
    });

    it('should return new IProblemaJuridico if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProblemaJuridico = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultProblemaJuridico).toEqual(new ProblemaJuridico());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ProblemaJuridico })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProblemaJuridico = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultProblemaJuridico).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
