import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ISubsecaoJudiciaria, SubsecaoJudiciaria } from '../subsecao-judiciaria.model';
import { SubsecaoJudiciariaService } from '../service/subsecao-judiciaria.service';

import { SubsecaoJudiciariaRoutingResolveService } from './subsecao-judiciaria-routing-resolve.service';

describe('SubsecaoJudiciaria routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: SubsecaoJudiciariaRoutingResolveService;
  let service: SubsecaoJudiciariaService;
  let resultSubsecaoJudiciaria: ISubsecaoJudiciaria | undefined;

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
    routingResolveService = TestBed.inject(SubsecaoJudiciariaRoutingResolveService);
    service = TestBed.inject(SubsecaoJudiciariaService);
    resultSubsecaoJudiciaria = undefined;
  });

  describe('resolve', () => {
    it('should return ISubsecaoJudiciaria returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSubsecaoJudiciaria = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSubsecaoJudiciaria).toEqual({ id: 123 });
    });

    it('should return new ISubsecaoJudiciaria if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSubsecaoJudiciaria = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSubsecaoJudiciaria).toEqual(new SubsecaoJudiciaria());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as SubsecaoJudiciaria })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSubsecaoJudiciaria = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSubsecaoJudiciaria).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
