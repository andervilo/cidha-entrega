import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ComarcaDetailComponent } from './comarca-detail.component';

describe('Comarca Management Detail Component', () => {
  let comp: ComarcaDetailComponent;
  let fixture: ComponentFixture<ComarcaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComarcaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ comarca: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ComarcaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ComarcaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load comarca on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.comarca).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
