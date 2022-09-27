import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IEmbargoDeclaracao, EmbargoDeclaracao } from '../embargo-declaracao.model';
import { EmbargoDeclaracaoService } from '../service/embargo-declaracao.service';

import { EmbargoDeclaracaoRoutingResolveService } from './embargo-declaracao-routing-resolve.service';

describe('EmbargoDeclaracao routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: EmbargoDeclaracaoRoutingResolveService;
  let service: EmbargoDeclaracaoService;
  let resultEmbargoDeclaracao: IEmbargoDeclaracao | undefined;

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
    routingResolveService = TestBed.inject(EmbargoDeclaracaoRoutingResolveService);
    service = TestBed.inject(EmbargoDeclaracaoService);
    resultEmbargoDeclaracao = undefined;
  });

  describe('resolve', () => {
    it('should return IEmbargoDeclaracao returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEmbargoDeclaracao = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEmbargoDeclaracao).toEqual({ id: 123 });
    });

    it('should return new IEmbargoDeclaracao if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEmbargoDeclaracao = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultEmbargoDeclaracao).toEqual(new EmbargoDeclaracao());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as EmbargoDeclaracao })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEmbargoDeclaracao = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEmbargoDeclaracao).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
