import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EmbargoDeclaracaoAgravoService } from '../service/embargo-declaracao-agravo.service';
import { IEmbargoDeclaracaoAgravo, EmbargoDeclaracaoAgravo } from '../embargo-declaracao-agravo.model';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

import { EmbargoDeclaracaoAgravoUpdateComponent } from './embargo-declaracao-agravo-update.component';

describe('EmbargoDeclaracaoAgravo Management Update Component', () => {
  let comp: EmbargoDeclaracaoAgravoUpdateComponent;
  let fixture: ComponentFixture<EmbargoDeclaracaoAgravoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let embargoDeclaracaoAgravoService: EmbargoDeclaracaoAgravoService;
  let processoService: ProcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EmbargoDeclaracaoAgravoUpdateComponent],
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
      .overrideTemplate(EmbargoDeclaracaoAgravoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmbargoDeclaracaoAgravoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    embargoDeclaracaoAgravoService = TestBed.inject(EmbargoDeclaracaoAgravoService);
    processoService = TestBed.inject(ProcessoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Processo query and add missing value', () => {
      const embargoDeclaracaoAgravo: IEmbargoDeclaracaoAgravo = { id: 456 };
      const processo: IProcesso = { id: 77615 };
      embargoDeclaracaoAgravo.processo = processo;

      const processoCollection: IProcesso[] = [{ id: 24852 }];
      jest.spyOn(processoService, 'query').mockReturnValue(of(new HttpResponse({ body: processoCollection })));
      const additionalProcessos = [processo];
      const expectedCollection: IProcesso[] = [...additionalProcessos, ...processoCollection];
      jest.spyOn(processoService, 'addProcessoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ embargoDeclaracaoAgravo });
      comp.ngOnInit();

      expect(processoService.query).toHaveBeenCalled();
      expect(processoService.addProcessoToCollectionIfMissing).toHaveBeenCalledWith(processoCollection, ...additionalProcessos);
      expect(comp.processosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const embargoDeclaracaoAgravo: IEmbargoDeclaracaoAgravo = { id: 456 };
      const processo: IProcesso = { id: 16394 };
      embargoDeclaracaoAgravo.processo = processo;

      activatedRoute.data = of({ embargoDeclaracaoAgravo });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(embargoDeclaracaoAgravo));
      expect(comp.processosSharedCollection).toContain(processo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EmbargoDeclaracaoAgravo>>();
      const embargoDeclaracaoAgravo = { id: 123 };
      jest.spyOn(embargoDeclaracaoAgravoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ embargoDeclaracaoAgravo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: embargoDeclaracaoAgravo }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(embargoDeclaracaoAgravoService.update).toHaveBeenCalledWith(embargoDeclaracaoAgravo);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EmbargoDeclaracaoAgravo>>();
      const embargoDeclaracaoAgravo = new EmbargoDeclaracaoAgravo();
      jest.spyOn(embargoDeclaracaoAgravoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ embargoDeclaracaoAgravo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: embargoDeclaracaoAgravo }));
      saveSubject.complete();

      // THEN
      expect(embargoDeclaracaoAgravoService.create).toHaveBeenCalledWith(embargoDeclaracaoAgravo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EmbargoDeclaracaoAgravo>>();
      const embargoDeclaracaoAgravo = { id: 123 };
      jest.spyOn(embargoDeclaracaoAgravoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ embargoDeclaracaoAgravo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(embargoDeclaracaoAgravoService.update).toHaveBeenCalledWith(embargoDeclaracaoAgravo);
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
