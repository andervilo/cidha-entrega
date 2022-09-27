import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TerraIndigenaService } from '../service/terra-indigena.service';
import { ITerraIndigena, TerraIndigena } from '../terra-indigena.model';
import { IEtniaIndigena } from 'app/entities/etnia-indigena/etnia-indigena.model';
import { EtniaIndigenaService } from 'app/entities/etnia-indigena/service/etnia-indigena.service';

import { TerraIndigenaUpdateComponent } from './terra-indigena-update.component';

describe('TerraIndigena Management Update Component', () => {
  let comp: TerraIndigenaUpdateComponent;
  let fixture: ComponentFixture<TerraIndigenaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let terraIndigenaService: TerraIndigenaService;
  let etniaIndigenaService: EtniaIndigenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TerraIndigenaUpdateComponent],
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
      .overrideTemplate(TerraIndigenaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TerraIndigenaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    terraIndigenaService = TestBed.inject(TerraIndigenaService);
    etniaIndigenaService = TestBed.inject(EtniaIndigenaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call EtniaIndigena query and add missing value', () => {
      const terraIndigena: ITerraIndigena = { id: 456 };
      const etnias: IEtniaIndigena[] = [{ id: 75005 }];
      terraIndigena.etnias = etnias;

      const etniaIndigenaCollection: IEtniaIndigena[] = [{ id: 74014 }];
      jest.spyOn(etniaIndigenaService, 'query').mockReturnValue(of(new HttpResponse({ body: etniaIndigenaCollection })));
      const additionalEtniaIndigenas = [...etnias];
      const expectedCollection: IEtniaIndigena[] = [...additionalEtniaIndigenas, ...etniaIndigenaCollection];
      jest.spyOn(etniaIndigenaService, 'addEtniaIndigenaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ terraIndigena });
      comp.ngOnInit();

      expect(etniaIndigenaService.query).toHaveBeenCalled();
      expect(etniaIndigenaService.addEtniaIndigenaToCollectionIfMissing).toHaveBeenCalledWith(
        etniaIndigenaCollection,
        ...additionalEtniaIndigenas
      );
      expect(comp.etniaIndigenasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const terraIndigena: ITerraIndigena = { id: 456 };
      const etnias: IEtniaIndigena = { id: 95236 };
      terraIndigena.etnias = [etnias];

      activatedRoute.data = of({ terraIndigena });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(terraIndigena));
      expect(comp.etniaIndigenasSharedCollection).toContain(etnias);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TerraIndigena>>();
      const terraIndigena = { id: 123 };
      jest.spyOn(terraIndigenaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terraIndigena });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: terraIndigena }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(terraIndigenaService.update).toHaveBeenCalledWith(terraIndigena);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TerraIndigena>>();
      const terraIndigena = new TerraIndigena();
      jest.spyOn(terraIndigenaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terraIndigena });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: terraIndigena }));
      saveSubject.complete();

      // THEN
      expect(terraIndigenaService.create).toHaveBeenCalledWith(terraIndigena);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TerraIndigena>>();
      const terraIndigena = { id: 123 };
      jest.spyOn(terraIndigenaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ terraIndigena });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(terraIndigenaService.update).toHaveBeenCalledWith(terraIndigena);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackEtniaIndigenaById', () => {
      it('Should return tracked EtniaIndigena primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEtniaIndigenaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedEtniaIndigena', () => {
      it('Should return option if no EtniaIndigena is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedEtniaIndigena(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected EtniaIndigena for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedEtniaIndigena(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this EtniaIndigena is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedEtniaIndigena(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
