import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TipoDecisaoDetailComponent } from './tipo-decisao-detail.component';

describe('TipoDecisao Management Detail Component', () => {
  let comp: TipoDecisaoDetailComponent;
  let fixture: ComponentFixture<TipoDecisaoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDecisaoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ tipoDecisao: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TipoDecisaoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TipoDecisaoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tipoDecisao on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.tipoDecisao).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
