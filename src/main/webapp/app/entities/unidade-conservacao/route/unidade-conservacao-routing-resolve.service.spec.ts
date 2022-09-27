import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IUnidadeConservacao, UnidadeConservacao } from '../unidade-conservacao.model';
import { UnidadeConservacaoService } from '../service/unidade-conservacao.service';

import { UnidadeConservacaoRoutingResolveService } from './unidade-conservacao-routing-resolve.service';

describe('UnidadeConservacao routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: UnidadeConservacaoRoutingResolveService;
  let service: UnidadeConservacaoService;
  let resultUnidadeConservacao: IUnidadeConservacao | undefined;

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
    routingResolveService = TestBed.inject(UnidadeConservacaoRoutingResolveService);
    service = TestBed.inject(UnidadeConservacaoService);
    resultUnidadeConservacao = undefined;
  });

  describe('resolve', () => {
    it('should return IUnidadeConservacao returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUnidadeConservacao = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultUnidadeConservacao).toEqual({ id: 123 });
    });

    it('should return new IUnidadeConservacao if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUnidadeConservacao = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultUnidadeConservacao).toEqual(new UnidadeConservacao());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as UnidadeConservacao })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUnidadeConservacao = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultUnidadeConservacao).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
