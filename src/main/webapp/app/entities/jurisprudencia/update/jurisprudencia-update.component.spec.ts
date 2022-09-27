import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { JurisprudenciaService } from '../service/jurisprudencia.service';
import { IJurisprudencia, Jurisprudencia } from '../jurisprudencia.model';

import { JurisprudenciaUpdateComponent } from './jurisprudencia-update.component';

describe('Jurisprudencia Management Update Component', () => {
  let comp: JurisprudenciaUpdateComponent;
  let fixture: ComponentFixture<JurisprudenciaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let jurisprudenciaService: JurisprudenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [JurisprudenciaUpdateComponent],
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
      .overrideTemplate(JurisprudenciaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(JurisprudenciaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    jurisprudenciaService = TestBed.inject(JurisprudenciaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const jurisprudencia: IJurisprudencia = { id: 456 };

      activatedRoute.data = of({ jurisprudencia });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(jurisprudencia));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Jurisprudencia>>();
      const jurisprudencia = { id: 123 };
      jest.spyOn(jurisprudenciaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jurisprudencia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jurisprudencia }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(jurisprudenciaService.update).toHaveBeenCalledWith(jurisprudencia);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Jurisprudencia>>();
      const jurisprudencia = new Jurisprudencia();
      jest.spyOn(jurisprudenciaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jurisprudencia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jurisprudencia }));
      saveSubject.complete();

      // THEN
      expect(jurisprudenciaService.create).toHaveBeenCalledWith(jurisprudencia);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Jurisprudencia>>();
      const jurisprudencia = { id: 123 };
      jest.spyOn(jurisprudenciaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jurisprudencia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(jurisprudenciaService.update).toHaveBeenCalledWith(jurisprudencia);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
