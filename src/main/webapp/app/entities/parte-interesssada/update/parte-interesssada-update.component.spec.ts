import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ParteInteresssadaService } from '../service/parte-interesssada.service';
import { IParteInteresssada, ParteInteresssada } from '../parte-interesssada.model';
import { IRepresentanteLegal } from 'app/entities/representante-legal/representante-legal.model';
import { RepresentanteLegalService } from 'app/entities/representante-legal/service/representante-legal.service';

import { ParteInteresssadaUpdateComponent } from './parte-interesssada-update.component';

describe('ParteInteresssada Management Update Component', () => {
  let comp: ParteInteresssadaUpdateComponent;
  let fixture: ComponentFixture<ParteInteresssadaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let parteInteresssadaService: ParteInteresssadaService;
  let representanteLegalService: RepresentanteLegalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ParteInteresssadaUpdateComponent],
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
      .overrideTemplate(ParteInteresssadaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ParteInteresssadaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    parteInteresssadaService = TestBed.inject(ParteInteresssadaService);
    representanteLegalService = TestBed.inject(RepresentanteLegalService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call RepresentanteLegal query and add missing value', () => {
      const parteInteresssada: IParteInteresssada = { id: 456 };
      const representanteLegals: IRepresentanteLegal[] = [{ id: 81907 }];
      parteInteresssada.representanteLegals = representanteLegals;

      const representanteLegalCollection: IRepresentanteLegal[] = [{ id: 66843 }];
      jest.spyOn(representanteLegalService, 'query').mockReturnValue(of(new HttpResponse({ body: representanteLegalCollection })));
      const additionalRepresentanteLegals = [...representanteLegals];
      const expectedCollection: IRepresentanteLegal[] = [...additionalRepresentanteLegals, ...representanteLegalCollection];
      jest.spyOn(representanteLegalService, 'addRepresentanteLegalToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ parteInteresssada });
      comp.ngOnInit();

      expect(representanteLegalService.query).toHaveBeenCalled();
      expect(representanteLegalService.addRepresentanteLegalToCollectionIfMissing).toHaveBeenCalledWith(
        representanteLegalCollection,
        ...additionalRepresentanteLegals
      );
      expect(comp.representanteLegalsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const parteInteresssada: IParteInteresssada = { id: 456 };
      const representanteLegals: IRepresentanteLegal = { id: 68554 };
      parteInteresssada.representanteLegals = [representanteLegals];

      activatedRoute.data = of({ parteInteresssada });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(parteInteresssada));
      expect(comp.representanteLegalsSharedCollection).toContain(representanteLegals);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ParteInteresssada>>();
      const parteInteresssada = { id: 123 };
      jest.spyOn(parteInteresssadaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parteInteresssada });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: parteInteresssada }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(parteInteresssadaService.update).toHaveBeenCalledWith(parteInteresssada);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ParteInteresssada>>();
      const parteInteresssada = new ParteInteresssada();
      jest.spyOn(parteInteresssadaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parteInteresssada });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: parteInteresssada }));
      saveSubject.complete();

      // THEN
      expect(parteInteresssadaService.create).toHaveBeenCalledWith(parteInteresssada);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ParteInteresssada>>();
      const parteInteresssada = { id: 123 };
      jest.spyOn(parteInteresssadaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parteInteresssada });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(parteInteresssadaService.update).toHaveBeenCalledWith(parteInteresssada);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackRepresentanteLegalById', () => {
      it('Should return tracked RepresentanteLegal primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackRepresentanteLegalById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedRepresentanteLegal', () => {
      it('Should return option if no RepresentanteLegal is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedRepresentanteLegal(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected RepresentanteLegal for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedRepresentanteLegal(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this RepresentanteLegal is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedRepresentanteLegal(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
