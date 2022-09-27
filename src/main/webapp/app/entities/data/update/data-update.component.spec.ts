import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DataService } from '../service/data.service';
import { IData, Data } from '../data.model';
import { ITipoData } from 'app/entities/tipo-data/tipo-data.model';
import { TipoDataService } from 'app/entities/tipo-data/service/tipo-data.service';
import { IProcesso } from 'app/entities/processo/processo.model';
import { ProcessoService } from 'app/entities/processo/service/processo.service';

import { DataUpdateComponent } from './data-update.component';

describe('Data Management Update Component', () => {
  let comp: DataUpdateComponent;
  let fixture: ComponentFixture<DataUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dataService: DataService;
  let tipoDataService: TipoDataService;
  let processoService: ProcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DataUpdateComponent],
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
      .overrideTemplate(DataUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DataUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dataService = TestBed.inject(DataService);
    tipoDataService = TestBed.inject(TipoDataService);
    processoService = TestBed.inject(ProcessoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call tipoData query and add missing value', () => {
      const data: IData = { id: 456 };
      const tipoData: ITipoData = { id: 17548 };
      data.tipoData = tipoData;

      const tipoDataCollection: ITipoData[] = [{ id: 38721 }];
      jest.spyOn(tipoDataService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoDataCollection })));
      const expectedCollection: ITipoData[] = [tipoData, ...tipoDataCollection];
      jest.spyOn(tipoDataService, 'addTipoDataToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ data });
      comp.ngOnInit();

      expect(tipoDataService.query).toHaveBeenCalled();
      expect(tipoDataService.addTipoDataToCollectionIfMissing).toHaveBeenCalledWith(tipoDataCollection, tipoData);
      expect(comp.tipoDataCollection).toEqual(expectedCollection);
    });

    it('Should call Processo query and add missing value', () => {
      const data: IData = { id: 456 };
      const processo: IProcesso = { id: 80779 };
      data.processo = processo;

      const processoCollection: IProcesso[] = [{ id: 9561 }];
      jest.spyOn(processoService, 'query').mockReturnValue(of(new HttpResponse({ body: processoCollection })));
      const additionalProcessos = [processo];
      const expectedCollection: IProcesso[] = [...additionalProcessos, ...processoCollection];
      jest.spyOn(processoService, 'addProcessoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ data });
      comp.ngOnInit();

      expect(processoService.query).toHaveBeenCalled();
      expect(processoService.addProcessoToCollectionIfMissing).toHaveBeenCalledWith(processoCollection, ...additionalProcessos);
      expect(comp.processosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const data: IData = { id: 456 };
      const tipoData: ITipoData = { id: 82803 };
      data.tipoData = tipoData;
      const processo: IProcesso = { id: 41659 };
      data.processo = processo;

      activatedRoute.data = of({ data });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(data));
      expect(comp.tipoDataCollection).toContain(tipoData);
      expect(comp.processosSharedCollection).toContain(processo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Data>>();
      const data = { id: 123 };
      jest.spyOn(dataService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ data });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: data }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(dataService.update).toHaveBeenCalledWith(data);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Data>>();
      const data = new Data();
      jest.spyOn(dataService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ data });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: data }));
      saveSubject.complete();

      // THEN
      expect(dataService.create).toHaveBeenCalledWith(data);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Data>>();
      const data = { id: 123 };
      jest.spyOn(dataService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ data });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dataService.update).toHaveBeenCalledWith(data);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackTipoDataById', () => {
      it('Should return tracked TipoData primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTipoDataById(0, entity);
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
