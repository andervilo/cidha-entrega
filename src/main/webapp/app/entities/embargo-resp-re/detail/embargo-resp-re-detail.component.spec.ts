import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmbargoRespReDetailComponent } from './embargo-resp-re-detail.component';

describe('EmbargoRespRe Management Detail Component', () => {
  let comp: EmbargoRespReDetailComponent;
  let fixture: ComponentFixture<EmbargoRespReDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmbargoRespReDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ embargoRespRe: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EmbargoRespReDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EmbargoRespReDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load embargoRespRe on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.embargoRespRe).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
