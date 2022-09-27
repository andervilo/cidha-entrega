import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RepresentanteLegalDetailComponent } from './representante-legal-detail.component';

describe('RepresentanteLegal Management Detail Component', () => {
  let comp: RepresentanteLegalDetailComponent;
  let fixture: ComponentFixture<RepresentanteLegalDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepresentanteLegalDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ representanteLegal: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RepresentanteLegalDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RepresentanteLegalDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load representanteLegal on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.representanteLegal).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
