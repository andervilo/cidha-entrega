import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TipoRepresentanteService } from '../service/tipo-representante.service';
import { ITipoRepresentante, TipoRepresentante } from '../tipo-representante.model';

import { TipoRepresentanteUpdateComponent } from './tipo-representante-update.component';

describe('TipoRepresentante Management Update Component', () => {
  let comp: TipoRepresentanteUpdateComponent;
  let fixture: ComponentFixture<TipoRepresentanteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoRepresentanteService: TipoRepresentanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TipoRepresentanteUpdateComponent],
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
      .overrideTemplate(TipoRepresentanteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoRepresentanteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoRepresentanteService = TestBed.inject(TipoRepresentanteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tipoRepresentante: ITipoRepresentante = { id: 456 };

      activatedRoute.data = of({ tipoRepresentante });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(tipoRepresentante));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoRepresentante>>();
      const tipoRepresentante = { id: 123 };
      jest.spyOn(tipoRepresentanteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoRepresentante });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoRepresentante }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoRepresentanteService.update).toHaveBeenCalledWith(tipoRepresentante);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoRepresentante>>();
      const tipoRepresentante = new TipoRepresentante();
      jest.spyOn(tipoRepresentanteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoRepresentante });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoRepresentante }));
      saveSubject.complete();

      // THEN
      expect(tipoRepresentanteService.create).toHaveBeenCalledWith(tipoRepresentante);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoRepresentante>>();
      const tipoRepresentante = { id: 123 };
      jest.spyOn(tipoRepresentanteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoRepresentante });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoRepresentanteService.update).toHaveBeenCalledWith(tipoRepresentante);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
