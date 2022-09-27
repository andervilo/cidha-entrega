import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IRepresentanteLegal, RepresentanteLegal } from '../representante-legal.model';
import { RepresentanteLegalService } from '../service/representante-legal.service';

import { RepresentanteLegalRoutingResolveService } from './representante-legal-routing-resolve.service';

describe('RepresentanteLegal routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: RepresentanteLegalRoutingResolveService;
  let service: RepresentanteLegalService;
  let resultRepresentanteLegal: IRepresentanteLegal | undefined;

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
    routingResolveService = TestBed.inject(RepresentanteLegalRoutingResolveService);
    service = TestBed.inject(RepresentanteLegalService);
    resultRepresentanteLegal = undefined;
  });

  describe('resolve', () => {
    it('should return IRepresentanteLegal returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRepresentanteLegal = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRepresentanteLegal).toEqual({ id: 123 });
    });

    it('should return new IRepresentanteLegal if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRepresentanteLegal = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultRepresentanteLegal).toEqual(new RepresentanteLegal());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as RepresentanteLegal })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRepresentanteLegal = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRepresentanteLegal).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
