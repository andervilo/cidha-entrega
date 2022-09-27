import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UnidadeConservacaoService } from '../service/unidade-conservacao.service';
import { IUnidadeConservacao, UnidadeConservacao } from '../unidade-conservacao.model';

import { UnidadeConservacaoUpdateComponent } from './unidade-conservacao-update.component';

describe('UnidadeConservacao Management Update Component', () => {
  let comp: UnidadeConservacaoUpdateComponent;
  let fixture: ComponentFixture<UnidadeConservacaoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let unidadeConservacaoService: UnidadeConservacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UnidadeConservacaoUpdateComponent],
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
      .overrideTemplate(UnidadeConservacaoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UnidadeConservacaoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    unidadeConservacaoService = TestBed.inject(UnidadeConservacaoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const unidadeConservacao: IUnidadeConservacao = { id: 456 };

      activatedRoute.data = of({ unidadeConservacao });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(unidadeConservacao));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<UnidadeConservacao>>();
      const unidadeConservacao = { id: 123 };
      jest.spyOn(unidadeConservacaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ unidadeConservacao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: unidadeConservacao }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(unidadeConservacaoService.update).toHaveBeenCalledWith(unidadeConservacao);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<UnidadeConservacao>>();
      const unidadeConservacao = new UnidadeConservacao();
      jest.spyOn(unidadeConservacaoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ unidadeConservacao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: unidadeConservacao }));
      saveSubject.complete();

      // THEN
      expect(unidadeConservacaoService.create).toHaveBeenCalledWith(unidadeConservacao);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<UnidadeConservacao>>();
      const unidadeConservacao = { id: 123 };
      jest.spyOn(unidadeConservacaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ unidadeConservacao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(unidadeConservacaoService.update).toHaveBeenCalledWith(unidadeConservacao);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
