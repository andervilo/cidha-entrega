import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RecursoService } from '../service/recurso.service';
import { IRecurso, Recurso } from '../recurso.model';
import { ITipoRecurso } from 'app/entities/tipo-recurso/tipo-recurso.model';
import { TipoRecursoService } from 'app/entities/tipo-recurso/service/tipo-recurso.service';
import { IOpcaoRecurso } from 'app/entities/opcao-recurso/opcao-recurso.model';
import { OpcaoRecursoService } from 'app/entities/opcao-recurso/service/opcao-recurso.service';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

import { RecursoUpdateComponent } from './recurso-update.component';

describe('Recurso Management Update Component', () => {
  let comp: RecursoUpdateComponent;
  let fixture: ComponentFixture<RecursoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let recursoService: RecursoService;
  let tipoRecursoService: TipoRecursoService;
  let opcaoRecursoService: OpcaoRecursoService;
  let processoService: ProcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RecursoUpdateComponent],
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
      .overrideTemplate(RecursoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RecursoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    recursoService = TestBed.inject(RecursoService);
    tipoRecursoService = TestBed.inject(TipoRecursoService);
    opcaoRecursoService = TestBed.inject(OpcaoRecursoService);
    processoService = TestBed.inject(ProcessoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call tipoRecurso query and add missing value', () => {
      const recurso: IRecurso = { id: 456 };
      const tipoRecurso: ITipoRecurso = { id: 75685 };
      recurso.tipoRecurso = tipoRecurso;

      const tipoRecursoCollection: ITipoRecurso[] = [{ id: 96866 }];
      jest.spyOn(tipoRecursoService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoRecursoCollection })));
      const expectedCollection: ITipoRecurso[] = [tipoRecurso, ...tipoRecursoCollection];
      jest.spyOn(tipoRecursoService, 'addTipoRecursoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ recurso });
      comp.ngOnInit();

      expect(tipoRecursoService.query).toHaveBeenCalled();
      expect(tipoRecursoService.addTipoRecursoToCollectionIfMissing).toHaveBeenCalledWith(tipoRecursoCollection, tipoRecurso);
      expect(comp.tipoRecursosCollection).toEqual(expectedCollection);
    });

    it('Should call opcaoRecurso query and add missing value', () => {
      const recurso: IRecurso = { id: 456 };
      const opcaoRecurso: IOpcaoRecurso = { id: 72602 };
      recurso.opcaoRecurso = opcaoRecurso;

      const opcaoRecursoCollection: IOpcaoRecurso[] = [{ id: 82884 }];
      jest.spyOn(opcaoRecursoService, 'query').mockReturnValue(of(new HttpResponse({ body: opcaoRecursoCollection })));
      const expectedCollection: IOpcaoRecurso[] = [opcaoRecurso, ...opcaoRecursoCollection];
      jest.spyOn(opcaoRecursoService, 'addOpcaoRecursoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ recurso });
      comp.ngOnInit();

      expect(opcaoRecursoService.query).toHaveBeenCalled();
      expect(opcaoRecursoService.addOpcaoRecursoToCollectionIfMissing).toHaveBeenCalledWith(opcaoRecursoCollection, opcaoRecurso);
      expect(comp.opcaoRecursosCollection).toEqual(expectedCollection);
    });

    it('Should call Processo query and add missing value', () => {
      const recurso: IRecurso = { id: 456 };
      const processo: IProcesso = { id: 74555 };
      recurso.processo = processo;

      const processoCollection: IProcesso[] = [{ id: 61140 }];
      jest.spyOn(processoService, 'query').mockReturnValue(of(new HttpResponse({ body: processoCollection })));
      const additionalProcessos = [processo];
      const expectedCollection: IProcesso[] = [...additionalProcessos, ...processoCollection];
      jest.spyOn(processoService, 'addProcessoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ recurso });
      comp.ngOnInit();

      expect(processoService.query).toHaveBeenCalled();
      expect(processoService.addProcessoToCollectionIfMissing).toHaveBeenCalledWith(processoCollection, ...additionalProcessos);
      expect(comp.processosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const recurso: IRecurso = { id: 456 };
      const tipoRecurso: ITipoRecurso = { id: 86267 };
      recurso.tipoRecurso = tipoRecurso;
      const opcaoRecurso: IOpcaoRecurso = { id: 43696 };
      recurso.opcaoRecurso = opcaoRecurso;
      const processo: IProcesso = { id: 90556 };
      recurso.processo = processo;

      activatedRoute.data = of({ recurso });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(recurso));
      expect(comp.tipoRecursosCollection).toContain(tipoRecurso);
      expect(comp.opcaoRecursosCollection).toContain(opcaoRecurso);
      expect(comp.processosSharedCollection).toContain(processo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Recurso>>();
      const recurso = { id: 123 };
      jest.spyOn(recursoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ recurso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: recurso }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(recursoService.update).toHaveBeenCalledWith(recurso);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Recurso>>();
      const recurso = new Recurso();
      jest.spyOn(recursoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ recurso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: recurso }));
      saveSubject.complete();

      // THEN
      expect(recursoService.create).toHaveBeenCalledWith(recurso);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Recurso>>();
      const recurso = { id: 123 };
      jest.spyOn(recursoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ recurso });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(recursoService.update).toHaveBeenCalledWith(recurso);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackTipoRecursoById', () => {
      it('Should return tracked TipoRecurso primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTipoRecursoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackOpcaoRecursoById', () => {
      it('Should return tracked OpcaoRecurso primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackOpcaoRecursoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackProcessoById', () => {
      it('Should return tracked Processo primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProcessoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
