import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FundamentacaoDoutrinariaService } from '../service/fundamentacao-doutrinaria.service';

import { FundamentacaoDoutrinariaComponent } from './fundamentacao-doutrinaria.component';

describe('FundamentacaoDoutrinaria Management Component', () => {
  let comp: FundamentacaoDoutrinariaComponent;
  let fixture: ComponentFixture<FundamentacaoDoutrinariaComponent>;
  let service: FundamentacaoDoutrinariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'fundamentacao-doutrinaria', component: FundamentacaoDoutrinariaComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [FundamentacaoDoutrinariaComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
          },
        },
      ],
    })
      .overrideTemplate(FundamentacaoDoutrinariaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FundamentacaoDoutrinariaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FundamentacaoDoutrinariaService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.fundamentacaoDoutrinarias?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  it('should load a page', () => {
    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.fundamentacaoDoutrinarias?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['id,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // INIT
    comp.ngOnInit();

    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'id'] }));
  });
});
