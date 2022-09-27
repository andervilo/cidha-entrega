import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataDetailComponent } from './data-detail.component';

describe('Data Management Detail Component', () => {
  let comp: DataDetailComponent;
  let fixture: ComponentFixture<DataDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ data: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DataDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DataDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load data on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.data).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
