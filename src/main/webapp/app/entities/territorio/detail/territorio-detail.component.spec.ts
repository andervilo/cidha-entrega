import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TerritorioDetailComponent } from './territorio-detail.component';

describe('Territorio Management Detail Component', () => {
  let comp: TerritorioDetailComponent;
  let fixture: ComponentFixture<TerritorioDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TerritorioDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ territorio: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TerritorioDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TerritorioDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load territorio on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.territorio).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
