import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConcessaoLiminarDetailComponent } from './concessao-liminar-detail.component';

describe('ConcessaoLiminar Management Detail Component', () => {
  let comp: ConcessaoLiminarDetailComponent;
  let fixture: ComponentFixture<ConcessaoLiminarDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConcessaoLiminarDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ concessaoLiminar: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ConcessaoLiminarDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ConcessaoLiminarDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load concessaoLiminar on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.concessaoLiminar).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
