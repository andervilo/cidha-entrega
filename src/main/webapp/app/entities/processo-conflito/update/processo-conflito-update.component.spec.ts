import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProcessoConflitoService } from '../service/processo-conflito.service';
import { IProcessoConflito, ProcessoConflito } from '../processo-conflito.model';
import { IDireito } from 'app/entities/direito/direito.model';
import { DireitoService } from 'app/entities/direito/service/direito.service';

import { ProcessoConflitoUpdateComponent } from './processo-conflito-update.component';

describe('ProcessoConflito Management Update Component', () => {
  let comp: ProcessoConflitoUpdateComponent;
  let fixture: ComponentFixture<ProcessoConflitoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let processoConflitoService: ProcessoConflitoService;
  let direitoService: DireitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProcessoConflitoUpdateComponent],
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
      .overrideTemplate(ProcessoConflitoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProcessoConflitoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    processoConflitoService = TestBed.inject(ProcessoConflitoService);
    direitoService = TestBed.inject(DireitoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Direito query and add missing value', () => {
      const processoConflito: IProcessoConflito = { id: 456 };
      const direitos: IDireito[] = [{ id: 60177 }];
      processoConflito.direitos = direitos;

      const direitoCollection: IDireito[] = [{ id: 61251 }];
      jest.spyOn(direitoService, 'query').mockReturnValue(of(new HttpResponse({ body: direitoCollection })));
      const additionalDireitos = [...direitos];
      const expectedCollection: IDireito[] = [...additionalDireitos, ...direitoCollection];
      jest.spyOn(direitoService, 'addDireitoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ processoConflito });
      comp.ngOnInit();

      expect(direitoService.query).toHaveBeenCalled();
      expect(direitoService.addDireitoToCollectionIfMissing).toHaveBeenCalledWith(direitoCollection, ...additionalDireitos);
      expect(comp.direitosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const processoConflito: IProcessoConflito = { id: 456 };
      const direitos: IDireito = { id: 31982 };
      processoConflito.direitos = [direitos];

      activatedRoute.data = of({ processoConflito });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(processoConflito));
      expect(comp.direitosSharedCollection).toContain(direitos);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProcessoConflito>>();
      const processoConflito = { id: 123 };
      jest.spyOn(processoConflitoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ processoConflito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: processoConflito }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(processoConflitoService.update).toHaveBeenCalledWith(processoConflito);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProcessoConflito>>();
      const processoConflito = new ProcessoConflito();
      jest.spyOn(processoConflitoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ processoConflito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: processoConflito }));
      saveSubject.complete();

      // THEN
      expect(processoConflitoService.create).toHaveBeenCalledWith(processoConflito);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProcessoConflito>>();
      const processoConflito = { id: 123 };
      jest.spyOn(processoConflitoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ processoConflito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(processoConflitoService.update).toHaveBeenCalledWith(processoConflito);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackDireitoById', () => {
      it('Should return tracked Direito primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDireitoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedDireito', () => {
      it('Should return option if no Direito is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedDireito(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Direito for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedDireito(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Direito is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedDireito(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
