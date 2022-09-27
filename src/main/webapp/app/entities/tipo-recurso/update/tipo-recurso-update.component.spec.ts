import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TipoRecursoService } from '../service/tipo-recurso.service';
import { ITipoRecurso, TipoRecurso } from '../tipo-recurso.model';

import { TipoRecursoUpdateComponent } from './tipo-recurso-update.component';

describe('TipoRecurso Management Update Component', () => {
  let comp: TipoRecursoUpdateComponent;
  let fixture: ComponentFixture<TipoRecursoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoRecursoService: TipoRecursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TipoRecursoUpdateComponent],
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
      .overrideTemplate(TipoRecursoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoRecursoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoRecursoService = TestBed.inject(TipoRecursoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tipoRecurso: ITipoRecurso = { id: 456 };

      activatedRoute.data = of({ tipoRecurso });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(tipoRecurso));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoRecurso>>();
      const tipoRecurso = { id: 123 };
      jest.spyOn(tipoRecursoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoRecurso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoRecurso }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoRecursoService.update).toHaveBeenCalledWith(tipoRecurso);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoRecurso>>();
      const tipoRecurso = new TipoRecurso();
      jest.spyOn(tipoRecursoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoRecurso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoRecurso }));
      saveSubject.complete();

      // THEN
      expect(tipoRecursoService.create).toHaveBeenCalledWith(tipoRecurso);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoRecurso>>();
      const tipoRecurso = { id: 123 };
      jest.spyOn(tipoRecursoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoRecurso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoRecursoService.update).toHaveBeenCalledWith(tipoRecurso);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
