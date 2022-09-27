import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EmbargoDeclaracaoService } from '../service/embargo-declaracao.service';
import { IEmbargoDeclaracao, EmbargoDeclaracao } from '../embargo-declaracao.model';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

import { EmbargoDeclaracaoUpdateComponent } from './embargo-declaracao-update.component';

describe('EmbargoDeclaracao Management Update Component', () => {
  let comp: EmbargoDeclaracaoUpdateComponent;
  let fixture: ComponentFixture<EmbargoDeclaracaoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let embargoDeclaracaoService: EmbargoDeclaracaoService;
  let processoService: ProcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EmbargoDeclaracaoUpdateComponent],
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
      .overrideTemplate(EmbargoDeclaracaoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmbargoDeclaracaoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    embargoDeclaracaoService = TestBed.inject(EmbargoDeclaracaoService);
    processoService = TestBed.inject(ProcessoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Processo query and add missing value', () => {
      const embargoDeclaracao: IEmbargoDeclaracao = { id: 456 };
      const processo: IProcesso = { id: 58142 };
      embargoDeclaracao.processo = processo;

      const processoCollection: IProcesso[] = [{ id: 33217 }];
      jest.spyOn(processoService, 'query').mockReturnValue(of(new HttpResponse({ body: processoCollection })));
      const additionalProcessos = [processo];
      const expectedCollection: IProcesso[] = [...additionalProcessos, ...processoCollection];
      jest.spyOn(processoService, 'addProcessoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ embargoDeclaracao });
      comp.ngOnInit();

      expect(processoService.query).toHaveBeenCalled();
      expect(processoService.addProcessoToCollectionIfMissing).toHaveBeenCalledWith(processoCollection, ...additionalProcessos);
      expect(comp.processosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const embargoDeclaracao: IEmbargoDeclaracao = { id: 456 };
      const processo: IProcesso = { id: 10728 };
      embargoDeclaracao.processo = processo;

      activatedRoute.data = of({ embargoDeclaracao });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(embargoDeclaracao));
      expect(comp.processosSharedCollection).toContain(processo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EmbargoDeclaracao>>();
      const embargoDeclaracao = { id: 123 };
      jest.spyOn(embargoDeclaracaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ embargoDeclaracao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: embargoDeclaracao }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(embargoDeclaracaoService.update).toHaveBeenCalledWith(embargoDeclaracao);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EmbargoDeclaracao>>();
      const embargoDeclaracao = new EmbargoDeclaracao();
      jest.spyOn(embargoDeclaracaoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ embargoDeclaracao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: embargoDeclaracao }));
      saveSubject.complete();

      // THEN
      expect(embargoDeclaracaoService.create).toHaveBeenCalledWith(embargoDeclaracao);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EmbargoDeclaracao>>();
      const embargoDeclaracao = { id: 123 };
      jest.spyOn(embargoDeclaracaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ embargoDeclaracao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(embargoDeclaracaoService.update).toHaveBeenCalledWith(embargoDeclaracao);
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
