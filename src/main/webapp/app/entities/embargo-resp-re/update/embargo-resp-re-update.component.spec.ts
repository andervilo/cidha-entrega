import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EmbargoRespReService } from '../service/embargo-resp-re.service';
import { IEmbargoRespRe, EmbargoRespRe } from '../embargo-resp-re.model';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

import { EmbargoRespReUpdateComponent } from './embargo-resp-re-update.component';

describe('EmbargoRespRe Management Update Component', () => {
  let comp: EmbargoRespReUpdateComponent;
  let fixture: ComponentFixture<EmbargoRespReUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let embargoRespReService: EmbargoRespReService;
  let processoService: ProcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EmbargoRespReUpdateComponent],
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
      .overrideTemplate(EmbargoRespReUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmbargoRespReUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    embargoRespReService = TestBed.inject(EmbargoRespReService);
    processoService = TestBed.inject(ProcessoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Processo query and add missing value', () => {
      const embargoRespRe: IEmbargoRespRe = { id: 456 };
      const processo: IProcesso = { id: 52380 };
      embargoRespRe.processo = processo;

      const processoCollection: IProcesso[] = [{ id: 27888 }];
      jest.spyOn(processoService, 'query').mockReturnValue(of(new HttpResponse({ body: processoCollection })));
      const additionalProcessos = [processo];
      const expectedCollection: IProcesso[] = [...additionalProcessos, ...processoCollection];
      jest.spyOn(processoService, 'addProcessoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ embargoRespRe });
      comp.ngOnInit();

      expect(processoService.query).toHaveBeenCalled();
      expect(processoService.addProcessoToCollectionIfMissing).toHaveBeenCalledWith(processoCollection, ...additionalProcessos);
      expect(comp.processosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const embargoRespRe: IEmbargoRespRe = { id: 456 };
      const processo: IProcesso = { id: 87442 };
      embargoRespRe.processo = processo;

      activatedRoute.data = of({ embargoRespRe });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(embargoRespRe));
      expect(comp.processosSharedCollection).toContain(processo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EmbargoRespRe>>();
      const embargoRespRe = { id: 123 };
      jest.spyOn(embargoRespReService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ embargoRespRe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: embargoRespRe }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(embargoRespReService.update).toHaveBeenCalledWith(embargoRespRe);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EmbargoRespRe>>();
      const embargoRespRe = new EmbargoRespRe();
      jest.spyOn(embargoRespReService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ embargoRespRe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: embargoRespRe }));
      saveSubject.complete();

      // THEN
      expect(embargoRespReService.create).toHaveBeenCalledWith(embargoRespRe);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EmbargoRespRe>>();
      const embargoRespRe = { id: 123 };
      jest.spyOn(embargoRespReService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ embargoRespRe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(embargoRespReService.update).toHaveBeenCalledWith(embargoRespRe);
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
