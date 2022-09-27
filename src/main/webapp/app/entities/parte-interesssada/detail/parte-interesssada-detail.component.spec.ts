import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ParteInteresssadaDetailComponent } from './parte-interesssada-detail.component';

describe('ParteInteresssada Management Detail Component', () => {
  let comp: ParteInteresssadaDetailComponent;
  let fixture: ComponentFixture<ParteInteresssadaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParteInteresssadaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ parteInteresssada: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ParteInteresssadaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ParteInteresssadaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load parteInteresssada on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.parteInteresssada).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
