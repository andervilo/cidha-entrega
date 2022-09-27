import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TipoDataDetailComponent } from './tipo-data-detail.component';

describe('TipoData Management Detail Component', () => {
  let comp: TipoDataDetailComponent;
  let fixture: ComponentFixture<TipoDataDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDataDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ tipoData: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TipoDataDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TipoDataDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tipoData on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.tipoData).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
