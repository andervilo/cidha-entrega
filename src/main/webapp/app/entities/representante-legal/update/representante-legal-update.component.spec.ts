import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RepresentanteLegalService } from '../service/representante-legal.service';
import { IRepresentanteLegal, RepresentanteLegal } from '../representante-legal.model';
import { ITipoRepresentante } from 'app/entities/tipo-representante/tipo-representante.model';
import { TipoRepresentanteService } from 'app/entities/tipo-representante/service/tipo-representante.service';

import { RepresentanteLegalUpdateComponent } from './representante-legal-update.component';

describe('RepresentanteLegal Management Update Component', () => {
  let comp: RepresentanteLegalUpdateComponent;
  let fixture: ComponentFixture<RepresentanteLegalUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let representanteLegalService: RepresentanteLegalService;
  let tipoRepresentanteService: TipoRepresentanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RepresentanteLegalUpdateComponent],
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
      .overrideTemplate(RepresentanteLegalUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    representanteLegalService = TestBed.inject(RepresentanteLegalService);
    tipoRepresentanteService = TestBed.inject(TipoRepresentanteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TipoRepresentante query and add missing value', () => {
      const representanteLegal: IRepresentanteLegal = { id: 456 };
      const tipoRepresentante: ITipoRepresentante = { id: 18370 };
      representanteLegal.tipoRepresentante = tipoRepresentante;

      const tipoRepresentanteCollection: ITipoRepresentante[] = [{ id: 59321 }];
      jest.spyOn(tipoRepresentanteService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoRepresentanteCollection })));
      const additionalTipoRepresentantes = [tipoRepresentante];
      const expectedCollection: ITipoRepresentante[] = [...additionalTipoRepresentantes, ...tipoRepresentanteCollection];
      jest.spyOn(tipoRepresentanteService, 'addTipoRepresentanteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ representanteLegal });
      comp.ngOnInit();

      expect(tipoRepresentanteService.query).toHaveBeenCalled();
      expect(tipoRepresentanteService.addTipoRepresentanteToCollectionIfMissing).toHaveBeenCalledWith(
        tipoRepresentanteCollection,
        ...additionalTipoRepresentantes
      );
      expect(comp.tipoRepresentantesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const representanteLegal: IRepresentanteLegal = { id: 456 };
      const tipoRepresentante: ITipoRepresentante = { id: 49196 };
      representanteLegal.tipoRepresentante = tipoRepresentante;

      activatedRoute.data = of({ representanteLegal });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(representanteLegal));
      expect(comp.tipoRepresentantesSharedCollection).toContain(tipoRepresentante);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RepresentanteLegal>>();
      const representanteLegal = { id: 123 };
      jest.spyOn(representanteLegalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ representanteLegal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: representanteLegal }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(representanteLegalService.update).toHaveBeenCalledWith(representanteLegal);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RepresentanteLegal>>();
      const representanteLegal = new RepresentanteLegal();
      jest.spyOn(representanteLegalService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ representanteLegal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: representanteLegal }));
      saveSubject.complete();

      // THEN
      expect(representanteLegalService.create).toHaveBeenCalledWith(representanteLegal);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RepresentanteLegal>>();
      const representanteLegal = { id: 123 };
      jest.spyOn(representanteLegalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ representanteLegal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(representanteLegalService.update).toHaveBeenCalledWith(representanteLegal);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackTipoRepresentanteById', () => {
      it('Should return tracked TipoRepresentante primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTipoRepresentanteById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
