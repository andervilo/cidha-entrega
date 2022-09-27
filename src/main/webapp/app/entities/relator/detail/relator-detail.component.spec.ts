import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RelatorDetailComponent } from './relator-detail.component';

describe('Relator Management Detail Component', () => {
  let comp: RelatorDetailComponent;
  let fixture: ComponentFixture<RelatorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatorDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ relator: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RelatorDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RelatorDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load relator on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.relator).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
