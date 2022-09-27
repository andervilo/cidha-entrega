import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConcessaoLiminarCassadaDetailComponent } from './concessao-liminar-cassada-detail.component';

describe('ConcessaoLiminarCassada Management Detail Component', () => {
  let comp: ConcessaoLiminarCassadaDetailComponent;
  let fixture: ComponentFixture<ConcessaoLiminarCassadaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConcessaoLiminarCassadaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ concessaoLiminarCassada: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ConcessaoLiminarCassadaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ConcessaoLiminarCassadaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load concessaoLiminarCassada on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.concessaoLiminarCassada).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
