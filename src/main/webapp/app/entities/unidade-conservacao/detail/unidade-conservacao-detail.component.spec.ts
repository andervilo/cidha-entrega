import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UnidadeConservacaoDetailComponent } from './unidade-conservacao-detail.component';

describe('UnidadeConservacao Management Detail Component', () => {
  let comp: UnidadeConservacaoDetailComponent;
  let fixture: ComponentFixture<UnidadeConservacaoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadeConservacaoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ unidadeConservacao: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UnidadeConservacaoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UnidadeConservacaoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load unidadeConservacao on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.unidadeConservacao).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
