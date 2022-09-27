import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ConflitoService } from '../service/conflito.service';
import { IConflito, Conflito } from '../conflito.model';
import { IProcessoConflito } from 'app/entities/processo-conflito/processo-conflito.model';
import { ProcessoConflitoService } from 'app/entities/processo-conflito/service/processo-conflito.service';

import { ConflitoUpdateComponent } from './conflito-update.component';

describe('Conflito Management Update Component', () => {
  let comp: ConflitoUpdateComponent;
  let fixture: ComponentFixture<ConflitoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let conflitoService: ConflitoService;
  let processoConflitoService: ProcessoConflitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ConflitoUpdateComponent],
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
      .overrideTemplate(ConflitoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConflitoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    conflitoService = TestBed.inject(ConflitoService);
    processoConflitoService = TestBed.inject(ProcessoConflitoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ProcessoConflito query and add missing value', () => {
      const conflito: IConflito = { id: 456 };
      const processoConflito: IProcessoConflito = { id: 10620 };
      conflito.processoConflito = processoConflito;

      const processoConflitoCollection: IProcessoConflito[] = [{ id: 84075 }];
      jest.spyOn(processoConflitoService, 'query').mockReturnValue(of(new HttpResponse({ body: processoConflitoCollection })));
      const additionalProcessoConflitos = [processoConflito];
      const expectedCollection: IProcessoConflito[] = [...additionalProcessoConflitos, ...processoConflitoCollection];
      jest.spyOn(processoConflitoService, 'addProcessoConflitoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ conflito });
      comp.ngOnInit();

      expect(processoConflitoService.query).toHaveBeenCalled();
      expect(processoConflitoService.addProcessoConflitoToCollectionIfMissing).toHaveBeenCalledWith(
        processoConflitoCollection,
        ...additionalProcessoConflitos
      );
      expect(comp.processoConflitosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const conflito: IConflito = { id: 456 };
      const processoConflito: IProcessoConflito = { id: 23377 };
      conflito.processoConflito = processoConflito;

      activatedRoute.data = of({ conflito });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(conflito));
      expect(comp.processoConflitosSharedCollection).toContain(processoConflito);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Conflito>>();
      const conflito = { id: 123 };
      jest.spyOn(conflitoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conflito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conflito }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(conflitoService.update).toHaveBeenCalledWith(conflito);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Conflito>>();
      const conflito = new Conflito();
      jest.spyOn(conflitoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conflito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conflito }));
      saveSubject.complete();

      // THEN
      expect(conflitoService.create).toHaveBeenCalledWith(conflito);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Conflito>>();
      const conflito = { id: 123 };
      jest.spyOn(conflitoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conflito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(conflitoService.update).toHaveBeenCalledWith(conflito);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackProcessoConflitoById', () => {
      it('Should return tracked ProcessoConflito primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProcessoConflitoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
