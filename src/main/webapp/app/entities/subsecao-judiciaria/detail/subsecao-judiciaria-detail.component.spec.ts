import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SubsecaoJudiciariaDetailComponent } from './subsecao-judiciaria-detail.component';

describe('SubsecaoJudiciaria Management Detail Component', () => {
  let comp: SubsecaoJudiciariaDetailComponent;
  let fixture: ComponentFixture<SubsecaoJudiciariaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubsecaoJudiciariaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ subsecaoJudiciaria: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SubsecaoJudiciariaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SubsecaoJudiciariaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load subsecaoJudiciaria on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.subsecaoJudiciaria).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
