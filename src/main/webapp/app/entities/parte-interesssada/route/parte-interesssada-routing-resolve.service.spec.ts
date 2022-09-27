import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IParteInteresssada, ParteInteresssada } from '../parte-interesssada.model';
import { ParteInteresssadaService } from '../service/parte-interesssada.service';

import { ParteInteresssadaRoutingResolveService } from './parte-interesssada-routing-resolve.service';

describe('ParteInteresssada routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ParteInteresssadaRoutingResolveService;
  let service: ParteInteresssadaService;
  let resultParteInteresssada: IParteInteresssada | undefined;

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
    routingResolveService = TestBed.inject(ParteInteresssadaRoutingResolveService);
    service = TestBed.inject(ParteInteresssadaService);
    resultParteInteresssada = undefined;
  });

  describe('resolve', () => {
    it('should return IParteInteresssada returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultParteInteresssada = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultParteInteresssada).toEqual({ id: 123 });
    });

    it('should return new IParteInteresssada if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultParteInteresssada = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultParteInteresssada).toEqual(new ParteInteresssada());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ParteInteresssada })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultParteInteresssada = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultParteInteresssada).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
