import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EtniaIndigenaDetailComponent } from './etnia-indigena-detail.component';

describe('EtniaIndigena Management Detail Component', () => {
  let comp: EtniaIndigenaDetailComponent;
  let fixture: ComponentFixture<EtniaIndigenaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtniaIndigenaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ etniaIndigena: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EtniaIndigenaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EtniaIndigenaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load etniaIndigena on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.etniaIndigena).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
