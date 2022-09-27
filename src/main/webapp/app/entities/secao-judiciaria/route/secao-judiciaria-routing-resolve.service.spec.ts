import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ISecaoJudiciaria, SecaoJudiciaria } from '../secao-judiciaria.model';
import { SecaoJudiciariaService } from '../service/secao-judiciaria.service';

import { SecaoJudiciariaRoutingResolveService } from './secao-judiciaria-routing-resolve.service';

describe('SecaoJudiciaria routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: SecaoJudiciariaRoutingResolveService;
  let service: SecaoJudiciariaService;
  let resultSecaoJudiciaria: ISecaoJudiciaria | undefined;

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
    routingResolveService = TestBed.inject(SecaoJudiciariaRoutingResolveService);
    service = TestBed.inject(SecaoJudiciariaService);
    resultSecaoJudiciaria = undefined;
  });

  describe('resolve', () => {
    it('should return ISecaoJudiciaria returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSecaoJudiciaria = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSecaoJudiciaria).toEqual({ id: 123 });
    });

    it('should return new ISecaoJudiciaria if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSecaoJudiciaria = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSecaoJudiciaria).toEqual(new SecaoJudiciaria());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as SecaoJudiciaria })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSecaoJudiciaria = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSecaoJudiciaria).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
