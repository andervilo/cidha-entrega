import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IEmbargoDeclaracaoAgravo, EmbargoDeclaracaoAgravo } from '../embargo-declaracao-agravo.model';
import { EmbargoDeclaracaoAgravoService } from '../service/embargo-declaracao-agravo.service';

import { EmbargoDeclaracaoAgravoRoutingResolveService } from './embargo-declaracao-agravo-routing-resolve.service';

describe('EmbargoDeclaracaoAgravo routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: EmbargoDeclaracaoAgravoRoutingResolveService;
  let service: EmbargoDeclaracaoAgravoService;
  let resultEmbargoDeclaracaoAgravo: IEmbargoDeclaracaoAgravo | undefined;

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
    routingResolveService = TestBed.inject(EmbargoDeclaracaoAgravoRoutingResolveService);
    service = TestBed.inject(EmbargoDeclaracaoAgravoService);
    resultEmbargoDeclaracaoAgravo = undefined;
  });

  describe('resolve', () => {
    it('should return IEmbargoDeclaracaoAgravo returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEmbargoDeclaracaoAgravo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEmbargoDeclaracaoAgravo).toEqual({ id: 123 });
    });

    it('should return new IEmbargoDeclaracaoAgravo if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEmbargoDeclaracaoAgravo = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultEmbargoDeclaracaoAgravo).toEqual(new EmbargoDeclaracaoAgravo());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as EmbargoDeclaracaoAgravo })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEmbargoDeclaracaoAgravo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEmbargoDeclaracaoAgravo).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
