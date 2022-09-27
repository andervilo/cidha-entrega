import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AtividadeExploracaoIlegalService } from '../service/atividade-exploracao-ilegal.service';
import { IAtividadeExploracaoIlegal, AtividadeExploracaoIlegal } from '../atividade-exploracao-ilegal.model';

import { AtividadeExploracaoIlegalUpdateComponent } from './atividade-exploracao-ilegal-update.component';

describe('AtividadeExploracaoIlegal Management Update Component', () => {
  let comp: AtividadeExploracaoIlegalUpdateComponent;
  let fixture: ComponentFixture<AtividadeExploracaoIlegalUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let atividadeExploracaoIlegalService: AtividadeExploracaoIlegalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AtividadeExploracaoIlegalUpdateComponent],
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
      .overrideTemplate(AtividadeExploracaoIlegalUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AtividadeExploracaoIlegalUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    atividadeExploracaoIlegalService = TestBed.inject(AtividadeExploracaoIlegalService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const atividadeExploracaoIlegal: IAtividadeExploracaoIlegal = { id: 456 };

      activatedRoute.data = of({ atividadeExploracaoIlegal });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(atividadeExploracaoIlegal));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AtividadeExploracaoIlegal>>();
      const atividadeExploracaoIlegal = { id: 123 };
      jest.spyOn(atividadeExploracaoIlegalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ atividadeExploracaoIlegal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: atividadeExploracaoIlegal }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(atividadeExploracaoIlegalService.update).toHaveBeenCalledWith(atividadeExploracaoIlegal);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AtividadeExploracaoIlegal>>();
      const atividadeExploracaoIlegal = new AtividadeExploracaoIlegal();
      jest.spyOn(atividadeExploracaoIlegalService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ atividadeExploracaoIlegal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: atividadeExploracaoIlegal }));
      saveSubject.complete();

      // THEN
      expect(atividadeExploracaoIlegalService.create).toHaveBeenCalledWith(atividadeExploracaoIlegal);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AtividadeExploracaoIlegal>>();
      const atividadeExploracaoIlegal = { id: 123 };
      jest.spyOn(atividadeExploracaoIlegalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ atividadeExploracaoIlegal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(atividadeExploracaoIlegalService.update).toHaveBeenCalledWith(atividadeExploracaoIlegal);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
