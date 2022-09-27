import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProblemaJuridicoService } from '../service/problema-juridico.service';
import { IProblemaJuridico, ProblemaJuridico } from '../problema-juridico.model';
import { IFundamentacaoDoutrinaria } from 'app/entities/fundamentacao-doutrinaria/fundamentacao-doutrinaria.model';
import { FundamentacaoDoutrinariaService } from 'app/entities/fundamentacao-doutrinaria/service/fundamentacao-doutrinaria.service';
import { IJurisprudencia } from 'app/entities/jurisprudencia/jurisprudencia.model';
import { JurisprudenciaService } from 'app/entities/jurisprudencia/service/jurisprudencia.service';
import { IFundamentacaoLegal } from 'app/entities/fundamentacao-legal/fundamentacao-legal.model';
import { FundamentacaoLegalService } from 'app/entities/fundamentacao-legal/service/fundamentacao-legal.service';
import { IInstrumentoInternacional } from 'app/entities/instrumento-internacional/instrumento-internacional.model';
import { InstrumentoInternacionalService } from 'app/entities/instrumento-internacional/service/instrumento-internacional.service';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

import { ProblemaJuridicoUpdateComponent } from './problema-juridico-update.component';

describe('ProblemaJuridico Management Update Component', () => {
  let comp: ProblemaJuridicoUpdateComponent;
  let fixture: ComponentFixture<ProblemaJuridicoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let problemaJuridicoService: ProblemaJuridicoService;
  let fundamentacaoDoutrinariaService: FundamentacaoDoutrinariaService;
  let jurisprudenciaService: JurisprudenciaService;
  let fundamentacaoLegalService: FundamentacaoLegalService;
  let instrumentoInternacionalService: InstrumentoInternacionalService;
  let processoService: ProcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProblemaJuridicoUpdateComponent],
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
      .overrideTemplate(ProblemaJuridicoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProblemaJuridicoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    problemaJuridicoService = TestBed.inject(ProblemaJuridicoService);
    fundamentacaoDoutrinariaService = TestBed.inject(FundamentacaoDoutrinariaService);
    jurisprudenciaService = TestBed.inject(JurisprudenciaService);
    fundamentacaoLegalService = TestBed.inject(FundamentacaoLegalService);
    instrumentoInternacionalService = TestBed.inject(InstrumentoInternacionalService);
    processoService = TestBed.inject(ProcessoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call FundamentacaoDoutrinaria query and add missing value', () => {
      const problemaJuridico: IProblemaJuridico = { id: 456 };
      const fundamentacaoDoutrinarias: IFundamentacaoDoutrinaria[] = [{ id: 99773 }];
      problemaJuridico.fundamentacaoDoutrinarias = fundamentacaoDoutrinarias;

      const fundamentacaoDoutrinariaCollection: IFundamentacaoDoutrinaria[] = [{ id: 60246 }];
      jest
        .spyOn(fundamentacaoDoutrinariaService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: fundamentacaoDoutrinariaCollection })));
      const additionalFundamentacaoDoutrinarias = [...fundamentacaoDoutrinarias];
      const expectedCollection: IFundamentacaoDoutrinaria[] = [
        ...additionalFundamentacaoDoutrinarias,
        ...fundamentacaoDoutrinariaCollection,
      ];
      jest.spyOn(fundamentacaoDoutrinariaService, 'addFundamentacaoDoutrinariaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ problemaJuridico });
      comp.ngOnInit();

      expect(fundamentacaoDoutrinariaService.query).toHaveBeenCalled();
      expect(fundamentacaoDoutrinariaService.addFundamentacaoDoutrinariaToCollectionIfMissing).toHaveBeenCalledWith(
        fundamentacaoDoutrinariaCollection,
        ...additionalFundamentacaoDoutrinarias
      );
      expect(comp.fundamentacaoDoutrinariasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Jurisprudencia query and add missing value', () => {
      const problemaJuridico: IProblemaJuridico = { id: 456 };
      const jurisprudencias: IJurisprudencia[] = [{ id: 55528 }];
      problemaJuridico.jurisprudencias = jurisprudencias;

      const jurisprudenciaCollection: IJurisprudencia[] = [{ id: 40270 }];
      jest.spyOn(jurisprudenciaService, 'query').mockReturnValue(of(new HttpResponse({ body: jurisprudenciaCollection })));
      const additionalJurisprudencias = [...jurisprudencias];
      const expectedCollection: IJurisprudencia[] = [...additionalJurisprudencias, ...jurisprudenciaCollection];
      jest.spyOn(jurisprudenciaService, 'addJurisprudenciaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ problemaJuridico });
      comp.ngOnInit();

      expect(jurisprudenciaService.query).toHaveBeenCalled();
      expect(jurisprudenciaService.addJurisprudenciaToCollectionIfMissing).toHaveBeenCalledWith(
        jurisprudenciaCollection,
        ...additionalJurisprudencias
      );
      expect(comp.jurisprudenciasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call FundamentacaoLegal query and add missing value', () => {
      const problemaJuridico: IProblemaJuridico = { id: 456 };
      const fundamentacaoLegals: IFundamentacaoLegal[] = [{ id: 15874 }];
      problemaJuridico.fundamentacaoLegals = fundamentacaoLegals;

      const fundamentacaoLegalCollection: IFundamentacaoLegal[] = [{ id: 64280 }];
      jest.spyOn(fundamentacaoLegalService, 'query').mockReturnValue(of(new HttpResponse({ body: fundamentacaoLegalCollection })));
      const additionalFundamentacaoLegals = [...fundamentacaoLegals];
      const expectedCollection: IFundamentacaoLegal[] = [...additionalFundamentacaoLegals, ...fundamentacaoLegalCollection];
      jest.spyOn(fundamentacaoLegalService, 'addFundamentacaoLegalToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ problemaJuridico });
      comp.ngOnInit();

      expect(fundamentacaoLegalService.query).toHaveBeenCalled();
      expect(fundamentacaoLegalService.addFundamentacaoLegalToCollectionIfMissing).toHaveBeenCalledWith(
        fundamentacaoLegalCollection,
        ...additionalFundamentacaoLegals
      );
      expect(comp.fundamentacaoLegalsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call InstrumentoInternacional query and add missing value', () => {
      const problemaJuridico: IProblemaJuridico = { id: 456 };
      const instrumentoInternacionals: IInstrumentoInternacional[] = [{ id: 32089 }];
      problemaJuridico.instrumentoInternacionals = instrumentoInternacionals;

      const instrumentoInternacionalCollection: IInstrumentoInternacional[] = [{ id: 68922 }];
      jest
        .spyOn(instrumentoInternacionalService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: instrumentoInternacionalCollection })));
      const additionalInstrumentoInternacionals = [...instrumentoInternacionals];
      const expectedCollection: IInstrumentoInternacional[] = [
        ...additionalInstrumentoInternacionals,
        ...instrumentoInternacionalCollection,
      ];
      jest.spyOn(instrumentoInternacionalService, 'addInstrumentoInternacionalToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ problemaJuridico });
      comp.ngOnInit();

      expect(instrumentoInternacionalService.query).toHaveBeenCalled();
      expect(instrumentoInternacionalService.addInstrumentoInternacionalToCollectionIfMissing).toHaveBeenCalledWith(
        instrumentoInternacionalCollection,
        ...additionalInstrumentoInternacionals
      );
      expect(comp.instrumentoInternacionalsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Processo query and add missing value', () => {
      const problemaJuridico: IProblemaJuridico = { id: 456 };
      const processos: IProcesso[] = [{ id: 82443 }];
      problemaJuridico.processos = processos;

      const processoCollection: IProcesso[] = [{ id: 39045 }];
      jest.spyOn(processoService, 'query').mockReturnValue(of(new HttpResponse({ body: processoCollection })));
      const additionalProcessos = [...processos];
      const expectedCollection: IProcesso[] = [...additionalProcessos, ...processoCollection];
      jest.spyOn(processoService, 'addProcessoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ problemaJuridico });
      comp.ngOnInit();

      expect(processoService.query).toHaveBeenCalled();
      expect(processoService.addProcessoToCollectionIfMissing).toHaveBeenCalledWith(processoCollection, ...additionalProcessos);
      expect(comp.processosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const problemaJuridico: IProblemaJuridico = { id: 456 };
      const fundamentacaoDoutrinarias: IFundamentacaoDoutrinaria = { id: 79617 };
      problemaJuridico.fundamentacaoDoutrinarias = [fundamentacaoDoutrinarias];
      const jurisprudencias: IJurisprudencia = { id: 66461 };
      problemaJuridico.jurisprudencias = [jurisprudencias];
      const fundamentacaoLegals: IFundamentacaoLegal = { id: 96566 };
      problemaJuridico.fundamentacaoLegals = [fundamentacaoLegals];
      const instrumentoInternacionals: IInstrumentoInternacional = { id: 75774 };
      problemaJuridico.instrumentoInternacionals = [instrumentoInternacionals];
      const processos: IProcesso = { id: 98027 };
      problemaJuridico.processos = [processos];

      activatedRoute.data = of({ problemaJuridico });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(problemaJuridico));
      expect(comp.fundamentacaoDoutrinariasSharedCollection).toContain(fundamentacaoDoutrinarias);
      expect(comp.jurisprudenciasSharedCollection).toContain(jurisprudencias);
      expect(comp.fundamentacaoLegalsSharedCollection).toContain(fundamentacaoLegals);
      expect(comp.instrumentoInternacionalsSharedCollection).toContain(instrumentoInternacionals);
      expect(comp.processosSharedCollection).toContain(processos);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProblemaJuridico>>();
      const problemaJuridico = { id: 123 };
      jest.spyOn(problemaJuridicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ problemaJuridico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: problemaJuridico }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(problemaJuridicoService.update).toHaveBeenCalledWith(problemaJuridico);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProblemaJuridico>>();
      const problemaJuridico = new ProblemaJuridico();
      jest.spyOn(problemaJuridicoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ problemaJuridico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: problemaJuridico }));
      saveSubject.complete();

      // THEN
      expect(problemaJuridicoService.create).toHaveBeenCalledWith(problemaJuridico);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProblemaJuridico>>();
      const problemaJuridico = { id: 123 };
      jest.spyOn(problemaJuridicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ problemaJuridico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(problemaJuridicoService.update).toHaveBeenCalledWith(problemaJuridico);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackFundamentacaoDoutrinariaById', () => {
      it('Should return tracked FundamentacaoDoutrinaria primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackFundamentacaoDoutrinariaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackJurisprudenciaById', () => {
      it('Should return tracked Jurisprudencia primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackJurisprudenciaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackFundamentacaoLegalById', () => {
      it('Should return tracked FundamentacaoLegal primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackFundamentacaoLegalById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackInstrumentoInternacionalById', () => {
      it('Should return tracked InstrumentoInternacional primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackInstrumentoInternacionalById(0, entity);
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

  describe('Getting selected relationships', () => {
    describe('getSelectedFundamentacaoDoutrinaria', () => {
      it('Should return option if no FundamentacaoDoutrinaria is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedFundamentacaoDoutrinaria(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected FundamentacaoDoutrinaria for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedFundamentacaoDoutrinaria(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this FundamentacaoDoutrinaria is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedFundamentacaoDoutrinaria(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedJurisprudencia', () => {
      it('Should return option if no Jurisprudencia is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedJurisprudencia(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Jurisprudencia for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedJurisprudencia(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Jurisprudencia is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedJurisprudencia(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedFundamentacaoLegal', () => {
      it('Should return option if no FundamentacaoLegal is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedFundamentacaoLegal(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected FundamentacaoLegal for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedFundamentacaoLegal(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this FundamentacaoLegal is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedFundamentacaoLegal(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedInstrumentoInternacional', () => {
      it('Should return option if no InstrumentoInternacional is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedInstrumentoInternacional(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected InstrumentoInternacional for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedInstrumentoInternacional(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this InstrumentoInternacional is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedInstrumentoInternacional(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedProcesso', () => {
      it('Should return option if no Processo is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedProcesso(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Processo for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedProcesso(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Processo is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedProcesso(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
