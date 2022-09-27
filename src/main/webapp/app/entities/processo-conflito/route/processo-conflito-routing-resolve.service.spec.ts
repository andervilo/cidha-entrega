import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IProcessoConflito, ProcessoConflito } from '../processo-conflito.model';
import { ProcessoConflitoService } from '../service/processo-conflito.service';

import { ProcessoConflitoRoutingResolveService } from './processo-conflito-routing-resolve.service';

describe('ProcessoConflito routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ProcessoConflitoRoutingResolveService;
  let service: ProcessoConflitoService;
  let resultProcessoConflito: IProcessoConflito | undefined;

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
    routingResolveService = TestBed.inject(ProcessoConflitoRoutingResolveService);
    service = TestBed.inject(ProcessoConflitoService);
    resultProcessoConflito = undefined;
  });

  describe('resolve', () => {
    it('should return IProcessoConflito returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProcessoConflito = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultProcessoConflito).toEqual({ id: 123 });
    });

    it('should return new IProcessoConflito if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProcessoConflito = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultProcessoConflito).toEqual(new ProcessoConflito());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ProcessoConflito })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProcessoConflito = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultProcessoConflito).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
