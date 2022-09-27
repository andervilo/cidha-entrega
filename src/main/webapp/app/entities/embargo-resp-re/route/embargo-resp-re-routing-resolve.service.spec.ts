import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IEmbargoRespRe, EmbargoRespRe } from '../embargo-resp-re.model';
import { EmbargoRespReService } from '../service/embargo-resp-re.service';

import { EmbargoRespReRoutingResolveService } from './embargo-resp-re-routing-resolve.service';

describe('EmbargoRespRe routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: EmbargoRespReRoutingResolveService;
  let service: EmbargoRespReService;
  let resultEmbargoRespRe: IEmbargoRespRe | undefined;

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
    routingResolveService = TestBed.inject(EmbargoRespReRoutingResolveService);
    service = TestBed.inject(EmbargoRespReService);
    resultEmbargoRespRe = undefined;
  });

  describe('resolve', () => {
    it('should return IEmbargoRespRe returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEmbargoRespRe = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEmbargoRespRe).toEqual({ id: 123 });
    });

    it('should return new IEmbargoRespRe if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEmbargoRespRe = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultEmbargoRespRe).toEqual(new EmbargoRespRe());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as EmbargoRespRe })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEmbargoRespRe = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEmbargoRespRe).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
