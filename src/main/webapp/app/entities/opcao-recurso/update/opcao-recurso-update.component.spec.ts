import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OpcaoRecursoService } from '../service/opcao-recurso.service';
import { IOpcaoRecurso, OpcaoRecurso } from '../opcao-recurso.model';

import { OpcaoRecursoUpdateComponent } from './opcao-recurso-update.component';

describe('OpcaoRecurso Management Update Component', () => {
  let comp: OpcaoRecursoUpdateComponent;
  let fixture: ComponentFixture<OpcaoRecursoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let opcaoRecursoService: OpcaoRecursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [OpcaoRecursoUpdateComponent],
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
      .overrideTemplate(OpcaoRecursoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OpcaoRecursoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    opcaoRecursoService = TestBed.inject(OpcaoRecursoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const opcaoRecurso: IOpcaoRecurso = { id: 456 };

      activatedRoute.data = of({ opcaoRecurso });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(opcaoRecurso));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<OpcaoRecurso>>();
      const opcaoRecurso = { id: 123 };
      jest.spyOn(opcaoRecursoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ opcaoRecurso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: opcaoRecurso }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(opcaoRecursoService.update).toHaveBeenCalledWith(opcaoRecurso);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<OpcaoRecurso>>();
      const opcaoRecurso = new OpcaoRecurso();
      jest.spyOn(opcaoRecursoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ opcaoRecurso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: opcaoRecurso }));
      saveSubject.complete();

      // THEN
      expect(opcaoRecursoService.create).toHaveBeenCalledWith(opcaoRecurso);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<OpcaoRecurso>>();
      const opcaoRecurso = { id: 123 };
      jest.spyOn(opcaoRecursoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ opcaoRecurso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(opcaoRecursoService.update).toHaveBeenCalledWith(opcaoRecurso);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
