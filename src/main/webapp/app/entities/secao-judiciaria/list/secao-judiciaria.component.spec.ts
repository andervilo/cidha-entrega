import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SecaoJudiciariaService } from '../service/secao-judiciaria.service';

import { SecaoJudiciariaComponent } from './secao-judiciaria.component';

describe('SecaoJudiciaria Management Component', () => {
  let comp: SecaoJudiciariaComponent;
  let fixture: ComponentFixture<SecaoJudiciariaComponent>;
  let service: SecaoJudiciariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SecaoJudiciariaComponent],
    })
      .overrideTemplate(SecaoJudiciariaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SecaoJudiciariaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SecaoJudiciariaService);

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
    expect(comp.secaoJudiciarias?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
