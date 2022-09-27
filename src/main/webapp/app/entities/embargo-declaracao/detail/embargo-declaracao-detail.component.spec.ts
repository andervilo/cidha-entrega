import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmbargoDeclaracaoDetailComponent } from './embargo-declaracao-detail.component';

describe('EmbargoDeclaracao Management Detail Component', () => {
  let comp: EmbargoDeclaracaoDetailComponent;
  let fixture: ComponentFixture<EmbargoDeclaracaoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmbargoDeclaracaoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ embargoDeclaracao: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EmbargoDeclaracaoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EmbargoDeclaracaoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load embargoDeclaracao on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.embargoDeclaracao).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
