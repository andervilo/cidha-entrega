import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OpcaoRecursoDetailComponent } from './opcao-recurso-detail.component';

describe('OpcaoRecurso Management Detail Component', () => {
  let comp: OpcaoRecursoDetailComponent;
  let fixture: ComponentFixture<OpcaoRecursoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpcaoRecursoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ opcaoRecurso: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(OpcaoRecursoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(OpcaoRecursoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load opcaoRecurso on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.opcaoRecurso).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
