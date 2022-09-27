import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmbargoDeclaracaoAgravoDetailComponent } from './embargo-declaracao-agravo-detail.component';

describe('EmbargoDeclaracaoAgravo Management Detail Component', () => {
  let comp: EmbargoDeclaracaoAgravoDetailComponent;
  let fixture: ComponentFixture<EmbargoDeclaracaoAgravoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmbargoDeclaracaoAgravoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ embargoDeclaracaoAgravo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EmbargoDeclaracaoAgravoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EmbargoDeclaracaoAgravoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load embargoDeclaracaoAgravo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.embargoDeclaracaoAgravo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
