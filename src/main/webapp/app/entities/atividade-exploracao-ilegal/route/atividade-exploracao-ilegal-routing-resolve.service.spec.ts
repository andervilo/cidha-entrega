import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IAtividadeExploracaoIlegal, AtividadeExploracaoIlegal } from '../atividade-exploracao-ilegal.model';
import { AtividadeExploracaoIlegalService } from '../service/atividade-exploracao-ilegal.service';

import { AtividadeExploracaoIlegalRoutingResolveService } from './atividade-exploracao-ilegal-routing-resolve.service';

describe('AtividadeExploracaoIlegal routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: AtividadeExploracaoIlegalRoutingResolveService;
  let service: AtividadeExploracaoIlegalService;
  let resultAtividadeExploracaoIlegal: IAtividadeExploracaoIlegal | undefined;

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
    routingResolveService = TestBed.inject(AtividadeExploracaoIlegalRoutingResolveService);
    service = TestBed.inject(AtividadeExploracaoIlegalService);
    resultAtividadeExploracaoIlegal = undefined;
  });

  describe('resolve', () => {
    it('should return IAtividadeExploracaoIlegal returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAtividadeExploracaoIlegal = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAtividadeExploracaoIlegal).toEqual({ id: 123 });
    });

    it('should return new IAtividadeExploracaoIlegal if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAtividadeExploracaoIlegal = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultAtividadeExploracaoIlegal).toEqual(new AtividadeExploracaoIlegal());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as AtividadeExploracaoIlegal })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAtividadeExploracaoIlegal = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAtividadeExploracaoIlegal).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
