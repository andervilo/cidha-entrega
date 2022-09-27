import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TipoRecursoDetailComponent } from './tipo-recurso-detail.component';

describe('TipoRecurso Management Detail Component', () => {
  let comp: TipoRecursoDetailComponent;
  let fixture: ComponentFixture<TipoRecursoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoRecursoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ tipoRecurso: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TipoRecursoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TipoRecursoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tipoRecurso on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.tipoRecurso).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
