import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TipoEmpreendimentoService } from '../service/tipo-empreendimento.service';
import { ITipoEmpreendimento, TipoEmpreendimento } from '../tipo-empreendimento.model';

import { TipoEmpreendimentoUpdateComponent } from './tipo-empreendimento-update.component';

describe('TipoEmpreendimento Management Update Component', () => {
  let comp: TipoEmpreendimentoUpdateComponent;
  let fixture: ComponentFixture<TipoEmpreendimentoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoEmpreendimentoService: TipoEmpreendimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TipoEmpreendimentoUpdateComponent],
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
      .overrideTemplate(TipoEmpreendimentoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoEmpreendimentoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoEmpreendimentoService = TestBed.inject(TipoEmpreendimentoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tipoEmpreendimento: ITipoEmpreendimento = { id: 456 };

      activatedRoute.data = of({ tipoEmpreendimento });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(tipoEmpreendimento));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoEmpreendimento>>();
      const tipoEmpreendimento = { id: 123 };
      jest.spyOn(tipoEmpreendimentoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoEmpreendimento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoEmpreendimento }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoEmpreendimentoService.update).toHaveBeenCalledWith(tipoEmpreendimento);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoEmpreendimento>>();
      const tipoEmpreendimento = new TipoEmpreendimento();
      jest.spyOn(tipoEmpreendimentoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoEmpreendimento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoEmpreendimento }));
      saveSubject.complete();

      // THEN
      expect(tipoEmpreendimentoService.create).toHaveBeenCalledWith(tipoEmpreendimento);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TipoEmpreendimento>>();
      const tipoEmpreendimento = { id: 123 };
      jest.spyOn(tipoEmpreendimentoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoEmpreendimento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoEmpreendimentoService.update).toHaveBeenCalledWith(tipoEmpreendimento);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
