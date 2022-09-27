import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SubsecaoJudiciariaService } from '../service/subsecao-judiciaria.service';

import { SubsecaoJudiciariaComponent } from './subsecao-judiciaria.component';

describe('SubsecaoJudiciaria Management Component', () => {
  let comp: SubsecaoJudiciariaComponent;
  let fixture: ComponentFixture<SubsecaoJudiciariaComponent>;
  let service: SubsecaoJudiciariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SubsecaoJudiciariaComponent],
    })
      .overrideTemplate(SubsecaoJudiciariaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SubsecaoJudiciariaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SubsecaoJudiciariaService);

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
    expect(comp.subsecaoJudiciarias?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
