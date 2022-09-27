import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ConcessaoLiminarCassadaService } from '../service/concessao-liminar-cassada.service';
import { IConcessaoLiminarCassada, ConcessaoLiminarCassada } from '../concessao-liminar-cassada.model';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

import { ConcessaoLiminarCassadaUpdateComponent } from './concessao-liminar-cassada-update.component';

describe('ConcessaoLiminarCassada Management Update Component', () => {
  let comp: ConcessaoLiminarCassadaUpdateComponent;
  let fixture: ComponentFixture<ConcessaoLiminarCassadaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let concessaoLiminarCassadaService: ConcessaoLiminarCassadaService;
  let processoService: ProcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ConcessaoLiminarCassadaUpdateComponent],
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
      .overrideTemplate(ConcessaoLiminarCassadaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConcessaoLiminarCassadaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    concessaoLiminarCassadaService = TestBed.inject(ConcessaoLiminarCassadaService);
    processoService = TestBed.inject(ProcessoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Processo query and add missing value', () => {
      const concessaoLiminarCassada: IConcessaoLiminarCassada = { id: 456 };
      const processo: IProcesso = { id: 74746 };
      concessaoLiminarCassada.processo = processo;

      const processoCollection: IProcesso[] = [{ id: 95876 }];
      jest.spyOn(processoService, 'query').mockReturnValue(of(new HttpResponse({ body: processoCollection })));
      const additionalProcessos = [processo];
      const expectedCollection: IProcesso[] = [...additionalProcessos, ...processoCollection];
      jest.spyOn(processoService, 'addProcessoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ concessaoLiminarCassada });
      comp.ngOnInit();

      expect(processoService.query).toHaveBeenCalled();
      expect(processoService.addProcessoToCollectionIfMissing).toHaveBeenCalledWith(processoCollection, ...additionalProcessos);
      expect(comp.processosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const concessaoLiminarCassada: IConcessaoLiminarCassada = { id: 456 };
      const processo: IProcesso = { id: 18967 };
      concessaoLiminarCassada.processo = processo;

      activatedRoute.data = of({ concessaoLiminarCassada });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(concessaoLiminarCassada));
      expect(comp.processosSharedCollection).toContain(processo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ConcessaoLiminarCassada>>();
      const concessaoLiminarCassada = { id: 123 };
      jest.spyOn(concessaoLiminarCassadaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ concessaoLiminarCassada });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: concessaoLiminarCassada }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(concessaoLiminarCassadaService.update).toHaveBeenCalledWith(concessaoLiminarCassada);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ConcessaoLiminarCassada>>();
      const concessaoLiminarCassada = new ConcessaoLiminarCassada();
      jest.spyOn(concessaoLiminarCassadaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ concessaoLiminarCassada });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: concessaoLiminarCassada }));
      saveSubject.complete();

      // THEN
      expect(concessaoLiminarCassadaService.create).toHaveBeenCalledWith(concessaoLiminarCassada);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ConcessaoLiminarCassada>>();
      const concessaoLiminarCassada = { id: 123 };
      jest.spyOn(concessaoLiminarCassadaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ concessaoLiminarCassada });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(concessaoLiminarCassadaService.update).toHaveBeenCalledWith(concessaoLiminarCassada);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackProcessoById', () => {
      it('Should return tracked Processo primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProcessoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
