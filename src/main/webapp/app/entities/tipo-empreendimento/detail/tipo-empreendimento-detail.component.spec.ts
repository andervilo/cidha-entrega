import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TipoEmpreendimentoDetailComponent } from './tipo-empreendimento-detail.component';

describe('TipoEmpreendimento Management Detail Component', () => {
  let comp: TipoEmpreendimentoDetailComponent;
  let fixture: ComponentFixture<TipoEmpreendimentoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoEmpreendimentoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ tipoEmpreendimento: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TipoEmpreendimentoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TipoEmpreendimentoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tipoEmpreendimento on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.tipoEmpreendimento).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
