import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IConcessaoLiminarCassada, ConcessaoLiminarCassada } from '../concessao-liminar-cassada.model';
import { ConcessaoLiminarCassadaService } from '../service/concessao-liminar-cassada.service';

import { ConcessaoLiminarCassadaRoutingResolveService } from './concessao-liminar-cassada-routing-resolve.service';

describe('ConcessaoLiminarCassada routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ConcessaoLiminarCassadaRoutingResolveService;
  let service: ConcessaoLiminarCassadaService;
  let resultConcessaoLiminarCassada: IConcessaoLiminarCassada | undefined;

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
    routingResolveService = TestBed.inject(ConcessaoLiminarCassadaRoutingResolveService);
    service = TestBed.inject(ConcessaoLiminarCassadaService);
    resultConcessaoLiminarCassada = undefined;
  });

  describe('resolve', () => {
    it('should return IConcessaoLiminarCassada returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConcessaoLiminarCassada = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultConcessaoLiminarCassada).toEqual({ id: 123 });
    });

    it('should return new IConcessaoLiminarCassada if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConcessaoLiminarCassada = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultConcessaoLiminarCassada).toEqual(new ConcessaoLiminarCassada());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ConcessaoLiminarCassada })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConcessaoLiminarCassada = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultConcessaoLiminarCassada).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
