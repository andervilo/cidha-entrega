import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { QuilomboDetailComponent } from './quilombo-detail.component';

describe('Quilombo Management Detail Component', () => {
  let comp: QuilomboDetailComponent;
  let fixture: ComponentFixture<QuilomboDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuilomboDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ quilombo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(QuilomboDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(QuilomboDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load quilombo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.quilombo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
