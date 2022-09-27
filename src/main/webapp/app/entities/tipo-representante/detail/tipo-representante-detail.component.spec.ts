import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TipoRepresentanteDetailComponent } from './tipo-representante-detail.component';

describe('TipoRepresentante Management Detail Component', () => {
  let comp: TipoRepresentanteDetailComponent;
  let fixture: ComponentFixture<TipoRepresentanteDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoRepresentanteDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ tipoRepresentante: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TipoRepresentanteDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TipoRepresentanteDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tipoRepresentante on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.tipoRepresentante).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
