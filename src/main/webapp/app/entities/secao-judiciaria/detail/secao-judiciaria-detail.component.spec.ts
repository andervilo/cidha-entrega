import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SecaoJudiciariaDetailComponent } from './secao-judiciaria-detail.component';

describe('SecaoJudiciaria Management Detail Component', () => {
  let comp: SecaoJudiciariaDetailComponent;
  let fixture: ComponentFixture<SecaoJudiciariaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecaoJudiciariaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ secaoJudiciaria: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SecaoJudiciariaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SecaoJudiciariaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load secaoJudiciaria on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.secaoJudiciaria).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
