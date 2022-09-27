import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TipoDecisaoService } from '../service/tipo-decisao.service';
import { ITipoDecisao, TipoDecisao } from '../tipo-decisao.model';

import { TipoDecisaoUpdateComponent } from './tipo-decisao-update.component';

describe('TipoDecisao Management Update Component', () => {
  let comp: TipoDecisaoUpdateComponent;
  let fixture: ComponentFixture<TipoDecisaoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoDecisaoService: TipoDecisaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TipoDecisaoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TipoDecisaoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoDecisaoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoDecisaoService = TestBed.inject(TipoDecisaoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tipoDecisao: ITipoDecisao = { id: 456 };

      activatedRoute.data = of({ tipoDecisao });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(tipoDecisao));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoDecisao>>();
      const tipoDecisao = { id: 123 };
      jest.spyOn(tipoDecisaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoDecisao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoDecisao }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoDecisaoService.update).toHaveBeenCalledWith(tipoDecisao);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoDecisao>>();
      const tipoDecisao = new TipoDecisao();
      jest.spyOn(tipoDecisaoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoDecisao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoDecisao }));
      saveSubject.complete();

      // THEN
      expect(tipoDecisaoService.create).toHaveBeenCalledWith(tipoDecisao);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoDecisao>>();
      const tipoDecisao = { id: 123 };
      jest.spyOn(tipoDecisaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoDecisao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoDecisaoService.update).toHaveBeenCalledWith(tipoDecisao);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
