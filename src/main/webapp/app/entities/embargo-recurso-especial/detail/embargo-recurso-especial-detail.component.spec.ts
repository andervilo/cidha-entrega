import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmbargoRecursoEspecialDetailComponent } from './embargo-recurso-especial-detail.component';

describe('EmbargoRecursoEspecial Management Detail Component', () => {
  let comp: EmbargoRecursoEspecialDetailComponent;
  let fixture: ComponentFixture<EmbargoRecursoEspecialDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmbargoRecursoEspecialDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ embargoRecursoEspecial: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EmbargoRecursoEspecialDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EmbargoRecursoEspecialDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load embargoRecursoEspecial on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.embargoRecursoEspecial).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
