import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EnvolvidosConflitoLitigioService } from '../service/envolvidos-conflito-litigio.service';
import { IEnvolvidosConflitoLitigio, EnvolvidosConflitoLitigio } from '../envolvidos-conflito-litigio.model';

import { EnvolvidosConflitoLitigioUpdateComponent } from './envolvidos-conflito-litigio-update.component';

describe('EnvolvidosConflitoLitigio Management Update Component', () => {
  let comp: EnvolvidosConflitoLitigioUpdateComponent;
  let fixture: ComponentFixture<EnvolvidosConflitoLitigioUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let envolvidosConflitoLitigioService: EnvolvidosConflitoLitigioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EnvolvidosConflitoLitigioUpdateComponent],
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
      .overrideTemplate(EnvolvidosConflitoLitigioUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EnvolvidosConflitoLitigioUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    envolvidosConflitoLitigioService = TestBed.inject(EnvolvidosConflitoLitigioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const envolvidosConflitoLitigio: IEnvolvidosConflitoLitigio = { id: 456 };

      activatedRoute.data = of({ envolvidosConflitoLitigio });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(envolvidosConflitoLitigio));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EnvolvidosConflitoLitigio>>();
      const envolvidosConflitoLitigio = { id: 123 };
      jest.spyOn(envolvidosConflitoLitigioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ envolvidosConflitoLitigio });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: envolvidosConflitoLitigio }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(envolvidosConflitoLitigioService.update).toHaveBeenCalledWith(envolvidosConflitoLitigio);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EnvolvidosConflitoLitigio>>();
      const envolvidosConflitoLitigio = new EnvolvidosConflitoLitigio();
      jest.spyOn(envolvidosConflitoLitigioService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ envolvidosConflitoLitigio });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: envolvidosConflitoLitigio }));
      saveSubject.complete();

      // THEN
      expect(envolvidosConflitoLitigioService.create).toHaveBeenCalledWith(envolvidosConflitoLitigio);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EnvolvidosConflitoLitigio>>();
      const envolvidosConflitoLitigio = { id: 123 };
      jest.spyOn(envolvidosConflitoLitigioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ envolvidosConflitoLitigio });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(envolvidosConflitoLitigioService.update).toHaveBeenCalledWith(envolvidosConflitoLitigio);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
