import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { QuilomboService } from '../service/quilombo.service';
import { IQuilombo, Quilombo } from '../quilombo.model';

import { QuilomboUpdateComponent } from './quilombo-update.component';

describe('Quilombo Management Update Component', () => {
  let comp: QuilomboUpdateComponent;
  let fixture: ComponentFixture<QuilomboUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let quilomboService: QuilomboService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [QuilomboUpdateComponent],
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
      .overrideTemplate(QuilomboUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuilomboUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    quilomboService = TestBed.inject(QuilomboService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const quilombo: IQuilombo = { id: 456 };

      activatedRoute.data = of({ quilombo });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(quilombo));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Quilombo>>();
      const quilombo = { id: 123 };
      jest.spyOn(quilomboService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quilombo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quilombo }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(quilomboService.update).toHaveBeenCalledWith(quilombo);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Quilombo>>();
      const quilombo = new Quilombo();
      jest.spyOn(quilomboService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quilombo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quilombo }));
      saveSubject.complete();

      // THEN
      expect(quilomboService.create).toHaveBeenCalledWith(quilombo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Quilombo>>();
      const quilombo = { id: 123 };
      jest.spyOn(quilomboService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quilombo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(quilomboService.update).toHaveBeenCalledWith(quilombo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
