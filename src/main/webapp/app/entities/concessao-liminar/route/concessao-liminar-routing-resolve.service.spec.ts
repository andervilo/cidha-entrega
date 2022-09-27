import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IConcessaoLiminar, ConcessaoLiminar } from '../concessao-liminar.model';
import { ConcessaoLiminarService } from '../service/concessao-liminar.service';

import { ConcessaoLiminarRoutingResolveService } from './concessao-liminar-routing-resolve.service';

describe('ConcessaoLiminar routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ConcessaoLiminarRoutingResolveService;
  let service: ConcessaoLiminarService;
  let resultConcessaoLiminar: IConcessaoLiminar | undefined;

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
    routingResolveService = TestBed.inject(ConcessaoLiminarRoutingResolveService);
    service = TestBed.inject(ConcessaoLiminarService);
    resultConcessaoLiminar = undefined;
  });

  describe('resolve', () => {
    it('should return IConcessaoLiminar returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConcessaoLiminar = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultConcessaoLiminar).toEqual({ id: 123 });
    });

    it('should return new IConcessaoLiminar if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConcessaoLiminar = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultConcessaoLiminar).toEqual(new ConcessaoLiminar());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ConcessaoLiminar })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConcessaoLiminar = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultConcessaoLiminar).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
