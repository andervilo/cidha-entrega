import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IEnvolvidosConflitoLitigio, EnvolvidosConflitoLitigio } from '../envolvidos-conflito-litigio.model';
import { EnvolvidosConflitoLitigioService } from '../service/envolvidos-conflito-litigio.service';

import { EnvolvidosConflitoLitigioRoutingResolveService } from './envolvidos-conflito-litigio-routing-resolve.service';

describe('EnvolvidosConflitoLitigio routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: EnvolvidosConflitoLitigioRoutingResolveService;
  let service: EnvolvidosConflitoLitigioService;
  let resultEnvolvidosConflitoLitigio: IEnvolvidosConflitoLitigio | undefined;

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
    routingResolveService = TestBed.inject(EnvolvidosConflitoLitigioRoutingResolveService);
    service = TestBed.inject(EnvolvidosConflitoLitigioService);
    resultEnvolvidosConflitoLitigio = undefined;
  });

  describe('resolve', () => {
    it('should return IEnvolvidosConflitoLitigio returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEnvolvidosConflitoLitigio = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEnvolvidosConflitoLitigio).toEqual({ id: 123 });
    });

    it('should return new IEnvolvidosConflitoLitigio if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEnvolvidosConflitoLitigio = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultEnvolvidosConflitoLitigio).toEqual(new EnvolvidosConflitoLitigio());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as EnvolvidosConflitoLitigio })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEnvolvidosConflitoLitigio = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEnvolvidosConflitoLitigio).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
