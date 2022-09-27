import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EmbargoRecursoEspecialService } from '../service/embargo-recurso-especial.service';
import { IEmbargoRecursoEspecial, EmbargoRecursoEspecial } from '../embargo-recurso-especial.model';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

import { EmbargoRecursoEspecialUpdateComponent } from './embargo-recurso-especial-update.component';

describe('EmbargoRecursoEspecial Management Update Component', () => {
  let comp: EmbargoRecursoEspecialUpdateComponent;
  let fixture: ComponentFixture<EmbargoRecursoEspecialUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let embargoRecursoEspecialService: EmbargoRecursoEspecialService;
  let processoService: ProcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EmbargoRecursoEspecialUpdateComponent],
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
      .overrideTemplate(EmbargoRecursoEspecialUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmbargoRecursoEspecialUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    embargoRecursoEspecialService = TestBed.inject(EmbargoRecursoEspecialService);
    processoService = TestBed.inject(ProcessoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Processo query and add missing value', () => {
      const embargoRecursoEspecial: IEmbargoRecursoEspecial = { id: 456 };
      const processo: IProcesso = { id: 12833 };
      embargoRecursoEspecial.processo = processo;

      const processoCollection: IProcesso[] = [{ id: 17915 }];
      jest.spyOn(processoService, 'query').mockReturnValue(of(new HttpResponse({ body: processoCollection })));
      const additionalProcessos = [processo];
      const expectedCollection: IProcesso[] = [...additionalProcessos, ...processoCollection];
      jest.spyOn(processoService, 'addProcessoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ embargoRecursoEspecial });
      comp.ngOnInit();

      expect(processoService.query).toHaveBeenCalled();
      expect(processoService.addProcessoToCollectionIfMissing).toHaveBeenCalledWith(processoCollection, ...additionalProcessos);
      expect(comp.processosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const embargoRecursoEspecial: IEmbargoRecursoEspecial = { id: 456 };
      const processo: IProcesso = { id: 33132 };
      embargoRecursoEspecial.processo = processo;

      activatedRoute.data = of({ embargoRecursoEspecial });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(embargoRecursoEspecial));
      expect(comp.processosSharedCollection).toContain(processo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EmbargoRecursoEspecial>>();
      const embargoRecursoEspecial = { id: 123 };
      jest.spyOn(embargoRecursoEspecialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ embargoRecursoEspecial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: embargoRecursoEspecial }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(embargoRecursoEspecialService.update).toHaveBeenCalledWith(embargoRecursoEspecial);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EmbargoRecursoEspecial>>();
      const embargoRecursoEspecial = new EmbargoRecursoEspecial();
      jest.spyOn(embargoRecursoEspecialService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ embargoRecursoEspecial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: embargoRecursoEspecial }));
      saveSubject.complete();

      // THEN
      expect(embargoRecursoEspecialService.create).toHaveBeenCalledWith(embargoRecursoEspecial);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EmbargoRecursoEspecial>>();
      const embargoRecursoEspecial = { id: 123 };
      jest.spyOn(embargoRecursoEspecialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ embargoRecursoEspecial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(embargoRecursoEspecialService.update).toHaveBeenCalledWith(embargoRecursoEspecial);
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
