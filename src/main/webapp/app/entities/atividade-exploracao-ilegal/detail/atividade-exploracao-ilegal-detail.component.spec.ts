import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AtividadeExploracaoIlegalDetailComponent } from './atividade-exploracao-ilegal-detail.component';

describe('AtividadeExploracaoIlegal Management Detail Component', () => {
  let comp: AtividadeExploracaoIlegalDetailComponent;
  let fixture: ComponentFixture<AtividadeExploracaoIlegalDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtividadeExploracaoIlegalDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ atividadeExploracaoIlegal: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AtividadeExploracaoIlegalDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AtividadeExploracaoIlegalDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load atividadeExploracaoIlegal on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.atividadeExploracaoIlegal).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
