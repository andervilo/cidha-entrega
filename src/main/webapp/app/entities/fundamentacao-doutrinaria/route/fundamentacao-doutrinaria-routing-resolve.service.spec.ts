import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IFundamentacaoDoutrinaria, FundamentacaoDoutrinaria } from '../fundamentacao-doutrinaria.model';
import { FundamentacaoDoutrinariaService } from '../service/fundamentacao-doutrinaria.service';

import { FundamentacaoDoutrinariaRoutingResolveService } from './fundamentacao-doutrinaria-routing-resolve.service';

describe('FundamentacaoDoutrinaria routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: FundamentacaoDoutrinariaRoutingResolveService;
  let service: FundamentacaoDoutrinariaService;
  let resultFundamentacaoDoutrinaria: IFundamentacaoDoutrinaria | undefined;

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
    routingResolveService = TestBed.inject(FundamentacaoDoutrinariaRoutingResolveService);
    service = TestBed.inject(FundamentacaoDoutrinariaService);
    resultFundamentacaoDoutrinaria = undefined;
  });

  describe('resolve', () => {
    it('should return IFundamentacaoDoutrinaria returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFundamentacaoDoutrinaria = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultFundamentacaoDoutrinaria).toEqual({ id: 123 });
    });

    it('should return new IFundamentacaoDoutrinaria if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFundamentacaoDoutrinaria = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultFundamentacaoDoutrinaria).toEqual(new FundamentacaoDoutrinaria());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as FundamentacaoDoutrinaria })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultFundamentacaoDoutrinaria = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultFundamentacaoDoutrinaria).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
