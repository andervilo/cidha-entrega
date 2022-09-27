import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EtniaIndigenaService } from '../service/etnia-indigena.service';
import { IEtniaIndigena, EtniaIndigena } from '../etnia-indigena.model';

import { EtniaIndigenaUpdateComponent } from './etnia-indigena-update.component';

describe('EtniaIndigena Management Update Component', () => {
  let comp: EtniaIndigenaUpdateComponent;
  let fixture: ComponentFixture<EtniaIndigenaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let etniaIndigenaService: EtniaIndigenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EtniaIndigenaUpdateComponent],
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
      .overrideTemplate(EtniaIndigenaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EtniaIndigenaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    etniaIndigenaService = TestBed.inject(EtniaIndigenaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const etniaIndigena: IEtniaIndigena = { id: 456 };

      activatedRoute.data = of({ etniaIndigena });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(etniaIndigena));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EtniaIndigena>>();
      const etniaIndigena = { id: 123 };
      jest.spyOn(etniaIndigenaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ etniaIndigena });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: etniaIndigena }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(etniaIndigenaService.update).toHaveBeenCalledWith(etniaIndigena);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EtniaIndigena>>();
      const etniaIndigena = new EtniaIndigena();
      jest.spyOn(etniaIndigenaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ etniaIndigena });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: etniaIndigena }));
      saveSubject.complete();

      // THEN
      expect(etniaIndigenaService.create).toHaveBeenCalledWith(etniaIndigena);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EtniaIndigena>>();
      const etniaIndigena = { id: 123 };
      jest.spyOn(etniaIndigenaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ etniaIndigena });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(etniaIndigenaService.update).toHaveBeenCalledWith(etniaIndigena);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
